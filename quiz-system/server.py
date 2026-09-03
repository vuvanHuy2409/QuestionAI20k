#!/usr/bin/env python3
"""Small dependency-free quiz server backed by SQLite."""

from __future__ import annotations

import json
import mimetypes
import os
import re
import secrets
import sqlite3
from datetime import datetime, timedelta, timezone
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse


APP_DIR = Path(__file__).resolve().parent
PUBLIC_DIR = APP_DIR / "public"
DATA_DIR = APP_DIR / "data"
DB_PATH = DATA_DIR / "quiz.db"
SCHEMA_PATH = APP_DIR / "schema.sql"
SEED_PATH = APP_DIR / "seed.sql"
PORT = int(os.environ.get("QUIZ_PORT", "8080"))
HOST = os.environ.get("QUIZ_HOST", "127.0.0.1")


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def db_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    return connection


def initialize_database() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with db_connection() as connection:
        connection.executescript(SCHEMA_PATH.read_text(encoding="utf-8"))
        connection.executescript(SEED_PATH.read_text(encoding="utf-8"))


def json_bytes(payload: dict) -> bytes:
    return json.dumps(payload, ensure_ascii=False).encode("utf-8")


def clean_display_name(value: object) -> str:
    name = re.sub(r"\s+", " ", str(value or "").strip())
    return name[:80]


def normalize_username(display_name: str) -> str:
    normalized = re.sub(r"[^a-z0-9]+", "-", display_name.lower()).strip("-")
    return normalized[:70] or "nguoi-dung"


def question_payload(row: sqlite3.Row, include_solution: bool = False) -> dict:
    payload = {
        "id": row["id"],
        "topic": row["topic"],
        "difficulty": row["difficulty"],
        "prompt": row["prompt"],
        "options": {
            "A": row["option_a"],
            "B": row["option_b"],
            "C": row["option_c"],
            "D": row["option_d"],
        },
    }
    if include_solution:
        payload.update(
            {
                "correct_option": row["correct_option"],
                "explanation": row["explanation"],
                "terms": row["terms"],
            }
        )
    return payload


def workspace_payload(row: sqlite3.Row) -> dict:
    return {
        "id": row["id"],
        "slug": row["slug"],
        "name": row["name"],
        "description": row["description"],
        "kind": row["kind"],
        "item_count": row["item_count"],
        "mcq_count": row["mcq_count"],
        "qa_count": row["qa_count"],
        "reference_count": row["reference_count"],
    }


def workspace_item_payload(item: sqlite3.Row, linked_question: sqlite3.Row | None = None) -> dict:
    if linked_question:
        payload = question_payload(linked_question, include_solution=True)
        payload.update(
            {
                "item_id": item["id"],
                "workspace_id": item["workspace_id"],
                "item_type": "mcq",
                "sort_order": item["sort_order"],
                "source_url": item["source_url"],
                "source_title": item["source_title"],
            }
        )
        return payload

    return {
        "id": item["id"],
        "item_id": item["id"],
        "workspace_id": item["workspace_id"],
        "item_type": item["item_type"],
        "sort_order": item["sort_order"],
        "topic": item["topic"],
        "difficulty": item["difficulty"],
        "prompt": item["prompt"],
        "answer": item["answer"],
        "explanation": item["explanation"],
        "terms": item["terms"],
        "source_url": item["source_url"],
        "source_title": item["source_title"],
    }


class QuizHandler(BaseHTTPRequestHandler):
    server_version = "AI20KQuiz/1.0"

    def log_message(self, format: str, *args: object) -> None:
        # Keep the terminal readable while still showing API failures below.
        if self.path.startswith("/api/") and self.command != "GET":
            super().log_message(format, *args)

    def send_json(self, status: int, payload: dict) -> None:
        body = json_bytes(payload)
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def send_error_json(self, status: int, message: str) -> None:
        self.send_json(status, {"error": message})

    def read_json(self) -> dict:
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length > 1_000_000:
                raise ValueError("request too large")
            raw = self.rfile.read(length)
            data = json.loads(raw.decode("utf-8") or "{}")
            if not isinstance(data, dict):
                raise ValueError("body must be an object")
            return data
        except (ValueError, json.JSONDecodeError, UnicodeDecodeError) as exc:
            raise ValueError("JSON không hợp lệ") from exc

    def current_user(self) -> sqlite3.Row | None:
        header = self.headers.get("Authorization", "")
        if not header.startswith("Bearer "):
            return None
        token = header.removeprefix("Bearer ").strip()
        if not token:
            return None
        with db_connection() as connection:
            return connection.execute(
                """
                SELECT users.*
                FROM sessions
                JOIN users ON users.id = sessions.user_id
                WHERE sessions.token = ? AND sessions.expires_at > ?
                """,
                (token, utc_now().isoformat()),
            ).fetchone()

    def require_user(self) -> sqlite3.Row | None:
        user = self.current_user()
        if not user:
            self.send_error_json(HTTPStatus.UNAUTHORIZED, "Phiên đăng nhập đã hết hạn.")
        return user

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path == "/api/health":
            with db_connection() as connection:
                count = connection.execute("SELECT COUNT(*) FROM questions").fetchone()[0]
            self.send_json(HTTPStatus.OK, {"status": "ok", "questions": count})
            return

        if parsed.path == "/api/me":
            user = self.require_user()
            if user:
                self.send_json(
                    HTTPStatus.OK,
                    {"user": {"id": user["id"], "display_name": user["display_name"]}},
                )
            return

        if parsed.path == "/api/questions":
            user = self.require_user()
            if not user:
                return
            self.handle_questions(parse_qs(parsed.query), user)
            return

        if parsed.path == "/api/workspaces":
            user = self.require_user()
            if user:
                self.handle_workspaces()
            return

        if parsed.path == "/api/workspace-items":
            user = self.require_user()
            if user:
                self.handle_workspace_items(parse_qs(parsed.query))
            return

        if parsed.path == "/api/stats":
            user = self.require_user()
            if user:
                self.handle_stats(user)
            return

        if parsed.path == "/api/wrong-questions":
            user = self.require_user()
            if user:
                self.handle_wrong_questions(user)
            return

        self.serve_static(parsed.path)

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        try:
            data = self.read_json()
        except ValueError as exc:
            self.send_error_json(HTTPStatus.BAD_REQUEST, str(exc))
            return

        if parsed.path == "/api/auth/login":
            self.handle_login(data)
            return
        if parsed.path == "/api/auth/logout":
            self.handle_logout()
            return
        if parsed.path == "/api/attempts":
            user = self.require_user()
            if user:
                self.handle_attempt(data, user)
            return
        self.send_error_json(HTTPStatus.NOT_FOUND, "Không tìm thấy endpoint.")

    def handle_login(self, data: dict) -> None:
        display_name = clean_display_name(data.get("display_name"))
        gate_answer = str(data.get("gate_answer", "")).strip()
        if len(display_name) < 2:
            self.send_error_json(HTTPStatus.BAD_REQUEST, "Vui lòng nhập tên từ 2 ký tự.")
            return
        if gate_answer != "1":
            self.send_error_json(
                HTTPStatus.UNAUTHORIZED,
                "Câu trả lời chưa đúng. Hãy chọn 1. Huy để tiếp tục.",
            )
            return

        username = normalize_username(display_name)
        token = secrets.token_urlsafe(32)
        expires_at = (utc_now() + timedelta(days=7)).isoformat()
        with db_connection() as connection:
            user = connection.execute(
                "SELECT id FROM users WHERE username = ?", (username,)
            ).fetchone()
            if user:
                user_id = user["id"]
                connection.execute(
                    "UPDATE users SET display_name = ?, last_login_at = CURRENT_TIMESTAMP WHERE id = ?",
                    (display_name, user_id),
                )
            else:
                cursor = connection.execute(
                    "INSERT INTO users (username, display_name) VALUES (?, ?)",
                    (username, display_name),
                )
                user_id = cursor.lastrowid
            connection.execute(
                "INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)",
                (token, user_id, expires_at),
            )

        self.send_json(
            HTTPStatus.OK,
            {
                "token": token,
                "user": {"id": user_id, "display_name": display_name},
            },
        )

    def handle_logout(self) -> None:
        header = self.headers.get("Authorization", "")
        token = header.removeprefix("Bearer ").strip()
        if token:
            with db_connection() as connection:
                connection.execute("DELETE FROM sessions WHERE token = ?", (token,))
        self.send_json(HTTPStatus.OK, {"ok": True})

    def handle_questions(self, query: dict[str, list[str]], user: sqlite3.Row) -> None:
        mode = query.get("mode", ["normal"])[0]
        if mode not in {"normal", "wrong"}:
            self.send_error_json(HTTPStatus.BAD_REQUEST, "Chế độ quiz không hợp lệ.")
            return
        try:
            limit = min(max(int(query.get("limit", ["20"])[0]), 1), 20)
        except ValueError:
            limit = 20

        workspace_id: int | None = None
        raw_workspace_id = query.get("workspace_id", [""])[0].strip()
        if raw_workspace_id:
            try:
                workspace_id = int(raw_workspace_id)
                if workspace_id < 1:
                    raise ValueError
            except ValueError:
                self.send_error_json(HTTPStatus.BAD_REQUEST, "Workspace không hợp lệ.")
                return

        with db_connection() as connection:
            if mode == "wrong":
                workspace_clause = ""
                params: list[object] = [user["id"]]
                if workspace_id is not None:
                    workspace_clause = """
                      AND questions.id IN (
                        SELECT question_id
                        FROM workspace_items
                        WHERE workspace_id = ? AND question_id IS NOT NULL
                      )
                    """
                    params.append(workspace_id)
                params.append(limit)
                rows = connection.execute(
                    f"""
                    SELECT questions.*
                    FROM questions
                    JOIN user_question_stats
                      ON user_question_stats.question_id = questions.id
                     AND user_question_stats.user_id = ?
                    WHERE user_question_stats.pending_review_count > 0
                    {workspace_clause}
                    ORDER BY user_question_stats.pending_review_count DESC,
                             user_question_stats.last_wrong_at ASC
                    LIMIT ?
                    """,
                    params,
                ).fetchall()
            else:
                if workspace_id is None:
                    rows = connection.execute(
                        "SELECT * FROM questions ORDER BY RANDOM() LIMIT ?", (limit,)
                    ).fetchall()
                else:
                    rows = connection.execute(
                        """
                        SELECT questions.*
                        FROM questions
                        JOIN workspace_items
                          ON workspace_items.question_id = questions.id
                         AND workspace_items.workspace_id = ?
                        ORDER BY RANDOM()
                        LIMIT ?
                        """,
                        (workspace_id, limit),
                    ).fetchall()

        self.send_json(
            HTTPStatus.OK,
            {
                "mode": mode,
                "questions": [question_payload(row) for row in rows],
            },
        )

    def handle_workspaces(self) -> None:
        with db_connection() as connection:
            rows = connection.execute(
                """
                SELECT workspaces.id, workspaces.slug, workspaces.name,
                       workspaces.description, workspaces.kind,
                       COUNT(workspace_items.id) AS item_count,
                       COALESCE(SUM(CASE WHEN workspace_items.question_id IS NOT NULL THEN 1 ELSE 0 END), 0) AS mcq_count,
                       COALESCE(SUM(CASE WHEN workspace_items.item_type = 'qa' THEN 1 ELSE 0 END), 0) AS qa_count,
                       COALESCE(SUM(CASE WHEN workspace_items.item_type = 'reference' THEN 1 ELSE 0 END), 0) AS reference_count
                FROM workspaces
                LEFT JOIN workspace_items ON workspace_items.workspace_id = workspaces.id
                GROUP BY workspaces.id
                ORDER BY workspaces.id
                """
            ).fetchall()
        self.send_json(HTTPStatus.OK, {"workspaces": [workspace_payload(row) for row in rows]})

    def handle_workspace_items(self, query: dict[str, list[str]]) -> None:
        raw_workspace_id = query.get("workspace_id", [""])[0].strip()
        try:
            workspace_id = int(raw_workspace_id)
            if workspace_id < 1:
                raise ValueError
        except ValueError:
            self.send_error_json(HTTPStatus.BAD_REQUEST, "Workspace không hợp lệ.")
            return

        with db_connection() as connection:
            workspace = connection.execute(
                "SELECT * FROM workspaces WHERE id = ?", (workspace_id,)
            ).fetchone()
            if not workspace:
                self.send_error_json(HTTPStatus.NOT_FOUND, "Không tìm thấy workspace.")
                return
            items = connection.execute(
                """
                SELECT *
                FROM workspace_items
                WHERE workspace_id = ?
                ORDER BY sort_order
                """,
                (workspace_id,),
            ).fetchall()
            payload = []
            for item in items:
                linked_question = None
                if item["question_id"] is not None:
                    linked_question = connection.execute(
                        "SELECT * FROM questions WHERE id = ?", (item["question_id"],)
                    ).fetchone()
                payload.append(workspace_item_payload(item, linked_question))

        workspace_data = dict(workspace)
        workspace_data.update(
            {
                "item_count": len(payload),
                "mcq_count": sum(item["item_type"] == "mcq" for item in payload),
                "qa_count": sum(item["item_type"] == "qa" for item in payload),
                "reference_count": sum(item["item_type"] == "reference" for item in payload),
            }
        )

        self.send_json(
            HTTPStatus.OK,
            {"workspace": workspace_data, "items": payload},
        )

    def handle_wrong_questions(self, user: sqlite3.Row) -> None:
        with db_connection() as connection:
            rows = connection.execute(
                """
                SELECT questions.id, questions.prompt, questions.topic,
                       questions.difficulty, user_question_stats.pending_review_count,
                       user_question_stats.wrong_count, user_question_stats.correct_count
                FROM questions
                JOIN user_question_stats
                  ON user_question_stats.question_id = questions.id
                 AND user_question_stats.user_id = ?
                WHERE user_question_stats.pending_review_count > 0
                ORDER BY user_question_stats.pending_review_count DESC,
                         user_question_stats.last_wrong_at ASC
                LIMIT 50
                """,
                (user["id"],),
            ).fetchall()
        self.send_json(
            HTTPStatus.OK,
            {"questions": [dict(row) for row in rows]},
        )

    def handle_stats(self, user: sqlite3.Row) -> None:
        with db_connection() as connection:
            summary = connection.execute(
                """
                SELECT COUNT(*) AS attempts,
                       COALESCE(SUM(score), 0) AS correct_answers,
                       COALESCE(SUM(total), 0) AS answered_questions,
                       COALESCE(AVG(CASE WHEN total > 0 THEN score * 100.0 / total END), 0) AS average_score
                FROM attempts
                WHERE user_id = ? AND completed_at IS NOT NULL
                """,
                (user["id"],),
            ).fetchone()
            pending = connection.execute(
                """
                SELECT COALESCE(SUM(pending_review_count), 0)
                FROM user_question_stats
                WHERE user_id = ?
                """,
                (user["id"],),
            ).fetchone()[0]
            recent = connection.execute(
                """
                SELECT id, mode, score, total, completed_at
                FROM attempts
                WHERE user_id = ? AND completed_at IS NOT NULL
                ORDER BY completed_at DESC
                LIMIT 6
                """,
                (user["id"],),
            ).fetchall()
        self.send_json(
            HTTPStatus.OK,
            {
                "summary": {
                    "attempts": summary["attempts"],
                    "correct_answers": summary["correct_answers"],
                    "answered_questions": summary["answered_questions"],
                    "average_score": round(summary["average_score"], 1),
                    "pending_wrong": pending,
                },
                "recent": [dict(row) for row in recent],
            },
        )

    def handle_attempt(self, data: dict, user: sqlite3.Row) -> None:
        mode = data.get("mode", "normal")
        answers = data.get("answers")
        if mode not in {"normal", "wrong"} or not isinstance(answers, list):
            self.send_error_json(HTTPStatus.BAD_REQUEST, "Dữ liệu bài làm không hợp lệ.")
            return
        if not 1 <= len(answers) <= 20:
            self.send_error_json(HTTPStatus.BAD_REQUEST, "Bài làm cần có từ 1 đến 20 câu.")
            return

        normalized_answers: list[tuple[int, str | None]] = []
        seen: set[int] = set()
        try:
            for item in answers:
                question_id = int(item["question_id"])
                selected = item.get("selected_option")
                if selected not in {"A", "B", "C", "D", None}:
                    raise ValueError
                if question_id in seen:
                    raise ValueError
                seen.add(question_id)
                normalized_answers.append((question_id, selected))
        except (KeyError, TypeError, ValueError):
            self.send_error_json(HTTPStatus.BAD_REQUEST, "Danh sách câu trả lời không hợp lệ.")
            return

        question_ids = [item[0] for item in normalized_answers]
        placeholders = ",".join("?" for _ in question_ids)
        with db_connection() as connection:
            rows = connection.execute(
                f"SELECT * FROM questions WHERE id IN ({placeholders})",
                question_ids,
            ).fetchall()
            question_map = {row["id"]: row for row in rows}
            if len(question_map) != len(question_ids):
                self.send_error_json(HTTPStatus.BAD_REQUEST, "Có câu hỏi không tồn tại.")
                return

            started_at = utc_now().isoformat()
            attempt_cursor = connection.execute(
                "INSERT INTO attempts (user_id, mode, started_at) VALUES (?, ?, ?)",
                (user["id"], mode, started_at),
            )
            attempt_id = attempt_cursor.lastrowid
            results = []
            score = 0
            for question_id, selected in normalized_answers:
                question = question_map[question_id]
                correct_option = question["correct_option"]
                is_correct = int(selected == correct_option)
                score += is_correct
                connection.execute(
                    """
                    INSERT INTO attempt_answers (attempt_id, question_id, selected_option, is_correct)
                    VALUES (?, ?, ?, ?)
                    """,
                    (attempt_id, question_id, selected, is_correct),
                )
                if is_correct:
                    connection.execute(
                        """
                        INSERT INTO user_question_stats
                          (user_id, question_id, correct_count, last_answered_at)
                        VALUES (?, ?, 1, ?)
                        ON CONFLICT(user_id, question_id) DO UPDATE SET
                          correct_count = correct_count + 1,
                          pending_review_count = MAX(0, pending_review_count - 1),
                          last_answered_at = excluded.last_answered_at
                        """,
                        (user["id"], question_id, started_at),
                    )
                else:
                    connection.execute(
                        """
                        INSERT INTO wrong_answers
                          (user_id, question_id, attempt_id, selected_option, correct_option)
                        VALUES (?, ?, ?, ?, ?)
                        """,
                        (user["id"], question_id, attempt_id, selected, correct_option),
                    )
                    connection.execute(
                        """
                        INSERT INTO user_question_stats
                          (user_id, question_id, wrong_count, pending_review_count,
                           last_answered_at, last_wrong_at)
                        VALUES (?, ?, 1, 1, ?, ?)
                        ON CONFLICT(user_id, question_id) DO UPDATE SET
                          wrong_count = wrong_count + 1,
                          pending_review_count = pending_review_count + 1,
                          last_answered_at = excluded.last_answered_at,
                          last_wrong_at = excluded.last_wrong_at
                        """,
                        (user["id"], question_id, started_at, started_at),
                    )
                results.append(
                    {
                        "question": question_payload(question, include_solution=True),
                        "selected_option": selected,
                        "is_correct": bool(is_correct),
                    }
                )

            connection.execute(
                """
                UPDATE attempts
                SET score = ?, total = ?, completed_at = ?
                WHERE id = ?
                """,
                (score, len(normalized_answers), utc_now().isoformat(), attempt_id),
            )
            pending = connection.execute(
                "SELECT COALESCE(SUM(pending_review_count), 0) FROM user_question_stats WHERE user_id = ?",
                (user["id"],),
            ).fetchone()[0]

        self.send_json(
            HTTPStatus.OK,
            {
                "attempt_id": attempt_id,
                "score": score,
                "total": len(normalized_answers),
                "pending_wrong": pending,
                "results": results,
            },
        )

    def serve_static(self, request_path: str) -> None:
        relative = "index.html" if request_path in {"", "/"} else request_path.lstrip("/")
        candidate = (PUBLIC_DIR / relative).resolve()
        try:
            candidate.relative_to(PUBLIC_DIR.resolve())
        except ValueError:
            self.send_error(HTTPStatus.NOT_FOUND)
            return
        if not candidate.is_file():
            self.send_error(HTTPStatus.NOT_FOUND)
            return
        content = candidate.read_bytes()
        content_type, _ = mimetypes.guess_type(str(candidate))
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", content_type or "application/octet-stream")
        self.send_header("Content-Length", str(len(content)))
        self.end_headers()
        self.wfile.write(content)


def main() -> None:
    initialize_database()
    server = ThreadingHTTPServer((HOST, PORT), QuizHandler)
    display_host = "127.0.0.1" if HOST == "0.0.0.0" else HOST
    print(f"AI20K Quiz đang chạy tại http://{display_host}:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nĐã dừng server.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
