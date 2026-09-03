BEGIN;
INSERT OR IGNORE INTO questions (id, topic, difficulty, prompt, option_a, option_b, option_c, option_d, correct_option, explanation, terms) VALUES
  (1, 'LLM, Transformer, Token & API', 'Dễ', 'Mối quan hệ nào mô tả đúng AI và Machine Learning?', 'AI là nhánh nhỏ, ML là phạm vi lớn hơn', 'AI là phạm vi lớn, ML là một nhánh học từ dữ liệu', 'AI và ML là hai tên gọi hoàn toàn giống nhau', 'AI chỉ dùng luật, ML chỉ dùng phần cứng', 'B', 'Machine Learning nằm trong phạm vi rộng hơn của Artificial Intelligence và học quy luật từ dữ liệu.', '**Artificial Intelligence**: AI — trí tuệ nhân tạo; lĩnh vực tạo hệ thống có khả năng thực hiện nhiệm vụ thường cần trí tuệ con người.; **Machine Learning**: ML — học máy; nhánh AI học quy luật từ dữ liệu thay vì chỉ dùng luật viết sẵn.'),
  (11, 'LLM, Transformer, Token & API', 'Vừa', 'Một prompt giữ nguyên output nhưng tăng gấp đôi phần context. Tác động hợp lý nhất là gì?', 'Output cost chắc chắn giảm về một nửa', 'Input cost và latency có xu hướng tăng', 'Temperature tự động chuyển thành bằng không', 'Model sẽ tự mở rộng context window', 'B', 'Input token nhiều hơn làm tăng chi phí và thời gian xử lý, dù số token output không đổi.', '**context**: bối cảnh hoặc dữ liệu nền được đưa cho model để xử lý task.; **latency**: độ trễ; thời gian từ lúc gửi yêu cầu đến khi nhận kết quả.; **prompt**: chỉ dẫn hoặc đầu vào bằng ngôn ngữ tự nhiên gửi cho model.; **token**: đơn vị văn bản mà LLM trực tiếp xử lý và thường dùng để tính chi phí.'),
  (21, 'LLM, Transformer, Token & API', 'Khó', 'Trong self-attention, nếu query của token hiện tại tương đồng cao với key của một token khác, điều gì có xu hướng xảy ra?', 'Token đó bị mask chắc chắn khỏi mọi head', 'Token đó nhận trọng số attention cao hơn trong tổng hợp value', 'Token đó được biến thành một tool call ngay lập tức', 'Token đó bị loại khỏi embedding trước khi tính', 'B', 'Q·K tạo attention score; sau scaling và softmax, score cao làm value tương ứng đóng góp nhiều hơn.', '**self-attention**: cơ chế để mỗi token cân nhắc mức liên quan với các token khác trong cùng context.; **token**: đơn vị văn bản mà LLM trực tiếp xử lý và thường dùng để tính chi phí.'),
  (34, 'AI Product, Problem Framing, UX & Evaluation', 'Dễ', 'Observation trong Human-Centered Design tập trung vào điều gì?', 'Quan sát đúng người dùng trong bối cảnh thật', 'Quan sát riêng tốc độ của model', 'Quan sát cách đặt tên các biến Python', 'Quan sát số lượng token của mọi prompt', 'A', 'HCD bắt đầu từ việc quan sát đối tượng mục tiêu và workflow thực tế của họ.', '**observation**: quan sát; kết quả tool hoặc môi trường trả lại cho agent.; **workflow**: quy trình gồm các bước và bàn giao để hoàn thành một công việc.'),
  (51, 'AI Product, Problem Framing, UX & Evaluation', 'Vừa', 'Tác vụ lặp lại, biến thể vừa phải, cần hiểu ngôn ngữ nhưng chưa cần hành động nhiều bước nên bắt đầu ở đâu?', 'Autonomous agent với quyền gọi mọi tool', 'LLM feature hoặc workflow có kiểm soát', 'Rule cứng cho mọi câu nhập tự do', 'Multi-agent trước khi có baseline', 'B', 'AI phù hợp với tác vụ có biến thể vừa phải; chưa cần tăng lên agent nếu workflow có thể kiểm soát.', '**workflow**: quy trình gồm các bước và bàn giao để hoàn thành một công việc.; **agent**: hệ thống dùng model để lập kế hoạch, gọi tool, quan sát kết quả và lặp đến khi hoàn thành mục tiêu.; **LLM**: Large Language Model — mô hình ngôn ngữ lớn.; **AI**: Artificial Intelligence — trí tuệ nhân tạo.'),
  (71, 'AI Product, Problem Framing, UX & Evaluation', 'Khó', 'Stakeholder yêu cầu ''tóm tắt mọi email bằng agent''. Phát biểu nào là problem statement tốt hơn?', 'Công ty cần một agent dùng model mới nhất', 'PM mất 3 giờ mỗi tuần gom feedback email thành báo cáo có cấu trúc', 'Team muốn có chatbot đẹp để trình diễn', 'Sản phẩm phải dùng ít nhất ba tool AI', 'B', 'Problem statement cần actor, pain, tần suất và outcome; không lấy tên giải pháp làm vấn đề.', '**problem statement**: mô tả bài toán rõ actor, pain point, metric, boundary và cách đánh giá.; **stakeholder**: bên liên quan hoặc người có lợi ích/quyền quyết định trong bài toán.; **actor**: tác nhân trực tiếp thực hiện hoặc chịu ảnh hưởng bởi workflow.; **agent**: hệ thống dùng model để lập kế hoạch, gọi tool, quan sát kết quả và lặp đến khi hoàn thành mục tiêu.'),
  (91, 'Prompt Engineering & System Prompt', 'Dễ', 'Bốn thành phần cơ bản của prompt tốt là gì?', 'Model, Token, Cost và Latency', 'Role, Task, Context và Format', 'Input, Vector, Memory và Cloud', 'Rule, Worker, Graph và Trace', 'B', 'Day 4 dùng khung Role / Task / Context / Format để biến ý định thành chỉ dẫn rõ.', '**context**: bối cảnh hoặc dữ liệu nền được đưa cho model để xử lý task.; **prompt**: chỉ dẫn hoặc đầu vào bằng ngôn ngữ tự nhiên gửi cho model.; **role**: vai trò model cần đảm nhận trong prompt.; **task**: nhiệm vụ cụ thể mà prompt yêu cầu model hoàn thành.'),
  (111, 'Prompt Engineering & System Prompt', 'Khó', 'System prompt vừa yêu cầu ''giải thích chi tiết từng bước'' vừa ''trả lời dưới 50 chữ''. Vấn đề chính là gì?', 'Model không thể nhận role và task cùng lúc', 'Contradictory instructions làm output contract không xác định', 'Context bleed luôn do user prompt', 'Tool schema không thể có field required', 'B', 'Prompt production-grade cần tránh mâu thuẫn hoặc nêu ưu tiên rõ khi hai yêu cầu xung đột.', '**output contract**: hợp đồng đầu ra; quy định format, field, giới hạn và điều kiện trả kết quả.; **system prompt**: chỉ dẫn nền do ứng dụng đặt để định nghĩa vai trò, luật và capability của model.; **prompt**: chỉ dẫn hoặc đầu vào bằng ngôn ngữ tự nhiên gửi cho model.'),
  (121, 'Agent, ReAct & Tool Calling', 'Dễ', 'Rule-based bot thường xử lý đầu vào bằng cách nào?', 'Dùng vector similarity cho mọi câu hỏi', 'Dùng các luật if/else được định trước', 'Tự lập kế hoạch qua nhiều công cụ', 'Học lại từ phản hồi sau mỗi lượt', 'B', 'Rule-based bot hoạt động theo luồng và điều kiện do con người viết sẵn.', '**rule-based bot**: bot theo luật; phản hồi bằng các điều kiện if/else được định trước.; **agent**: hệ thống dùng model để lập kế hoạch, gọi tool, quan sát kết quả và lặp đến khi hoàn thành mục tiêu.'),
  (141, 'Agent, ReAct & Tool Calling', 'Khó', 'Trace có ba lỗi: gọi weather trước khi có flight, dùng HCM thay SGN, và final answer đổi 1,75M thành 1,5M. Cách phân loại đúng là gì?', 'Ba lỗi đều là timeout của API', 'Sai dependency, sai tham số và hallucination khi tổng hợp', 'Ba lỗi đều do temperature quá cao', 'Ba lỗi đều do vector store thiếu metadata', 'B', 'Day 3 chỉ rõ thứ tự tool, mã IATA và sự lệch evidence là ba loại lỗi cần sửa khác nhau.', 'Không có thuật ngữ tiếng Anh chuyên môn mới cần giải thích trong câu này.'),
  (151, 'Data Foundations, Embedding & Vector Store', 'Dễ', 'Knowledge data thường bao gồm loại dữ liệu nào?', 'Trạng thái đơn hàng thay đổi từng giây', 'Tài liệu, policy, SOP và FAQ tương đối ổn định', 'Thông tin chỉ tồn tại trong một phiên chat', 'Mã tạm dùng để xác thực một request', 'B', 'Knowledge data là tri thức nền versioned hoặc ít thay đổi mà agent cần tra cứu.', '**agent**: hệ thống dùng model để lập kế hoạch, gọi tool, quan sát kết quả và lặp đến khi hoàn thành mục tiêu.'),
  (171, 'Data Foundations, Embedding & Vector Store', 'Khó', 'Một bảng policy có header bị tách khỏi các dòng khi chunk. Cách sửa ưu tiên là gì?', 'Tăng temperature của generation để đoán header', 'Giữ cấu trúc bảng hoặc chuyển row thành text có header', 'Chia nhỏ mỗi ô thành một vector độc lập', 'Bỏ metadata vì bảng không có câu hoàn chỉnh', 'B', 'Table parsing cần bảo toàn quan hệ header-row; nếu không retrieval mất ngữ cảnh và trả sai.', '**retrieval**: truy xuất; tìm các chunk liên quan từ kho dữ liệu.'),
  (181, 'RAG, Retrieval & Grounding', 'Dễ', 'RAG là viết tắt của cụm nào?', 'Random Agent Generation', 'Retrieval-Augmented Generation', 'Reasoning and Guardrail', 'Ranked API Gateway', 'B', 'RAG kết hợp truy xuất tài liệu với khả năng sinh ngôn ngữ của LLM.', '**generation**: tạo sinh; bước LLM tổng hợp câu trả lời từ context đã truy xuất.; **retrieval**: truy xuất; tìm các chunk liên quan từ kho dữ liệu.; **LLM**: Large Language Model — mô hình ngôn ngữ lớn.; **RAG**: Retrieval-Augmented Generation — tạo sinh tăng cường bằng truy xuất tài liệu.'),
  (201, 'RAG, Retrieval & Grounding', 'Khó', 'PDF hai cột làm parser trộn thứ tự câu. Lỗi này nằm ở tầng nào trước khi chunk?', 'Temperature của model trả lời', 'Document parsing/ingestion, không phải generation', 'Reranker sau khi đã inject context', 'Output citation sau khi user đọc', 'B', 'Nếu nội dung đã bị đọc sai từ nguồn thì mọi embedding và generation phía sau đều bị ảnh hưởng.', '**generation**: tạo sinh; bước LLM tổng hợp câu trả lời từ context đã truy xuất.; **embedding**: vector số biểu diễn ngữ nghĩa của văn bản, hình ảnh hoặc dữ liệu khác.'),
  (211, 'Multi-Agent, MCP, A2A & LangGraph', 'Dễ', 'Khi nào single-agent có thể bắt đầu quá tải?', 'Khi chỉ trả lời một câu hỏi FAQ', 'Khi phải giữ nhiều vai trò, tool output và state', 'Khi chỉ dùng một prompt ngắn', 'Khi chỉ chạy một hàm tính toán', 'B', 'Context bottleneck và quá nhiều trách nhiệm là dấu hiệu cân nhắc multi-agent.', '**multi-agent**: hệ nhiều agent được phân vai và phối hợp cho cùng một nhiệm vụ.; **context**: bối cảnh hoặc dữ liệu nền được đưa cho model để xử lý task.; **agent**: hệ thống dùng model để lập kế hoạch, gọi tool, quan sát kết quả và lặp đến khi hoàn thành mục tiêu.'),
  (231, 'Multi-Agent, MCP, A2A & LangGraph', 'Khó', 'Một single-agent phải đọc hợp đồng 80 trang, tra luật, gọi API và viết risk summary. Dấu hiệu chia agent mạnh nhất là gì?', 'Task chỉ có một bước và một source', 'Nhiều vai trò, nguồn độc lập và cần debug lỗi theo tầng', 'Không có worker nào có capability riêng', 'Chỉ muốn tăng số LLM call cho vui', 'B', 'Context bottleneck, nhiều vai trò và nhu cầu truy nguyên lỗi là lý do thực dụng để phân chia.', '**context**: bối cảnh hoặc dữ liệu nền được đưa cho model để xử lý task.; **agent**: hệ thống dùng model để lập kế hoạch, gọi tool, quan sát kết quả và lặp đến khi hoàn thành mục tiêu.; **API**: Application Programming Interface — giao diện để phần mềm gửi yêu cầu và nhận kết quả từ dịch vụ.'),
  (241, 'Data Pipeline, Quality & Data Observability', 'Dễ', 'ETL khác ELT chủ yếu ở thứ tự nào?', 'ETL load trước extract, ELT extract sau load', 'ETL transform trước load, ELT load trước transform', 'ETL chỉ dùng streaming, ELT chỉ dùng batch', 'ETL không có transform, ELT không có extract', 'B', 'Cả hai đều có Extract, Transform và Load; điểm khác là vị trí transform.', '**ETL**: Extract–Transform–Load — lấy, biến đổi rồi nạp dữ liệu.; **ELT**: Extract–Load–Transform — lấy, nạp raw trước rồi biến đổi trong kho đích.'),
  (261, 'Data Pipeline, Quality & Data Observability', 'Khó', 'Một lỗi parser làm chunk ngắn bất thường, retrieval sai và agent trả policy cũ. Đây là mẫu lỗi nào?', 'Chỉ là temperature drift ở generation', 'Data cascade từ upstream lan qua ingestion và serving', 'Chỉ là false positive của UI', 'Chỉ là lỗi auth của API gateway', 'B', 'Một quyết định/lỗi đầu nguồn có thể làm hậu quả lớn dần qua các tầng.', '**retrieval**: truy xuất; tìm các chunk liên quan từ kho dữ liệu.; **agent**: hệ thống dùng model để lập kế hoạch, gọi tool, quan sát kết quả và lặp đến khi hoàn thành mục tiêu.'),
  (271, 'Guardrails, Safety, Deployment & Observability', 'Dễ', 'Guardrails tồn tại để làm gì?', 'Làm model sinh văn bản dài hơn', 'Giới hạn hành vi rủi ro và tăng độ tin cậy của agent', 'Thay thế toàn bộ việc đánh giá sản phẩm', 'Bảo đảm mọi prompt đều cho cùng kết quả', 'B', 'Guardrails là lớp kiểm soát bắt buộc khi agent có dữ liệu, tool hoặc hành động thực tế.', '**guardrails**: hàng rào kiểm soát; các lớp giới hạn input, model, output và hành động rủi ro.; **agent**: hệ thống dùng model để lập kế hoạch, gọi tool, quan sát kết quả và lặp đến khi hoàn thành mục tiêu.'),
  (291, 'Guardrails, Safety, Deployment & Observability', 'Khó', 'Agent vừa đọc dữ liệu riêng, vừa nhận nội dung web không tin cậy, vừa có quyền gửi email. Vì sao đây là lethal trifecta?', 'Ba yếu tố chỉ làm latency tăng nhưng không tăng risk', 'Ba yếu tố cùng tạo đường từ untrusted input tới side effect trên private data', 'Private data tự động làm mọi prompt an toàn hơn', 'Có email tool thì agent không cần input guardrail', 'B', 'Private data, untrusted content và external side effect kết hợp làm blast radius lớn.', '**side effect**: tác động bên ngoài như gửi email, xóa dữ liệu, trừ tiền hoặc đặt vé.; **agent**: hệ thống dùng model để lập kế hoạch, gọi tool, quan sát kết quả và lặp đến khi hoàn thành mục tiêu.');

INSERT INTO workspaces (id, slug, name, description, kind)
VALUES
  (1, 'ai20k-cau-hoi-cu', 'AI20K — Câu hỏi hiện có', 'Bộ câu hỏi trắc nghiệm AI20K hiện có, giữ nguyên đáp án và giải thích.', 'quiz'),
  (2, 'bai-thi-thi-khoa-2', 'bài thi thi khoá 2', 'Bộ câu hỏi và phần trả lời/giải thích được giữ nguyên từ link ChatGPT đã chia sẻ.', 'study')
ON CONFLICT(id) DO UPDATE SET
  slug = excluded.slug,
  name = excluded.name,
  description = excluded.description,
  kind = excluded.kind;

INSERT INTO workspace_items (id, workspace_id, question_id, item_type, sort_order)
SELECT id, 1, id, 'mcq', id
FROM questions
WHERE id IN (1, 11, 21, 34, 51, 71, 91, 111, 121, 141, 151, 171, 181, 201, 211, 231, 241, 261, 271, 291)
ON CONFLICT(id) DO UPDATE SET
  workspace_id = excluded.workspace_id,
  question_id = excluded.question_id,
  item_type = excluded.item_type,
  sort_order = excluded.sort_order;

INSERT INTO workspace_items
  (id, workspace_id, item_type, sort_order, topic, difficulty, prompt, answer, explanation, terms, source_url, source_title)
VALUES
  (10001, 2, 'reference', 1, 'RAG Evaluation', 'Vừa',
   'Bốn metric đánh giá toàn diện hệ thống RAG',
   'Nếu viết ở mức sinh viên năm 3–4 thì có thể trả lời ngắn gọn như sau:

1. Faithfulness: Đo xem câu trả lời của agent có đúng với thông tin trong tài liệu bảo hành hay không. Ví dụ tài liệu ghi bảo hành 12 tháng thì agent không được trả lời thành 24 tháng.

2. Answer Relevancy: Đo mức độ câu trả lời có đúng với câu hỏi của khách hàng hay không. Ví dụ khách hỏi về bảo hành màn hình thì agent phải trả lời đúng nội dung đó, không lan sang bảo hành pin.

3. Context Precision: Đánh giá các tài liệu mà hệ thống retrieve có thực sự liên quan đến câu hỏi không. Nếu hỏi về đổi trả nhưng lại lấy tài liệu vận chuyển thì precision sẽ thấp.

4. Context Recall: Đo khả năng hệ thống lấy đủ các tài liệu cần thiết để trả lời. Nếu câu hỏi cần nhiều điều kiện của chính sách bảo hành mà hệ thống chỉ lấy được một phần thì recall sẽ thấp.

Bốn metric này giúp đánh giá toàn diện hệ thống RAG: retrieval có lấy đúng và đủ tài liệu hay không (Context Precision, Context Recall), còn câu trả lời có đúng tài liệu và đúng câu hỏi hay không (Faithfulness, Answer Relevancy).',
   '',
   'Faithfulness; Answer Relevancy; Context Precision; Context Recall; RAG; retrieval',
   'https://chatgpt.com/share/6a97a0e0-bb60-83ec-8d2a-17c19d82d6f2?ogimg=plain',
   'Exposing AI via REST API'),
  (10002, 2, 'qa', 2, 'RAG Evaluation', 'Khó',
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
   'Faithfulness; Context Recall; Retrieval; retriever; chunking; embedding; top-k; vector database; retrieval pipeline',
   'https://chatgpt.com/share/6a97a0e0-bb60-83ec-8d2a-17c19d82d6f2?ogimg=plain',
   'Exposing AI via REST API'),
  (10003, 2, 'qa', 3, 'RAG Evaluation', 'Khó',
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
   'golden dataset; Ground Truth Answer; Relevant Document/Chunk; Expected Source; Category; evaluation; Faithfulness; Answer Relevancy; Context Precision; Context Recall',
   'https://chatgpt.com/share/6a97a0e0-bb60-83ec-8d2a-17c19d82d6f2?ogimg=plain',
   'Exposing AI via REST API')
ON CONFLICT(id) DO UPDATE SET
  workspace_id = excluded.workspace_id,
  item_type = excluded.item_type,
  sort_order = excluded.sort_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty,
  prompt = excluded.prompt,
  answer = excluded.answer,
  explanation = excluded.explanation,
  terms = excluded.terms,
  source_url = excluded.source_url,
  source_title = excluded.source_title;
COMMIT;
