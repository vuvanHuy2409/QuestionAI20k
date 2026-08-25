<?php
declare(strict_types=1);

const APP_TIMEZONE = 'Asia/Ho_Chi_Minh';
const PAYMENT_CUTOFF = '2026-08-26 23:59:59';

date_default_timezone_set(APP_TIMEZONE);

function env_first(array $names, ?string $default = null): ?string
{
    foreach ($names as $name) {
        $value = getenv($name);
        if ($value !== false && $value !== '') {
            return $value;
        }
    }
    return $default;
}

function is_sqlite_configured(): bool
{
    $driver = strtolower((string) env_first(['DB_DRIVER', 'DATABASE_DRIVER'], ''));
    if ($driver === 'sqlite') {
        return true;
    }
    if ($driver === 'mysql') {
        return false;
    }
    // If no explicit driver is set, prefer SQLite unless MYSQL_HOST or MYSQL_URL is explicitly set
    $hasMysqlEnv = env_first(['MYSQL_URL', 'DATABASE_URL', 'MYSQL_HOST']) !== null;
    return !$hasMysqlEnv;
}

function db_driver(): string
{
    return is_sqlite_configured() ? 'sqlite' : 'mysql';
}

function init_sqlite_schema(PDO $pdo): void
{
    $tableCount = (int) $pdo->query("SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name='questions'")->fetchColumn();
    if ($tableCount > 0) {
        return;
    }

    $baseDir = dirname(__DIR__);
    $schemaPath = $baseDir . '/database/sqlite_schema.sql';
    $seedPath = $baseDir . '/database/sqlite_seed.sql';

    if (file_exists($schemaPath)) {
        $pdo->exec(file_get_contents($schemaPath));
    }
    if (file_exists($seedPath)) {
        $pdo->exec(file_get_contents($seedPath));
    }
}

function database(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    if (is_sqlite_configured()) {
        $dbPath = env_first(['SQLITE_PATH', 'DATABASE_PATH'], dirname(__DIR__) . '/data/quiz.db');
        $dbDir = dirname($dbPath);
        if (!is_dir($dbDir)) {
            mkdir($dbDir, 0777, true);
        }

        $dsn = 'sqlite:' . $dbPath;
        $pdo = new PDO($dsn, null, null, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
        $pdo->exec('PRAGMA foreign_keys = ON;');
        $pdo->exec('PRAGMA journal_mode = WAL;');
        $pdo->exec('PRAGMA busy_timeout = 5000;');

        init_sqlite_schema($pdo);
        return $pdo;
    }

    $url = env_first(['MYSQL_URL', 'DATABASE_URL']);
    if ($url !== null) {
        $parts = parse_url($url);
        if ($parts === false || empty($parts['host'])) {
            throw new RuntimeException('MYSQL_URL không hợp lệ.');
        }
        $host = $parts['host'];
        $port = $parts['port'] ?? 3306;
        $database = rawurldecode(ltrim($parts['path'] ?? '', '/'));
        $username = rawurldecode($parts['user'] ?? '');
        $password = rawurldecode($parts['pass'] ?? '');
    } else {
        $host = env_first(['MYSQL_HOST'], '127.0.0.1');
        $port = env_first(['MYSQL_PORT'], '3306');
        $database = env_first(['MYSQL_DATABASE', 'MYSQL_DB'], 'ai20k_quiz');
        $username = env_first(['MYSQL_USER'], 'root');
        $password = env_first(['MYSQL_PASSWORD'], '');
    }

    $dsn = sprintf(
        'mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4',
        $host,
        $port,
        $database
    );
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    return $pdo;
}

function json_response(array $payload, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store, max-age=0');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function fail_response(string $message, int $status = 400, array $extra = []): never
{
    json_response(array_merge(['error' => $message], $extra), $status);
}

function request_body(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') {
        return $_POST ?: [];
    }
    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        fail_response('JSON request không hợp lệ.');
    }
    return $decoded;
}

function bearer_token(): ?string
{
    $header = $_SERVER['HTTP_AUTHORIZATION']
        ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
        ?? '';
    if ($header === '' && function_exists('getallheaders')) {
        foreach (getallheaders() as $name => $value) {
            if (strtolower($name) === 'authorization') {
                $header = (string) $value;
                break;
            }
        }
    }
    if (preg_match('/^Bearer\s+(.+)$/i', $header, $matches) !== 1) {
        return null;
    }
    return trim($matches[1]);
}

function current_user(PDO $pdo): ?array
{
    $token = bearer_token();
    if ($token === null || $token === '') {
        return null;
    }
    $statement = $pdo->prepare(
        'SELECT users.*
         FROM sessions
         INNER JOIN users ON users.id = sessions.user_id
         WHERE sessions.token_hash = :token_hash AND sessions.expires_at > :now
         LIMIT 1'
    );
    $statement->execute([
        'token_hash' => hash('sha256', $token),
        'now' => now_sql(),
    ]);
    $user = $statement->fetch();
    return $user ?: null;
}

function required_user(PDO $pdo): array
{
    $user = current_user($pdo);
    if ($user === null) {
        fail_response('Phiên đăng nhập không hợp lệ hoặc đã hết hạn.', 401);
    }
    return $user;
}

function now_sql(): string
{
    return (new DateTimeImmutable('now', new DateTimeZone(APP_TIMEZONE)))->format('Y-m-d H:i:s');
}

function payment_demo_active(): bool
{
    $now = new DateTimeImmutable('now', new DateTimeZone(APP_TIMEZONE));
    $cutoff = new DateTimeImmutable(PAYMENT_CUTOFF, new DateTimeZone(APP_TIMEZONE));
    return $now <= $cutoff;
}

function issue_session(PDO $pdo, int $userId): string
{
    $token = bin2hex(random_bytes(32));
    $expires = (new DateTimeImmutable('now', new DateTimeZone(APP_TIMEZONE)))
        ->modify('+7 days')
        ->format('Y-m-d H:i:s');
    $statement = $pdo->prepare(
        'INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (:token_hash, :user_id, :expires_at)'
    );
    $statement->execute([
        'token_hash' => hash('sha256', $token),
        'user_id' => $userId,
        'expires_at' => $expires,
    ]);
    return $token;
}

function question_public(
    PDO $pdo,
    array $question,
    bool $includeSolution = false,
    bool $includeLearningNotes = false
): array
{
    $statement = $pdo->prepare(
        'SELECT option_key, option_text FROM question_options WHERE question_id = :question_id ORDER BY option_key'
    );
    $statement->execute(['question_id' => $question['id']]);
    $options = [];
    foreach ($statement->fetchAll() as $option) {
        $options[$option['option_key']] = $option['option_text'];
    }

    $payload = [
        'id' => (int) $question['id'],
        'sort_order' => (int) $question['sort_order'],
        'topic' => $question['topic'],
        'difficulty' => $question['difficulty'],
        'prompt' => $question['prompt'],
        'options' => $options,
    ];
    if ($includeSolution) {
        $payload['correct_option'] = $question['correct_option'];
        $payload['explanation'] = $question['explanation'];
        $payload['terms'] = $question['terms'];
    } elseif ($includeLearningNotes) {
        // The fixed learning pack intentionally sends the teaching notes without
        // revealing the correct option. The demo payment is a UI/prank gate, not
        // a security boundary for the quiz content.
        $payload['explanation'] = $question['explanation'];
        $payload['terms'] = $question['terms'];
    }
    return $payload;
}
