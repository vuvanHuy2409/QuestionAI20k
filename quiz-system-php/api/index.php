<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    json_response(['ok' => true]);
}

try {
    $pdo = database();
    $action = (string) ($_GET['action'] ?? $_POST['action'] ?? 'health');
    $method = strtoupper((string) ($_SERVER['REQUEST_METHOD'] ?? 'GET'));

    if ($action === 'health') {
        $questionCount = (int) $pdo->query('SELECT COUNT(*) FROM questions')->fetchColumn();
        json_response([
            'status' => 'ok',
            'database' => 'mysql',
            'questions' => $questionCount,
            'payment_demo_active' => payment_demo_active(),
        ]);
    }

    if ($action === 'login' && $method === 'POST') {
        $body = request_body();
        $username = strtolower(trim((string) ($body['username'] ?? '')));
        $password = (string) ($body['password'] ?? '');
        if (!preg_match('/^[a-zA-Z0-9._-]{3,80}$/', $username) || strlen($password) < 6) {
            fail_response('Tên tài khoản phải từ 3 ký tự và mật khẩu từ 6 ký tự.');
        }

        $statement = $pdo->prepare('SELECT * FROM users WHERE username = :username LIMIT 1');
        $statement->execute(['username' => $username]);
        $user = $statement->fetch();

        // Demo account is created lazily so the SQL seed remains safe to share.
        if (!$user && $username === 'demo' && $password === 'AI20K@2026') {
            $insert = $pdo->prepare(
                'INSERT INTO users (username, display_name, password_hash, last_login_at)
                 VALUES (:username, :display_name, :password_hash, :last_login_at)'
            );
            $insert->execute([
                'username' => 'demo',
                'display_name' => 'Người học Demo',
                'password_hash' => password_hash($password, PASSWORD_DEFAULT),
                'last_login_at' => now_sql(),
            ]);
            $statement->execute(['username' => $username]);
            $user = $statement->fetch();
        }

        if (!$user || !password_verify($password, $user['password_hash'])) {
            fail_response('Tài khoản hoặc mật khẩu không đúng.', 401);
        }

        $pdo->prepare('UPDATE users SET last_login_at = :last_login_at WHERE id = :id')->execute([
            'last_login_at' => now_sql(),
            'id' => $user['id'],
        ]);
        $token = issue_session($pdo, (int) $user['id']);
        json_response([
            'token' => $token,
            'user' => [
                'id' => (int) $user['id'],
                'username' => $user['username'],
                'display_name' => $user['display_name'],
            ],
        ]);
    }

    if ($action === 'register' && $method === 'POST') {
        $body = request_body();
        $username = strtolower(trim((string) ($body['username'] ?? '')));
        $displayName = trim((string) ($body['display_name'] ?? ''));
        $password = (string) ($body['password'] ?? '');
        if (!preg_match('/^[a-zA-Z0-9._-]{3,80}$/', $username)) {
            fail_response('Tên tài khoản chỉ dùng chữ, số, dấu chấm, gạch ngang hoặc gạch dưới.');
        }
        if (mb_strlen($displayName) < 2 || mb_strlen($displayName) > 120) {
            fail_response('Tên hiển thị cần có từ 2 đến 120 ký tự.');
        }
        if (strlen($password) < 6) {
            fail_response('Mật khẩu cần có ít nhất 6 ký tự.');
        }
        try {
            $insert = $pdo->prepare(
                'INSERT INTO users (username, display_name, password_hash, last_login_at)
                 VALUES (:username, :display_name, :password_hash, :last_login_at)'
            );
            $insert->execute([
                'username' => $username,
                'display_name' => $displayName,
                'password_hash' => password_hash($password, PASSWORD_DEFAULT),
                'last_login_at' => now_sql(),
            ]);
        } catch (PDOException $exception) {
            if ($exception->getCode() === '23000') {
                fail_response('Tên tài khoản đã tồn tại.', 409);
            }
            throw $exception;
        }
        $userId = (int) $pdo->lastInsertId();
        $token = issue_session($pdo, $userId);
        json_response([
            'token' => $token,
            'user' => ['id' => $userId, 'username' => $username, 'display_name' => $displayName],
        ], 201);
    }

    if ($action === 'logout' && $method === 'POST') {
        $token = bearer_token();
        if ($token !== null) {
            $pdo->prepare('DELETE FROM sessions WHERE token_hash = :token_hash')->execute([
                'token_hash' => hash('sha256', $token),
            ]);
        }
        json_response(['ok' => true]);
    }

    if ($action === 'me' && $method === 'GET') {
        $user = required_user($pdo);
        json_response([
            'user' => [
                'id' => (int) $user['id'],
                'username' => $user['username'],
                'display_name' => $user['display_name'],
            ],
        ]);
    }

    if ($action === 'pack' && $method === 'GET') {
        required_user($pdo);
        $pack = $pdo->query('SELECT * FROM question_sets ORDER BY id LIMIT 1')->fetch();
        if (!$pack) {
            fail_response('Chưa có bộ câu hỏi. Hãy chạy database/schema.sql và database/seed.sql.', 503);
        }
        $pack['question_count'] = (int) $pdo->query('SELECT COUNT(*) FROM questions WHERE set_id = ' . (int) $pack['id'])->fetchColumn();
        $pack['id'] = (int) $pack['id'];
        $pack['total_questions'] = (int) $pack['total_questions'];
        json_response(['pack' => $pack]);
    }

    if ($action === 'topics' && $method === 'GET') {
        required_user($pdo);
        $pack = $pdo->query('SELECT id FROM question_sets ORDER BY id LIMIT 1')->fetch();
        if (!$pack) {
            fail_response('Chưa có bộ câu hỏi.', 503);
        }
        $statement = $pdo->prepare(
            'SELECT topic,
                    COUNT(*) AS total,
                    SUM(CASE WHEN difficulty = \'Dễ\' THEN 1 ELSE 0 END) AS easy_count,
                    SUM(CASE WHEN difficulty = \'Vừa\' THEN 1 ELSE 0 END) AS medium_count,
                    SUM(CASE WHEN difficulty = \'Khó\' THEN 1 ELSE 0 END) AS hard_count
             FROM questions
             WHERE set_id = :set_id
             GROUP BY topic
             ORDER BY MIN(sort_order)'
        );
        $statement->execute(['set_id' => $pack['id']]);
        $topics = array_map(
            static fn (array $topic): array => [
                'topic' => $topic['topic'],
                'total' => (int) $topic['total'],
                'easy_count' => (int) $topic['easy_count'],
                'medium_count' => (int) $topic['medium_count'],
                'hard_count' => (int) $topic['hard_count'],
            ],
            $statement->fetchAll()
        );
        json_response(['topics' => $topics]);
    }

    if ($action === 'questions' && $method === 'GET') {
        $user = required_user($pdo);
        $pack = $pdo->query('SELECT * FROM question_sets ORDER BY id LIMIT 1')->fetch();
        if (!$pack) {
            fail_response('Chưa có bộ câu hỏi.', 503);
        }
        $statement = $pdo->prepare('SELECT * FROM questions WHERE set_id = :set_id ORDER BY sort_order');
        $statement->execute(['set_id' => $pack['id']]);
        $questions = array_map(
            fn (array $question): array => question_public($pdo, $question, false, true),
            $statement->fetchAll()
        );
        json_response(['mode' => 'normal', 'questions' => $questions]);
    }

    if ($action === 'wrong' && $method === 'GET') {
        $user = required_user($pdo);
        $statement = $pdo->prepare(
            'SELECT questions.*, user_question_progress.pending_count,
                    user_question_progress.wrong_count, user_question_progress.correct_count
             FROM user_question_progress
             INNER JOIN questions ON questions.id = user_question_progress.question_id
             WHERE user_question_progress.user_id = :user_id
               AND user_question_progress.pending_count > 0
             ORDER BY user_question_progress.pending_count DESC,
                      user_question_progress.last_wrong_at ASC'
        );
        $statement->execute(['user_id' => $user['id']]);
        $questions = array_map(
            static fn (array $question): array => [
                'id' => (int) $question['id'],
                'prompt' => $question['prompt'],
                'topic' => $question['topic'],
                'difficulty' => $question['difficulty'],
                'pending_count' => (int) $question['pending_count'],
                'wrong_count' => (int) $question['wrong_count'],
                'correct_count' => (int) $question['correct_count'],
            ],
            $statement->fetchAll()
        );
        json_response(['questions' => $questions]);
    }

    if ($action === 'stats' && $method === 'GET') {
        $user = required_user($pdo);
        $summaryStatement = $pdo->prepare(
            'SELECT COUNT(*) AS attempts,
                    COALESCE(SUM(score), 0) AS correct_answers,
                    COALESCE(SUM(total), 0) AS answered_questions,
                    COALESCE(AVG(CASE WHEN total > 0 THEN score * 100.0 / total END), 0) AS average_score
             FROM quiz_attempts
             WHERE user_id = :user_id AND completed_at IS NOT NULL'
        );
        $summaryStatement->execute(['user_id' => $user['id']]);
        $summary = $summaryStatement->fetch();
        $pendingStatement = $pdo->prepare(
            'SELECT COALESCE(SUM(pending_count), 0) FROM user_question_progress WHERE user_id = :user_id'
        );
        $pendingStatement->execute(['user_id' => $user['id']]);
        $summary['pending_wrong'] = (int) $pendingStatement->fetchColumn();
        $summary['attempts'] = (int) $summary['attempts'];
        $summary['correct_answers'] = (int) $summary['correct_answers'];
        $summary['answered_questions'] = (int) $summary['answered_questions'];
        $summary['average_score'] = round((float) $summary['average_score'], 1);

        $recentStatement = $pdo->prepare(
            'SELECT id, mode, score, total, completed_at
             FROM quiz_attempts WHERE user_id = :user_id AND completed_at IS NOT NULL
             ORDER BY completed_at DESC LIMIT 8'
        );
        $recentStatement->execute(['user_id' => $user['id']]);
        json_response(['summary' => $summary, 'recent' => $recentStatement->fetchAll()]);
    }

    if ($action === 'submit' && $method === 'POST') {
        $user = required_user($pdo);
        $body = request_body();
        $answers = $body['answers'] ?? null;
        $mode = (($body['mode'] ?? 'normal') === 'wrong') ? 'wrong' : 'normal';
        if (!is_array($answers) || count($answers) < 1 || count($answers) > 20) {
            fail_response('Mỗi lượt làm cần có từ 1 đến 20 câu trong ngân hàng 300 câu.');
        }

        $questionStatement = $pdo->query('SELECT * FROM questions ORDER BY sort_order');
        $questionMap = [];
        foreach ($questionStatement->fetchAll() as $question) {
            $questionMap[(int) $question['id']] = $question;
        }

        $normalized = [];
        $seen = [];
        foreach ($answers as $answer) {
            if (!is_array($answer)) {
                fail_response('Danh sách câu trả lời không hợp lệ.');
            }
            $questionId = (int) ($answer['question_id'] ?? 0);
            $selected = $answer['selected_option'] ?? null;
            if ($questionId < 1 || isset($seen[$questionId]) || !isset($questionMap[$questionId])) {
                fail_response('Câu hỏi trong bài làm không hợp lệ.');
            }
            if ($selected !== null && !in_array($selected, ['A', 'B', 'C', 'D'], true)) {
                fail_response('Đáp án trong bài làm không hợp lệ.');
            }
            $seen[$questionId] = true;
            $normalized[] = [$questionId, $selected];
        }

        $now = now_sql();
        $pdo->beginTransaction();
        try {
            $attempt = $pdo->prepare(
                'INSERT INTO quiz_attempts (user_id, set_id, mode, started_at)
                 VALUES (:user_id, :set_id, :mode, :started_at)'
            );
            $attempt->execute([
                'user_id' => $user['id'],
                'set_id' => $questionMap[$normalized[0][0]]['set_id'],
                'mode' => $mode,
                'started_at' => $now,
            ]);
            $attemptId = (int) $pdo->lastInsertId();
            $score = 0;
            $results = [];

            foreach ($normalized as [$questionId, $selected]) {
                $question = $questionMap[$questionId];
                $isCorrect = $selected !== null && $selected === $question['correct_option'];
                $score += $isCorrect ? 1 : 0;
                $insertAnswer = $pdo->prepare(
                    'INSERT INTO attempt_answers (attempt_id, question_id, selected_option, is_correct)
                     VALUES (:attempt_id, :question_id, :selected_option, :is_correct)'
                );
                $insertAnswer->execute([
                    'attempt_id' => $attemptId,
                    'question_id' => $questionId,
                    'selected_option' => $selected,
                    'is_correct' => $isCorrect ? 1 : 0,
                ]);

                if ($isCorrect) {
                    $progress = $pdo->prepare(
                        'INSERT INTO user_question_progress
                           (user_id, question_id, correct_count, last_answered_at)
                         VALUES (:user_id, :question_id, 1, :last_answered_at)
                         ON DUPLICATE KEY UPDATE
                           correct_count = correct_count + 1,
                           pending_count = GREATEST(pending_count - 1, 0),
                           last_answered_at = VALUES(last_answered_at)'
                    );
                    $progress->execute([
                        'user_id' => $user['id'],
                        'question_id' => $questionId,
                        'last_answered_at' => $now,
                    ]);
                } else {
                    $wrongEvent = $pdo->prepare(
                        'INSERT INTO wrong_answer_events
                           (user_id, question_id, attempt_id, selected_option, correct_option, answered_at)
                         VALUES (:user_id, :question_id, :attempt_id, :selected_option, :correct_option, :answered_at)'
                    );
                    $wrongEvent->execute([
                        'user_id' => $user['id'],
                        'question_id' => $questionId,
                        'attempt_id' => $attemptId,
                        'selected_option' => $selected,
                        'correct_option' => $question['correct_option'],
                        'answered_at' => $now,
                    ]);
                    $progress = $pdo->prepare(
                        'INSERT INTO user_question_progress
                           (user_id, question_id, wrong_count, pending_count, last_answered_at, last_wrong_at)
                         VALUES (:user_id, :question_id, 1, 1, :last_answered_at, :last_wrong_at)
                         ON DUPLICATE KEY UPDATE
                           wrong_count = wrong_count + 1,
                           pending_count = pending_count + 1,
                           last_answered_at = VALUES(last_answered_at),
                           last_wrong_at = VALUES(last_wrong_at)'
                    );
                    $progress->execute([
                        'user_id' => $user['id'],
                        'question_id' => $questionId,
                        'last_answered_at' => $now,
                        'last_wrong_at' => $now,
                    ]);
                }

                $results[] = [
                    'question' => question_public($pdo, $question, true),
                    'selected_option' => $selected,
                    'is_correct' => $isCorrect,
                ];
            }

            $updateAttempt = $pdo->prepare(
                'UPDATE quiz_attempts SET score = :score, total = :total, completed_at = :completed_at WHERE id = :id'
            );
            $updateAttempt->execute([
                'score' => $score,
                'total' => count($normalized),
                'completed_at' => now_sql(),
                'id' => $attemptId,
            ]);
            $pending = $pdo->prepare(
                'SELECT COALESCE(SUM(pending_count), 0) FROM user_question_progress WHERE user_id = :user_id'
            );
            $pending->execute(['user_id' => $user['id']]);
            $pendingCount = (int) $pending->fetchColumn();
            $pdo->commit();
        } catch (Throwable $exception) {
            $pdo->rollBack();
            throw $exception;
        }

        json_response([
            'attempt_id' => $attemptId,
            'score' => $score,
            'total' => count($normalized),
            'pending_wrong' => $pendingCount,
            'results' => $results,
        ]);
    }

    if ($action === 'explanation' && $method === 'GET') {
        $user = required_user($pdo);
        $questionId = (int) ($_GET['question_id'] ?? 0);
        $statement = $pdo->prepare('SELECT * FROM questions WHERE id = :id LIMIT 1');
        $statement->execute(['id' => $questionId]);
        $question = $statement->fetch();
        if (!$question) {
            fail_response('Không tìm thấy câu hỏi.', 404);
        }
        $unlocked = $pdo->prepare(
            'SELECT id FROM explanation_unlocks WHERE user_id = :user_id AND question_id = :question_id LIMIT 1'
        );
        $unlocked->execute(['user_id' => $user['id'], 'question_id' => $questionId]);
        if (payment_demo_active() && !$unlocked->fetch()) {
            json_response([
                'locked' => true,
                'requires_demo_payment' => true,
                'cutoff' => '26/08/2026',
                'message' => 'Phần giải thích đang ở chế độ mock payment để demo.',
            ], 402);
        }
        json_response(['locked' => false, 'question' => question_public($pdo, $question, true)]);
    }

    if ($action === 'demo-payment' && $method === 'POST') {
        $user = required_user($pdo);
        $body = request_body();
        $questionId = (int) ($body['question_id'] ?? 0);
        $statement = $pdo->prepare('SELECT * FROM questions WHERE id = :id LIMIT 1');
        $statement->execute(['id' => $questionId]);
        $question = $statement->fetch();
        if (!$question) {
            fail_response('Không tìm thấy câu hỏi.', 404);
        }
        if (!payment_demo_active()) {
            json_response([
                'locked' => false,
                'payment_demo_disabled' => true,
                'question' => question_public($pdo, $question, true),
            ]);
        }
        $unlock = $pdo->prepare(
            'INSERT IGNORE INTO explanation_unlocks (user_id, question_id, unlock_type, unlocked_at)
             VALUES (:user_id, :question_id, :unlock_type, :unlocked_at)'
        );
        $unlock->execute([
            'user_id' => $user['id'],
            'question_id' => $questionId,
            'unlock_type' => 'demo_payment',
            'unlocked_at' => now_sql(),
        ]);
        json_response([
            'locked' => false,
            'payment_demo' => true,
            'question' => question_public($pdo, $question, true),
        ]);
    }

    fail_response('Không tìm thấy action.', 404);
} catch (Throwable $exception) {
    error_log($exception->getMessage());
    fail_response('Backend PHP/MySQL chưa sẵn sàng hoặc có lỗi cấu hình.', 500);
}
