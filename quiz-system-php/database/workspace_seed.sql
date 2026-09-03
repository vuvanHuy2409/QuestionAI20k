SET NAMES utf8mb4;

INSERT INTO workspaces (id, slug, name, description, kind)
VALUES
  (1, 'ai20k-cau-hoi-cu', 'AI20K — Câu hỏi hiện có', 'Bộ câu hỏi trắc nghiệm AI20K hiện có, giữ nguyên đáp án và giải thích.', 'quiz'),
  (2, 'bai-thi-thi-khoa-2', 'bài thi thi khoá 2', 'Hai cặp câu hỏi và câu trả lời được crawl từ link ChatGPT đã chia sẻ.', 'study')
ON DUPLICATE KEY UPDATE
  slug = VALUES(slug),
  name = VALUES(name),
  description = VALUES(description),
  kind = VALUES(kind);

INSERT INTO workspace_items
  (id, workspace_id, question_id, item_type, sort_order, topic, difficulty, prompt, answer, explanation, terms, source_url, source_title)
SELECT
  q.id,
  1,
  q.id,
  'mcq',
  q.sort_order,
  q.topic,
  q.difficulty,
  q.prompt,
  CONCAT(q.correct_option, '. ', COALESCE((
    SELECT option_text
    FROM question_options
    WHERE question_id = q.id AND option_key = q.correct_option
    LIMIT 1
  ), '')),
  q.explanation,
  q.terms,
  '',
  ''
FROM questions AS q
WHERE q.set_id = 1
ON DUPLICATE KEY UPDATE
  workspace_id = VALUES(workspace_id),
  question_id = VALUES(question_id),
  item_type = VALUES(item_type),
  sort_order = VALUES(sort_order),
  topic = VALUES(topic),
  difficulty = VALUES(difficulty),
  prompt = VALUES(prompt),
  answer = VALUES(answer),
  explanation = VALUES(explanation),
  terms = VALUES(terms);

DELETE FROM workspace_items
WHERE workspace_id = 2 AND id NOT IN (10002, 10003);

INSERT INTO workspace_items
  (id, workspace_id, item_type, sort_order, topic, difficulty, prompt, answer, explanation, terms, source_url, source_title)
VALUES
  (10002, 2, 'qa', 1, '', '',
   'Tình huống: Team đang build agent trả lời câu hỏi về chính sách bảo hành sản phẩm điện tử cho bộ phận CSKH.

Sau 2 tuần demo, tech lead yêu cầu: ''Trước khi production, tôi cần bằng chứng khoa học agent này tốt. Không phải cảm nhận — cần số liệu cụ thể.'' Team có: 500 câu hỏi thực từ CSKH trong 3 tháng qua, tài liệu bảo hành đầy đủ, và budget để dùng GPT-4 làm judge.

Nếu Faithfulness = 0.95 nhưng Context Recall = 0.60, điều này có nghĩa gì? Nên fix ở đâu',
   'Có thể trả lời ở mức sinh viên năm 3–4 như sau:

Faithfulness = 0.95 nghĩa là câu trả lời của agent hầu như luôn đúng với tài liệu được lấy ra, rất ít hoặc không bị hallucination.

Context Recall = 0.60 nghĩa là hệ thống chỉ lấy được khoảng 60% tài liệu cần thiết để trả lời câu hỏi. Nói cách khác, retriever thường bỏ sót các thông tin liên quan.

Vì vậy, vấn đề nằm ở Retrieval, không phải ở LLM. Nên cải thiện phần RAG retrieval, ví dụ:

Cải thiện chunking tài liệu.

Tối ưu embedding model.

Điều chỉnh top-k.

Cập nhật hoặc tối ưu vector database và retrieval pipeline.

Kết luận: Agent trả lời đúng trên những tài liệu đã lấy được (Faithfulness cao), nhưng do retrieval chưa lấy đủ tài liệu (Context Recall thấp) nên nhiều câu trả lời có thể vẫn thiếu thông tin. Cần ưu tiên fix ở tầng Retrieval.',
   '',
   '',
   '',
   ''),
  (10003, 2, 'qa', 2, '', '',
   'Tình huống: Team đang build agent trả lời câu hỏi về chính sách bảo hành sản phẩm điện tử cho bộ phận CSKH.

Sau 2 tuần demo, tech lead yêu cầu: ''Trước khi production, tôi cần bằng chứng khoa học agent này tốt. Không phải cảm nhận — cần số liệu cụ thể.'' Team có: 500 câu hỏi thực từ CSKH trong 3 tháng qua, tài liệu bảo hành đầy đủ, và budget để dùng GPT-4 làm judge.

Thiết kế golden dataset từ 500 câu hỏi trên. Mô tả: cách chọn 20 câu đại diện, thông tin cần có trong mỗi row.',
   'Có thể trả lời ngắn gọn ở mức sinh viên năm 3–4 như sau:

Để tạo golden dataset, trước tiên chọn 20 câu hỏi đại diện từ 500 câu hỏi thật. Nên chọn đủ nhiều nhóm như: thời hạn bảo hành, điều kiện được bảo hành, trường hợp từ chối bảo hành, đổi trả, sửa chữa, bảo hành phụ kiện và các câu hỏi khó hoặc nhiều điều kiện để tập dữ liệu phản ánh đúng các tình huống thực tế.

Mỗi row trong golden dataset nên gồm các thông tin:

Question: Câu hỏi của khách hàng.

Ground Truth Answer: Câu trả lời đúng theo tài liệu bảo hành.

Relevant Document/Chunk: Tài liệu hoặc đoạn văn bản được dùng để trả lời.

Expected Source: Tên tài liệu hoặc ID của chunk.

Category: Loại câu hỏi (thời hạn bảo hành, đổi trả, từ chối bảo hành,...).

Golden dataset này sẽ được dùng để chạy evaluation, so sánh câu trả lời của agent với đáp án chuẩn và tính các metric như Faithfulness, Answer Relevancy, Context Precision và Context Recall trước khi đưa hệ thống vào production.',
   '',
   '',
   '',
   '')
ON DUPLICATE KEY UPDATE
  question_id = NULL,
  workspace_id = VALUES(workspace_id),
  item_type = VALUES(item_type),
  sort_order = VALUES(sort_order),
  topic = VALUES(topic),
  difficulty = VALUES(difficulty),
  prompt = VALUES(prompt),
  answer = VALUES(answer),
  explanation = VALUES(explanation),
  terms = VALUES(terms),
  source_url = VALUES(source_url),
  source_title = VALUES(source_title);
