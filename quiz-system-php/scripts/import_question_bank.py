#!/usr/bin/env python3
"""Convert the explained Markdown question bank into an idempotent MySQL seed."""

from __future__ import annotations

import argparse
import re
from dataclasses import dataclass
from pathlib import Path


QUESTION_RE = re.compile(r"^\*\*Câu\s+(\d+)\.\*\*\s*(.+?)\s*$")
OPTION_RE = re.compile(r"^([A-D])\.\s+(.+?)\s*$")
TOPIC_RE = re.compile(r"^##\s+\d+\.\s+(.+?)\s*$")
DIFFICULTY_RE = re.compile(r"^###\s+(Dễ|Vừa|Khó)\s*$")


@dataclass(frozen=True)
class Question:
    number: int
    topic: str
    difficulty: str
    prompt: str
    options: dict[str, str]
    correct_option: str
    explanation: str
    terms: str


def sql_quote(value: str) -> str:
    """Quote a UTF-8 string for MySQL with backslash escapes enabled."""

    escaped = value.replace("\\", "\\\\").replace("'", "''").replace("\x00", "")
    return f"'{escaped}'"


def parse_question_block(
    number: int,
    prompt: str,
    topic: str,
    difficulty: str,
    block: list[str],
) -> Question:
    options: dict[str, str] = {}
    answer = ""
    explanation = ""
    terms = ""

    for raw_line in block:
        line = raw_line.strip()
        option_match = OPTION_RE.match(line)
        if option_match:
            options[option_match.group(1)] = option_match.group(2)
        elif line.startswith("> **Đáp án:**"):
            answer = line.removeprefix("> **Đáp án:**").strip()
        elif line.startswith("> **Giải thích:**"):
            explanation = line.removeprefix("> **Giải thích:**").strip()
        elif line.startswith("> **Thuật ngữ:**"):
            terms = line.removeprefix("> **Thuật ngữ:**").strip()

    expected_options = {"A", "B", "C", "D"}
    if set(options) != expected_options:
        raise ValueError(f"Câu {number}: cần đúng 4 đáp án A-D, nhận được {sorted(options)}")
    if answer not in expected_options:
        raise ValueError(f"Câu {number}: đáp án đúng không hợp lệ: {answer!r}")
    if not topic or not difficulty or not prompt or not explanation or not terms:
        raise ValueError(f"Câu {number}: thiếu topic/difficulty/prompt/explanation/terms")

    return Question(number, topic, difficulty, prompt, options, answer, explanation, terms)


def parse_markdown(source: Path) -> list[Question]:
    lines = source.read_text(encoding="utf-8").splitlines()
    topic = ""
    difficulty = ""
    questions: list[Question] = []
    index = 0

    while index < len(lines):
        line = lines[index].strip()
        topic_match = TOPIC_RE.match(line)
        if topic_match and not line.startswith("## Mục lục"):
            topic = topic_match.group(1)
        difficulty_match = DIFFICULTY_RE.match(line)
        if difficulty_match:
            difficulty = difficulty_match.group(1)

        question_match = QUESTION_RE.match(line)
        if not question_match:
            index += 1
            continue

        number = int(question_match.group(1))
        prompt = question_match.group(2).strip()
        block: list[str] = []
        cursor = index + 1
        while cursor < len(lines) and not QUESTION_RE.match(lines[cursor].strip()):
            block.append(lines[cursor])
            cursor += 1
        questions.append(parse_question_block(number, prompt, topic, difficulty, block))
        # Set summaries contain the next topic/difficulty headings before the
        # next question starts. Carry that context forward after parsing this
        # block because the cursor skips those non-question lines.
        for raw_line in block:
            block_line = raw_line.strip()
            block_topic_match = TOPIC_RE.match(block_line)
            if block_topic_match and not block_line.startswith("## Mục lục"):
                topic = block_topic_match.group(1)
            block_difficulty_match = DIFFICULTY_RE.match(block_line)
            if block_difficulty_match:
                difficulty = block_difficulty_match.group(1)
        index = cursor

    numbers = [question.number for question in questions]
    expected = list(range(1, 301))
    if numbers != expected:
        raise ValueError(f"Ngân hàng phải có câu 1..300 liên tục; nhận được {len(numbers)} câu")
    return questions


def build_seed(questions: list[Question]) -> str:
    question_rows = []
    option_rows = []
    for question in questions:
        question_rows.append(
            "({number}, 1, {number}, {topic}, {difficulty}, {prompt}, {answer}, {explanation}, {terms})".format(
                number=question.number,
                topic=sql_quote(question.topic),
                difficulty=sql_quote(question.difficulty),
                prompt=sql_quote(question.prompt),
                answer=sql_quote(question.correct_option),
                explanation=sql_quote(question.explanation),
                terms=sql_quote(question.terms),
            )
        )
        for option_key in "ABCD":
            option_rows.append(
                "({number}, {key}, {text})".format(
                    number=question.number,
                    key=sql_quote(option_key),
                    text=sql_quote(question.options[option_key]),
                )
            )

    return """SET NAMES utf8mb4;

INSERT INTO question_sets (id, slug, title, description, detail, total_questions)
VALUES (
  1,
  'ai20k-applied-ai-300',
  'AI20K — Applied AI Foundations / 300 câu',
  'Ngân hàng 300 câu hỏi trắc nghiệm AI theo 9 nhánh chủ đề, gồm 3 mức độ Dễ, Vừa và Khó.',
  'Bộ câu hỏi đồng bộ từ question_bank_300_by_topic_explained.md: LLM, AI Product, Prompt Engineering, Agent, Data Foundations, RAG, Multi-Agent, Data Pipeline và Guardrails. Mỗi câu có 4 đáp án, giải thích và thuật ngữ tiếng Anh. Mỗi lượt làm bài trên giao diện chọn 20 câu để lưu điểm và luyện lại câu sai.',
  300
)
ON DUPLICATE KEY UPDATE
  slug = VALUES(slug),
  title = VALUES(title),
  description = VALUES(description),
  detail = VALUES(detail),
  total_questions = VALUES(total_questions);

DELETE FROM questions WHERE set_id = 1 AND id > 300;

INSERT INTO questions
  (id, set_id, sort_order, topic, difficulty, prompt, correct_option, explanation, terms)
VALUES
""" + ",\n".join(question_rows) + """
ON DUPLICATE KEY UPDATE
  set_id = VALUES(set_id),
  sort_order = VALUES(sort_order),
  topic = VALUES(topic),
  difficulty = VALUES(difficulty),
  prompt = VALUES(prompt),
  correct_option = VALUES(correct_option),
  explanation = VALUES(explanation),
  terms = VALUES(terms);

INSERT INTO question_options (question_id, option_key, option_text)
VALUES
""" + ",\n".join(option_rows) + """
ON DUPLICATE KEY UPDATE option_text = VALUES(option_text);
"""


def main() -> None:
    project_root = Path(__file__).resolve().parents[1]
    default_source = project_root.parent / "question_bank_300_by_topic_explained.md"
    parser = argparse.ArgumentParser()
    parser.add_argument("source", nargs="?", type=Path, default=default_source)
    parser.add_argument("output", nargs="?", type=Path, default=project_root / "database" / "seed.sql")
    args = parser.parse_args()

    questions = parse_markdown(args.source)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(build_seed(questions), encoding="utf-8")
    print(f"Đã chuyển {len(questions)} câu và {len(questions) * 4} đáp án vào {args.output}")


if __name__ == "__main__":
    main()
