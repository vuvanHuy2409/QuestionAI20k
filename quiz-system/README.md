# AI20K Quiz Lab

Ứng dụng trắc nghiệm 20 câu bằng HTML/CSS/JS thuần, backend Python tiêu chuẩn
và SQLite. Bộ seed lấy từ các nhánh kiến thức trong bộ câu hỏi AI20K hiện có.

## Chạy local

```bash
cd "/Users/mac/Desktop/Ôn Tập AI20k/quiz-system"
python3 server.py
```

Mở [http://127.0.0.1:8080](http://127.0.0.1:8080).

## Chạy bằng Docker

```bash
cd "/Users/mac/Desktop/Ôn Tập AI20k/quiz-system"
docker compose up --build -d
```

Mở [http://127.0.0.1:8081](http://127.0.0.1:8081). Cổng host dùng `8081`
để không đụng với dịch vụ đang dùng cổng `8080`. Dừng hệ thống bằng:

```bash
docker compose down
```

Đăng nhập bằng tên bất kỳ từ 2 ký tự và chọn `1. Huy` ở câu hỏi xác thực.

## Dữ liệu SQL

- `schema.sql`: tạo users, sessions, questions, attempts, attempt_answers,
  wrong_answers, user_question_stats, workspaces và workspace_items.
- `seed.sql`: 20 câu hỏi mẫu, phân bố theo các nhánh AI, Prompt, Agent, RAG,
  Data và Safety; đồng thời tạo workspace `bài thi thi khoá 2` với toàn bộ
  nội dung hỏi–đáp/giải thích đã lấy từ link chia sẻ.
- `data/quiz.db`: tự tạo khi chạy server, không cần commit thủ công.

Trong giao diện, mục `Kho workspace` hiển thị cả bộ câu hỏi cũ theo dạng
trắc nghiệm có đáp án/giải thích và workspace mới theo dạng Q&A giữ nguyên
nguyên văn. Nội dung workspace được lưu trong SQL, kèm URL nguồn.

Mỗi câu trả lời sai được ghi vào `wrong_answers` và tăng
`pending_review_count`. Khi người học trả lời đúng trong chế độ `wrong`, hệ
thống giảm một lượt chờ để câu hỏi tự rời hàng đợi sau khi được củng cố.

## Cấu trúc

```text
quiz-system/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── data/
├── schema.sql
├── seed.sql
├── server.py
└── README.md
```
