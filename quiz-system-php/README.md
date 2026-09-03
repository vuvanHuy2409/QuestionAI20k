# AI20K Quiz Lab — PHP + MySQL + Vercel

Phiên bản này chuyển backend sang PHP/PDO và MySQL, giữ UI utility-first
neutrals + xanh brand. SQL lưu ngân hàng 300 câu theo 9 nhánh chủ đề; mỗi lượt
làm trên UI chọn 20 câu, mỗi câu có 4 đáp án.

## Chạy local bằng Docker

```bash
cd "/Users/mac/Desktop/Ôn Tập AI20k/quiz-system-php"
docker compose up --build -d
```

Mở [http://127.0.0.1:8082](http://127.0.0.1:8082).

## Đồng bộ ngân hàng 300 câu

Nguồn Markdown nằm ở `../question_bank_300_by_topic_explained.md`. Tạo lại
`database/seed.sql` bằng parser đã kèm trong project:

```bash
python3 scripts/import_question_bank.py
docker exec -i ai20k-mysql mysql -uai20k_user -pai20k_local_password -D ai20k_quiz < database/seed.sql
```

Script tự động giữ phần seed workspace từ `database/workspace_seed.sql` khi
tạo lại ngân hàng 300 câu.

`database/workspace_seed.sql` có thể chạy độc lập và đã bật `SET NAMES utf8mb4`.
Nếu workspace trên database cũ đang hiện kiểu chữ lỗi như `CÃ¢u`, chạy lại file
này để ghi lại tên, câu hỏi và phần giải thích bằng UTF-8 đúng:

```bash
mysql -h YOUR_HOST -P 3306 -u YOUR_USER -p YOUR_DATABASE < database/workspace_seed.sql
```

API cũng giữ một lớp tương thích để hiển thị đúng dữ liệu workspace đã từng bị
nhập sai mã hóa trong lúc chờ chạy lại seed.

Parser kiểm tra đủ câu 1–300, mỗi câu có đúng 4 đáp án, đáp án đúng, giải thích,
thuật ngữ, chủ đề và mức độ trước khi ghi seed. Giao diện chọn 20 câu mỗi lượt;
toàn bộ 300 câu được lưu trong MySQL để mở rộng luồng luyện tập sau này.

Tài khoản demo:

- Tài khoản: `demo`
- Mật khẩu: `AI20K@2026`

Tài khoản demo được tạo lazy bằng `password_hash()` ở lần đăng nhập đầu tiên.
Người dùng cũng có thể tạo tài khoản mới trong giao diện.

## Workspace và luồng sản phẩm

SQL có thêm `workspaces` và `workspace_items`. Seed tạo workspace
`bài thi thi khoá 2` và lưu nguyên văn 2 cặp câu hỏi và câu trả lời
từ link chia sẻ. Bộ câu
hỏi 300 câu hiện có được liên kết vào workspace `AI20K — Câu hỏi hiện có`, nên
các câu cũ vẫn giữ dạng trắc nghiệm nhưng có thể xem đáp án, giải thích và
thuật ngữ theo cùng một mẫu. Hai nguồn được tách riêng: bài thi 300 câu chỉ
đọc từ bảng `questions`, còn nội dung link chỉ mở qua nút `Bài thi khoá 2`.

## Luồng sản phẩm

1. Đăng nhập bằng tài khoản/mật khẩu.
2. Hiển thị tiêu đề, mô tả chi tiết và metadata của bộ câu hỏi.
3. Chọn một nhánh chủ đề; hệ thống xáo trộn trong đúng nhánh đó rồi tạo lượt 20 câu.
4. Nộp bài để lưu điểm, câu trả lời và câu sai vào MySQL.
5. Câu sai đi vào hàng đợi luyện lại; trả lời đúng sẽ giảm một lượt chờ.
6. Khối `ANSWER NOTE` luôn cố định ở cột phải của câu hỏi; nút
   `Mở giải thích + thuật ngữ` có thể mở ngay, không cần chọn đáp án trước, để
   xem phần giải thích và nghĩa thuật ngữ tiếng Anh. Trên màn hình nhỏ, khối tự
   xếp xuống dưới câu hỏi; kết quả vẫn có phần xem lại theo từng câu.

Phần payment chỉ là demo UI để troll bạn bè: không có trường thẻ, không gọi
cổng thanh toán và không thu tiền. Modal có QR VietQR MB Bank cho tài khoản
`Vũ Văn Huy / 0339761204`, số tiền `5.000₫`, nội dung hiển thị
`đóng họ hệ thống`; nút `Bỏ qua, vào giải thích` luôn cho phép xem phần giải
thích mà không cần xác nhận giao dịch. Gate tự tắt sau ngày `26/08/2026` theo
timezone `Asia/Ho_Chi_Minh`; sau thời điểm đó API trả phần giải thích trực tiếp.

## Deploy Vercel + MySQL

Vercel không cung cấp MySQL tích hợp cho project này, vì vậy cần một MySQL
public/external (PlanetScale, Aiven, Railway, AWS RDS hoặc MySQL riêng) và
đặt `MYSQL_URL` trong Vercel Project Settings → Environment Variables.

Import schema và seed vào database production:

```bash
mysql -h YOUR_HOST -P 3306 -u YOUR_USER -p YOUR_DATABASE < database/schema.sql
mysql -h YOUR_HOST -P 3306 -u YOUR_USER -p YOUR_DATABASE < database/seed.sql
```

Sau đó deploy:

```bash
npm install --global vercel
vercel login
vercel link
vercel env add MYSQL_URL production
vercel --prod
```

`vercel.json` đã cấu hình `api/index.php` dùng community runtime
`vercel-php@0.9.0`. Đây là runtime PHP cộng đồng; Vercel docs liệt kê PHP
trong nhóm community runtimes và cho phép khai báo runtime trong
`vercel.json`.

## Cấu trúc

```text
quiz-system-php/
├── api/
│   ├── db.php
│   └── index.php
├── database/
│   ├── schema.sql
│   ├── seed.sql
│   └── workspace_seed.sql
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── Dockerfile
├── docker-compose.yml
├── vercel.json
└── .env.example
```
