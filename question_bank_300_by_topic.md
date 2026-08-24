# Bộ 300 câu hỏi ôn tập AI20K theo nhánh chủ đề

> Bản này giữ nguyên nội dung, đáp án và giải thích của `question_bank_300.md`, nhưng sắp xếp lại theo các nhánh kiến thức lớn và đánh số lại liên tục từ 1 đến 300. Trong mỗi nhánh, câu hỏi vẫn được chia thành Dễ, Vừa và Khó.

## Mục lục theo nhánh

| Nhánh | Các set | Phạm vi |
|---|---|---|
| [1. LLM, Transformer, Token & API](#1-llm-transformer-token--api) | [Set D1](#set-d1) / [Set V1](#set-v1) / [Set K1](#set-k1) | Nền tảng mô hình ngôn ngữ, token economy, tham số sampling và gọi API. |
| [2. AI Product, Problem Framing, UX & Evaluation](#2-ai-product-problem-framing-ux--evaluation) | [Set D2](#set-d2) / [Set D5](#set-d5) / [Set V2](#set-v2) / [Set V5](#set-v5) / [Set K2](#set-k2) / [Set K5](#set-k5) | Xác định bài toán, chọn kiến trúc, prototype, agency, trust và đánh giá sản phẩm AI. |
| [3. Prompt Engineering & System Prompt](#3-prompt-engineering--system-prompt) | [Set D4](#set-d4) / [Set V4](#set-v4) / [Set K4](#set-k4) | Thiết kế prompt, few-shot, context structure, output contract và system prompt production-grade. |
| [4. Agent, ReAct & Tool Calling](#4-agent-react--tool-calling) | [Set D3](#set-d3) / [Set V3](#set-v3) / [Set K3](#set-k3) | Phân biệt chatbot/agent, vòng lặp ReAct, orchestration tool, error handling và agent evaluation. |
| [5. Data Foundations, Embedding & Vector Store](#5-data-foundations-embedding--vector-store) | [Set D6](#set-d6) / [Set V6](#set-v6) / [Set K6](#set-k6) | Phân loại dữ liệu, memory, embedding, metadata, chunking và semantic search nền tảng. |
| [6. RAG, Retrieval & Grounding](#6-rag-retrieval--grounding) | [Set D7](#set-d7) / [Set V7](#set-v7) / [Set K7](#set-k7) | Indexing, retrieval, query transformation, hybrid search, reranking, grounding và RAG evaluation. |
| [7. Multi-Agent, MCP, A2A & LangGraph](#7-multi-agent-mcp-a2a--langgraph) | [Set D8](#set-d8) / [Set V8](#set-v8) / [Set K8](#set-k8) | Supervisor-worker, shared state, MCP, message contract A2A, routing và orchestration graph. |
| [8. Data Pipeline, Quality & Data Observability](#8-data-pipeline-quality--data-observability) | [Set D9](#set-d9) / [Set V9](#set-v9) / [Set K9](#set-k9) | ETL/ELT, ingestion, CDC, data contract, quality gate, drift, idempotency và triage. |
| [9. Guardrails, Safety, Deployment & Observability](#9-guardrails-safety-deployment--observability) | [Set D10](#set-d10) / [Set V10](#set-v10) / [Set K10](#set-k10) | Prompt injection, defense in depth, HITL, Docker/cloud, reliability, monitoring và incident debugging. |

---

<a name="1-llm-transformer-token--api"></a>
## 1. LLM, Transformer, Token & API

Nền tảng mô hình ngôn ngữ, token economy, tham số sampling và gọi API.

### Dễ

#### <a name="set-d1"></a>Set D1: Nền tảng LLM, Transformer và token


**Câu 1.** Mối quan hệ nào mô tả đúng AI và Machine Learning?

A. AI là nhánh nhỏ, ML là phạm vi lớn hơn
B. AI là phạm vi lớn, ML là một nhánh học từ dữ liệu
C. AI và ML là hai tên gọi hoàn toàn giống nhau
D. AI chỉ dùng luật, ML chỉ dùng phần cứng

**Câu 2.** Discriminative AI thường được dùng để làm việc gì?

A. Sinh một đoạn văn mới theo yêu cầu
B. Lưu tài liệu thành vector để tìm kiếm
C. Phân loại hoặc dự đoán nhãn từ dữ liệu
D. Điều phối nhiều agent qua các công cụ

**Câu 3.** Generative AI có đặc điểm chính nào?

A. Chỉ chọn nhãn có sẵn trong bảng dữ liệu
B. Chỉ kiểm tra trạng thái của một máy chủ
C. Chỉ chuyển văn bản thành mã định danh
D. Tạo ra nội dung mới từ mẫu đã học

**Câu 4.** LLM được mô tả đúng nhất là gì?

A. Mô hình ngôn ngữ lớn xây trên kiến trúc Transformer
B. Cơ sở dữ liệu lưu toàn bộ câu trả lời cố định
C. Bộ luật if/else chuyên xử lý câu hỏi ngắn
D. Thiết bị phần cứng dùng để tăng tốc mạng

**Câu 5.** Transformer xử lý chuỗi bằng cơ chế cốt lõi nào?

A. Bộ luật cố định để thay thế từng ký tự
B. Bộ nhớ ngoài để lưu mọi phiên hội thoại
C. Self-attention để liên hệ các token trong ngữ cảnh
D. Bộ lọc ảnh để nhận dạng từng điểm ảnh

**Câu 6.** Token trong LLM là gì?

A. Một người dùng duy nhất trong hệ thống
B. Một trang tài liệu hoàn chỉnh trong kho
C. Một lần triển khai mô hình lên máy chủ
D. Đơn vị văn bản nhỏ nhất mô hình trực tiếp xử lý

**Câu 7.** Next-token prediction nghĩa là mô hình làm gì?

A. Dự đoán token tiếp theo dựa trên context hiện có
B. Đọc chính xác suy nghĩ của người dùng
C. Tìm một câu trả lời duy nhất trong cơ sở dữ liệu
D. Chạy lại toàn bộ quá trình huấn luyện sau mỗi câu hỏi

**Câu 8.** Pre-training có vai trò gì trong quy trình tạo LLM?

A. Chọn giao diện hiển thị cho ứng dụng cuối
B. Học ngôn ngữ và tri thức từ tập dữ liệu lớn
C. Đặt giới hạn số vòng gọi tool của agent
D. Kiểm tra thủ công từng câu trả lời trước khi gửi

**Câu 9.** Knowledge cutoff của LLM nói lên điều gì?

A. Mô hình không thể đọc thêm token trong context
B. Mô hình luôn bị giới hạn bởi một loại phần cứng
C. Mô hình tự động xóa mọi dữ liệu sau mỗi lần gọi
D. Mô hình có thể thiếu sự kiện xảy ra sau dữ liệu huấn luyện

**Câu 10.** Trong cách tính phí API, tổng token thường gồm thành phần nào?

A. Số người dùng cộng với số máy chủ
B. Số tool gọi cộng với số lần retry
C. Input tokens cộng với output tokens
D. Số trang tài liệu cộng với số dòng mã

<details>
<summary>Đáp án và giải thích Set D1</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 1 | B | Machine Learning nằm trong phạm vi rộng hơn của Artificial Intelligence và học quy luật từ dữ liệu. | Day 1 — AI Taxonomy |
| 2 | C | Slide phân biệt Discriminative AI với Generative AI: nhóm đầu chủ yếu phân loại và dự đoán. | Day 1 — Ba nhóm AI |
| 3 | D | Generative AI sinh văn bản, hình ảnh hoặc nội dung mới thay vì chỉ chọn nhãn. | Day 1 — Ba nhóm AI |
| 4 | A | Slide định nghĩa LLM là mô hình ngôn ngữ lớn dựa trên Transformer và dữ liệu văn bản quy mô lớn. | Day 1 — Định nghĩa LLM |
| 5 | C | Self-attention cho phép mô hình cân nhắc quan hệ giữa các token trong cùng ngữ cảnh. | Day 1 — Transformer |
| 6 | D | Token có thể là từ, một phần từ hoặc ký hiệu; đây là đơn vị tính toán và tính phí. | Day 1 — Token |
| 7 | A | LLM sinh văn bản tuần tự bằng cách ước lượng xác suất cho token tiếp theo. | Day 1 — Next-token Prediction |
| 8 | B | Pre-training là giai đoạn mô hình đọc dữ liệu quy mô lớn để học biểu diễn ngôn ngữ và kiến thức. | Day 1 — Quy trình huấn luyện |
| 9 | D | Nếu không có retrieval hoặc công cụ cập nhật, LLM không tự biết sự kiện sau thời điểm training. | Day 1 — Giới hạn LLM |
| 10 | C | Slide Token Economy nêu tổng chi phí dựa trên token đầu vào và token đầu ra. | Day 1 — Token Economy |

</details>

---

### Vừa

#### <a name="set-v1"></a>Set V1: Token economy, API và vận hành LLM


**Câu 11.** Một prompt giữ nguyên output nhưng tăng gấp đôi phần context. Tác động hợp lý nhất là gì?

A. Output cost chắc chắn giảm về một nửa
B. Input cost và latency có xu hướng tăng
C. Temperature tự động chuyển thành bằng không
D. Model sẽ tự mở rộng context window

**Câu 12.** Với tác vụ phân loại cần kết quả ổn định, lựa chọn nào phù hợp hơn?

A. Temperature cao để tăng cách diễn đạt
B. Context dài để thay thế nhãn chuẩn
C. Temperature thấp để giảm độ đa dạng
D. Streaming bật để thay đổi xác suất

**Câu 13.** Một request vừa có input vừa có output token. Context window cần tính đến gì?

A. Chỉ số token ở phần user prompt
B. Chỉ số token của câu trả lời cuối
C. Chỉ số token của toàn bộ dữ liệu huấn luyện
D. Tổng giới hạn của input và output trong lần gọi

**Câu 14.** Streaming response cải thiện trải nghiệm chủ yếu bằng cách nào?

A. Hiển thị từng phần thay vì chờ toàn bộ output
B. Loại bỏ hoàn toàn chi phí output token
C. Làm model biết thêm dữ liệu sau cutoff
D. Bảo đảm câu trả lời cuối không hallucinate

**Câu 15.** Khi chọn giữa model rẻ và model mạnh, nguyên tắc thực dụng nào đúng?

A. Luôn dùng model lớn cho mọi request
B. Chỉ chọn theo tên model phổ biến
C. Dùng model nhỏ đủ tốt cho tác vụ đơn giản
D. Chọn model có context dài nhất bất kể cost

**Câu 16.** Tự host LLM giúp kiểm soát điều gì nhưng phải gánh thêm gì?

A. Không cần GPU nhưng mất quyền sửa prompt
B. Không có chi phí nhưng mất toàn bộ dữ liệu
C. Luôn nhanh hơn API nhưng không cần monitoring
D. Kiểm soát hạ tầng tốt hơn nhưng phải vận hành model

**Câu 17.** Một API wrapper tốt nên tách phần nào ra khỏi code nghiệp vụ?

A. Khởi tạo client, cấu hình endpoint và đọc token usage
B. Tên sản phẩm, màu nút và bố cục trang
C. Toàn bộ dữ liệu người dùng thành weights
D. Mọi lỗi thành câu trả lời thành công

**Câu 18.** Nếu tăng top_p hoặc temperature trong task sáng tạo, kết quả thường thay đổi thế nào?

A. Output luôn ngắn hơn và rẻ hơn
B. Không gian mẫu rộng hơn và output đa dạng hơn
C. Model tự chuyển sang dùng retrieval
D. Context window tự tăng thêm token

**Câu 19.** Tại sao prompt dài có thể làm output kém dù model có context lớn?

A. Token dài luôn bị model xóa trước khi đọc
B. Context lớn khiến mọi tool tự tắt
C. Prompt dài bắt buộc temperature bằng một
D. Context thêm có thể tạo nhiễu và làm loãng chỉ dẫn

**Câu 20.** Vibe coding vẫn cần bước nào sau khi AI sinh code?

A. Tin code ngay nếu chạy được lần đầu
B. Xóa prompt để code tự bảo trì
C. Test, kiểm tra và refine theo kết quả thực tế
D. Bỏ qua test vì model đã học code

<details>
<summary>Đáp án và giải thích Set V1</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 11 | B | Input token nhiều hơn làm tăng chi phí và thời gian xử lý, dù số token output không đổi. | Day 1 — Token Economy |
| 12 | C | Slide khuyên bắt đầu temperature=0 cho code, phân tích hoặc tác vụ cần tính tất định hơn. | Day 1 — Temperature |
| 13 | D | Context window là số token tối đa mô hình xử lý trong một lần gọi, gồm input và output. | Day 1 — Context Window |
| 14 | A | Streaming giảm cảm giác chờ bằng cách gửi chunk sớm; nó không tự giảm token hay lỗi nội dung. | Day 1 — Streaming |
| 15 | C | Framework chọn model cân bằng chất lượng, latency và chi phí theo độ khó của task. | Day 1 — Chọn model |
| 16 | D | Self-host tăng quyền kiểm soát và riêng tư nhưng đổi lại là chi phí, hạ tầng và vận hành. | Day 1 — Self-host LLM |
| 17 | A | Wrapper giúp chuẩn hóa provider, cấu hình và theo dõi usage để code ứng dụng gọn hơn. | Day 1 — API Wrapper |
| 18 | B | Các tham số sampling cao hơn thường mở rộng lựa chọn token; cần cân bằng với tính ổn định. | Day 1 — Sampling |
| 19 | D | Day 4 nhấn mạnh token thừa vừa tốn chi phí vừa có thể làm model khó tập trung. | Day 4 — Token Budget Awareness |
| 20 | C | Workflow của Vibe Coding là Idea → Prompt → Code → Test → Refine, không dừng ở việc sinh code. | Day 1 — Vibe Coding |

</details>

---

### Khó

#### <a name="set-k1"></a>Set K1: Suy luận về Transformer và economics của LLM


**Câu 21.** Trong self-attention, nếu query của token hiện tại tương đồng cao với key của một token khác, điều gì có xu hướng xảy ra?

A. Token đó bị mask chắc chắn khỏi mọi head
B. Token đó nhận trọng số attention cao hơn trong tổng hợp value
C. Token đó được biến thành một tool call ngay lập tức
D. Token đó bị loại khỏi embedding trước khi tính

**Câu 22.** Vì sao scaled dot-product attention chia score cho căn bậc hai của số chiều key?

A. Giảm số token đầu vào xuống một nửa
B. Biến decoder thành encoder trong mọi model
C. Giữ độ lớn score ổn định để softmax không quá bão hòa
D. Đảm bảo mọi token có cùng trọng số

**Câu 23.** Decoder-only Transformer cần masked self-attention vì lý do nào?

A. Không cho model đọc system prompt trước user prompt
B. Không cho embedding dùng positional encoding
C. Không cho nhiều head cùng xử lý một câu
D. Không cho token hiện tại nhìn token tương lai khi dự đoán

**Câu 24.** Một prompt tiếng Việt dài hơn prompt tiếng Anh cùng nghĩa có thể làm cost cao hơn vì sao?

A. Tokenizer có thể tách tiếng Việt thành nhiều subword token hơn
B. Tiếng Việt luôn có output temperature cao hơn
C. Model decoder-only không đọc được dấu tiếng Việt
D. API luôn tính mỗi ký tự tiếng Việt thành một request

**Câu 25.** Nếu system prompt chiếm 20%, retrieved context 60% và phần còn lại dành cho query/output, thiết kế này đang làm gì?

A. Đảm bảo mọi chunk retrieved đều đúng tuyệt đối
B. Phân bổ ngân sách context để giữ headroom cho request
C. Biến output token thành input token miễn phí
D. Tắt cơ chế attention ở phần giữa prompt

**Câu 26.** Một chatbot có 1.000 lượt/ngày, mỗi lượt 500 input và 200 output token. Công thức cost đúng nhất là gì?

A. Chỉ tính 1.000 request vì token không ảnh hưởng giá
B. Chỉ tính 700 output token cho cả ngày
C. Tính 500.000 input và 200.000 output token theo đơn giá model
D. Tính số trang tài liệu thay cho input/output token

**Câu 27.** Vì sao temperature=0 vẫn không đồng nghĩa hệ thống luôn đúng?

A. Temperature=0 luôn bật web search tự động
B. Temperature=0 làm model đọc được dữ liệu tương lai
C. Temperature=0 thay thế mọi bước eval bằng rule
D. Nó chỉ giảm sampling, không sửa knowledge, retrieval hoặc prompt

**Câu 28.** Một request FAQ đơn giản và một request reasoning nhiều bước nên có chiến lược model nào?

A. Route FAQ tới model rẻ, task khó tới model mạnh hơn
B. Route cả hai tới model lớn nhất để dễ quản lý
C. Route cả hai tới model nhỏ dù quality không đủ
D. Chọn model theo thứ tự người dùng gửi request

**Câu 29.** SFT đứng ở đâu trong chuỗi tạo model usable?

A. Trước khi model đọc bất kỳ dữ liệu nào
B. Sau pre-training và trước alignment như RLHF/DPO
C. Sau deployment và thay cho monitoring
D. Chỉ chạy khi vector store bị đầy

**Câu 30.** Embedding của câu hỏi và token embedding trong Transformer khác nhau ở điểm nào?

A. Cả hai luôn là cùng một vector được lưu trong database
B. Token embedding chỉ dùng cho RAG, embedding query chỉ dùng cho decoder
C. Chúng phục vụ hai tầng biểu diễn và truy xuất khác nhau
D. Embedding query không chứa thông tin ngữ nghĩa

<details>
<summary>Đáp án và giải thích Set K1</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 21 | B | Q·K tạo attention score; sau scaling và softmax, score cao làm value tương ứng đóng góp nhiều hơn. | Day 1 — Self-Attention Q/K/V |
| 22 | C | Scaling giúp gradient và phân phối softmax ổn định hơn khi vector có nhiều chiều. | Day 1 — Scaled Dot-Product Attention |
| 23 | D | Causal mask bảo đảm quá trình next-token prediction không nhìn trước đáp án tương lai. | Day 1 — Masked Self-Attention |
| 24 | A | Tokenization không đồng nhất giữa ngôn ngữ; số token, không phải số từ trực tiếp, quyết định cost. | Day 1 — Token Economy |
| 25 | B | Day 8 đưa ví dụ phân bổ 20/60/20 để tránh nhồi context đến sát giới hạn. | Day 8 — Context Budget |
| 26 | C | Chi phí phải nhân số lượt với token từng loại rồi áp đơn giá input và output riêng. | Day 1 — Cost Example |
| 27 | D | Tính ổn định của sampling không tạo thêm evidence hoặc loại bỏ lỗi kiến trúc. | Day 1 — Temperature |
| 28 | A | Framework chọn model theo task, ưu tiên cost/latency khi chất lượng model nhỏ đã đủ. | Day 1 — Model Selection |
| 29 | B | Slide tóm tắt Pre-training → SFT → RLHF/DPO; mỗi bước phục vụ một mục tiêu khác. | Day 1 — Training Stages |
| 30 | C | Token embedding là đầu vào nội bộ Transformer; embedding model phục vụ so sánh ngữ nghĩa cho retrieval. | Day 1 / Day 7 — Embeddings |

</details>

---

<a name="2-ai-product-problem-framing-ux--evaluation"></a>
## 2. AI Product, Problem Framing, UX & Evaluation

Xác định bài toán, chọn kiến trúc, prototype, agency, trust và đánh giá sản phẩm AI.

### Dễ

#### <a name="set-d2"></a>Set D2: Problem-first và AI product


**Câu 31.** Tư duy problem-first yêu cầu nhóm làm gì trước?

A. Chọn model lớn nhất trước khi gặp người dùng
B. Làm rõ vấn đề thật trước khi chọn giải pháp AI
C. Xây agent hoàn chỉnh trước khi đo nhu cầu
D. Mua hạ tầng đắt nhất trước khi viết metric

**Câu 32.** Trong ví dụ 'muốn xây chatbot', câu hỏi đầu tiên nên là gì?

A. Nên dùng thương hiệu model nào
B. Nên đặt màu giao diện nào
C. Người dùng thực sự đang gặp bài toán nào
D. Nên mở bao nhiêu máy chủ

**Câu 33.** Double Diamond giúp nhóm cân bằng hai hoạt động nào?

A. Huấn luyện rồi nén model
B. Mã hóa rồi giải mã dữ liệu
C. Gọi tool rồi xóa toàn bộ trace
D. Mở rộng để khám phá rồi thu hẹp để chọn

**Câu 34.** Observation trong Human-Centered Design tập trung vào điều gì?

A. Quan sát đúng người dùng trong bối cảnh thật
B. Quan sát riêng tốc độ của model
C. Quan sát cách đặt tên các biến Python
D. Quan sát số lượng token của mọi prompt

**Câu 35.** Baseline có ý nghĩa gì khi đánh giá một ý tưởng AI?

A. Một prompt dài để khởi động mô hình
B. Một tool bắt buộc phải gọi đầu tiên
C. Mốc so sánh với cách làm hiện tại
D. Một máy chủ dự phòng khi cloud lỗi

**Câu 36.** Một problem statement tốt nên giúp suy ra được gì?

A. Tên model, màu nút và kích thước logo
B. Số lượng agent, số worker và tên cloud
C. Toàn bộ mã nguồn trước khi hiểu người dùng
D. Test case, metric và ranh giới của bài toán

**Câu 37.** 'No eval path' là anti-pattern nào?

A. Có demo nhưng không biết khi nào hệ thống đủ tốt
B. Có baseline rõ nhưng không có giao diện
C. Có metric rõ nhưng không dùng model
D. Có workflow rõ nhưng luôn dùng rule

**Câu 38.** Framework Rule / Workflow / Agent khuyên bắt đầu từ đâu?

A. Mức agent tự chủ nhất ngay từ đầu
B. Mức đơn giản nhất đáp ứng được nhu cầu
C. Mức có nhiều model nhất trong hệ thống
D. Mức có nhiều tool nhất để tăng khả năng

**Câu 39.** Data flywheel trong AI product mô tả vòng cải thiện nào?

A. Tăng user sẽ tự động giảm mọi lỗi dữ liệu
B. Thêm tool sẽ tự động thay thế mọi đánh giá
C. Đổi giao diện sẽ tự động mở rộng context
D. Feedback production cải thiện data, model và architecture

**Câu 40.** Quyết định 'No-Go' hợp lý khi nào?

A. Khi team đã có một prompt rất dài
B. Khi model đang được nhiều người nhắc đến
C. Khi vấn đề, tác động hoặc đường eval còn mơ hồ
D. Khi prototype có giao diện bắt mắt

<details>
<summary>Đáp án và giải thích Set D2</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 31 | B | Day 2 nhấn mạnh không giải quyết vội giải pháp được yêu cầu; cần tìm đúng vấn đề trước. | Day 2 — Problem-first |
| 32 | C | 'Chatbot' có thể che nhiều bài toán khác nhau như FAQ, routing, QA hoặc phân tích cảm xúc. | Day 2 — Chatbot không phải bài toán |
| 33 | D | Hai hình thoi lần lượt giúp tìm đúng vấn đề và tìm đúng giải pháp. | Day 2 — Double Diamond |
| 34 | A | HCD bắt đầu từ việc quan sát đối tượng mục tiêu và workflow thực tế của họ. | Day 2 — HCD |
| 35 | C | Không có baseline thì khó biết AI cải thiện điều gì so với rule hoặc quy trình thủ công. | Day 2 — Anti-patterns |
| 36 | D | Problem statement tốt nối vấn đề kinh doanh với tiêu chí eval và boundary kỹ thuật. | Day 2 — Problem Statement |
| 37 | A | No eval path khiến nhóm không có cách đo chất lượng hoặc quyết định deploy. | Day 2 — Anti-patterns |
| 38 | B | Day 2 khuyên chỉ tăng độ phức tạp khi giá trị tăng lớn hơn chi phí và rủi ro. | Day 2 — Chọn mức giải pháp |
| 39 | D | Feedback từ production có thể quay lại làm dữ liệu và cải thiện hệ thống qua nhiều vòng. | Day 2 — AI Product Lifecycle |
| 40 | C | Go/No-Go cần dựa vào problem, metric, baseline và rủi ro chứ không chỉ dựa vào demo. | Day 2 — Go / No-Go |

</details>

---

#### <a name="set-d5"></a>Set D5: Prototype, UX và đánh giá AI


**Câu 41.** Prototype dùng để làm gì trong AI product?

A. Thay thế hoàn toàn production system
B. Kiểm tra giả thuyết với chi phí và công sức thấp
C. Chứng minh model luôn đúng trong mọi tình huống
D. Khóa cứng mọi yêu cầu trước khi gặp người dùng

**Câu 42.** Low-fidelity prototype thường giúp kiểm tra điều gì?

A. Độ ổn định của hạ tầng production
B. Công suất GPU khi có triệu user
C. Luồng và tính năng cơ bản của sản phẩm
D. Độ chính xác tuyệt đối của LLM

**Câu 43.** Wizard of Oz MVP có đặc điểm nào?

A. Model tự huấn luyện mà không cần dữ liệu
B. User tự viết toàn bộ backend trong prototype
C. Hệ thống luôn chạy offline trên thiết bị
D. Người thật đứng sau mô phỏng phần AI chưa xây

**Câu 44.** Trong PRD cho AI feature, problem statement nên tránh điều gì?

A. Mô tả vấn đề bằng chính tên giải pháp AI
B. Nêu actor và pain point của người dùng
C. Nêu metric và kết quả mong muốn
D. Nêu boundary của workflow hiện tại

**Câu 45.** Non-goals trong PRD dùng để làm gì?

A. Tăng số lượng model được gọi
B. Đặt tên cho từng prompt nội bộ
C. Nêu rõ những việc feature không cam kết xử lý
D. Mở thêm quyền cho mọi người dùng

**Câu 46.** Augmentation khác automation ở điểm nào?

A. Augmentation luôn không dùng model, automation luôn dùng model
B. Augmentation chỉ dành cho dev, automation chỉ dành cho PM
C. Augmentation luôn đắt hơn, automation luôn rẻ hơn
D. Augmentation hỗ trợ người dùng, automation tự làm nhiều hơn

**Câu 47.** Khi cost-of-error rất cao, thiết kế phù hợp thường là gì?

A. Giữ human review hoặc yêu cầu người dùng duyệt
B. Tự động hóa toàn bộ không cần thông báo
C. Ẩn mọi nguồn để giảm thời gian đọc
D. Tăng temperature để model linh hoạt hơn

**Câu 48.** Precision cao ưu tiên giảm loại lỗi nào?

A. False negative, tức bỏ sót trường hợp đúng
B. False positive, tức báo nhầm là đúng
C. Timeout, tức API phản hồi quá chậm
D. Schema drift, tức cấu trúc nguồn thay đổi

**Câu 49.** Recall cao ưu tiên giảm loại lỗi nào?

A. False positive, tức bắt nhầm trường hợp tốt
B. Token overflow, tức context vượt giới hạn
C. Cold start, tức instance khởi động chậm
D. False negative, tức bỏ lọt trường hợp cần bắt

**Câu 50.** Vibe check trong eval AI có hạn chế nào?

A. Luôn tốn nhiều GPU hơn production
B. Không thể dùng được với dữ liệu thật
C. Dễ tạo cảm giác tốt giả vì chỉ thử ít case
D. Luôn đo chính xác mọi output khác nhau

<details>
<summary>Đáp án và giải thích Set D5</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 41 | B | Prototype giúp học nhanh từ giả thuyết rẻ nhất trước khi build đầy đủ. | Day 5 — AI Prototyping |
| 42 | C | Low-fidelity phù hợp để kiểm tra workflow; high-fidelity mới gần trải nghiệm thật hơn. | Day 5 — Fidelity |
| 43 | D | Wizard of Oz kiểm tra nhu cầu bằng trải nghiệm giống AI nhưng phần xử lý có thể thủ công. | Day 5 — Wizard of Oz |
| 44 | A | Day 5 nhắc problem statement nên nói về vấn đề của user, không giả định AI là đáp án. | Day 5 — Scope & PRD |
| 45 | C | Non-goals giúp kiểm soát kỳ vọng và tránh mở rộng scope ngoài mục tiêu. | Day 5 — Goals / Non-goals |
| 46 | D | Mức agency nên chọn theo độ chắc chắn và cost-of-error của hành động. | Day 5 — Augmentation vs Automation |
| 47 | A | Với hành động khó hoàn tác, friction của phê duyệt là cơ chế kiểm soát hữu ích. | Day 5 — Cost of Error |
| 48 | B | Precision quan tâm trong các kết quả được dự đoán là dương tính, nên nhạy với false positive. | Day 5 — Precision / Recall |
| 49 | D | Recall đo mức bao phủ các trường hợp đúng, nên cần giảm bỏ sót. | Day 5 — Precision / Recall |
| 50 | C | Demo mượt vài câu không thay thế được bộ case đại diện và quy trình đánh giá lặp lại. | Day 5 — Eval Flow |

</details>

---

### Vừa

#### <a name="set-v2"></a>Set V2: Chọn bài toán và kiến trúc AI


**Câu 51.** Tác vụ lặp lại, biến thể vừa phải, cần hiểu ngôn ngữ nhưng chưa cần hành động nhiều bước nên bắt đầu ở đâu?

A. Autonomous agent với quyền gọi mọi tool
B. LLM feature hoặc workflow có kiểm soát
C. Rule cứng cho mọi câu nhập tự do
D. Multi-agent trước khi có baseline

**Câu 52.** Stakeholder nói 'hãy làm agent', nhưng chưa mô tả pain point. Bước đầu nên là gì?

A. Chọn supervisor và ba worker ngay
B. Mua GPU rồi đo sau khi deploy
C. Phỏng vấn để làm rõ actor, workflow và chi phí vấn đề
D. Viết system prompt dài để demo

**Câu 53.** Nếu chưa có baseline thủ công, nhóm khó kết luận điều gì?

A. Model có thể nhận JSON hay không
B. Tool có thể chạy trên cloud hay không
C. Prompt có thể chứa context hay không
D. AI có cải thiện so với cách làm hiện tại hay không

**Câu 54.** Một workflow có các bước cố định nhưng cần LLM ở hai bước khác nhau. Pattern nào phù hợp?

A. Prompt chaining với gate kiểm tra giữa các bước
B. Agent tự chủ không có stop condition
C. Debate giữa nhiều model không liên quan
D. Rule bot bỏ qua cả hai bước LLM

**Câu 55.** Khi intent quyết định người xử lý chuyên biệt, pattern routing hữu ích vì sao?

A. Làm mọi request chạy qua một prompt khổng lồ
B. Buộc mọi worker xử lý cùng một nhiệm vụ
C. Đưa input đến prompt hoặc worker phù hợp
D. Xóa nhu cầu định nghĩa boundary

**Câu 56.** Evaluator-optimizer nên dùng khi nào?

A. Khi chỉ cần một phép tính xác định
B. Khi không có tiêu chí chất lượng
C. Khi mọi output phải được bỏ qua
D. Khi output cần được chấm rồi cải thiện lặp lại

**Câu 57.** Một demo đẹp nhưng không có bộ test đại diện là dấu hiệu nào?

A. Đã sẵn sàng production vì giao diện đẹp
B. Chưa có đường eval để quyết định đủ tốt
C. Đã có baseline vì user thấy thích
D. Đã an toàn vì model trả lời trôi chảy

**Câu 58.** North Star metric nên được chọn theo tiêu chí nào?

A. Metric dễ lấy nhất dù không liên quan outcome
B. Metric có nhiều chữ số nhất trong dashboard
C. Metric tăng khi prompt dài hơn
D. Tăng metric đó giúp flywheel kinh doanh tiến lên

**Câu 59.** Nếu một bài toán có dynamic decision và nhiều tool phụ thuộc nhau, điều gì được ưu tiên cân nhắc?

A. Một rule đơn giản không nhận input tự do
B. Một prompt tĩnh chỉ trả lời một lượt
C. Agent hoặc workflow có control flow rõ
D. Một vector store không có tool execution

**Câu 60.** Go decision hợp lý hơn khi nào?

A. Problem, metric, boundary và eval đã đủ rõ
B. Stakeholder chỉ nêu tên một công nghệ
C. Nhóm chưa biết ai là actor chính
D. Prototype mới có một ảnh chụp màn hình

<details>
<summary>Đáp án và giải thích Set V2</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 51 | B | AI phù hợp với tác vụ có biến thể vừa phải; chưa cần tăng lên agent nếu workflow có thể kiểm soát. | Day 2 — Khi nào AI đáng làm |
| 52 | C | Discovery interview cần làm rõ vấn đề, tần suất, workflow và cost trước khi chọn kiến trúc. | Day 2 — Discovery Interview |
| 53 | D | Baseline là điểm tham chiếu để đo giá trị tăng thêm của AI. | Day 2 — No baseline |
| 54 | A | Prompt chaining tách task tuần tự và có thể kiểm tra output trước khi đi tiếp. | Day 2 — Workflows |
| 55 | C | Routing giảm prompt phức tạp bằng cách phân luồng theo loại yêu cầu. | Day 2 — Routing |
| 56 | D | Pattern này có một bước tạo và một bước đánh giá/cải thiện theo tiêu chí đã định. | Day 2 — Workflow Patterns |
| 57 | B | No eval path là anti-pattern vì nhóm không biết hệ thống đạt mức nào và có hồi quy hay không. | Day 2 — Eval Path |
| 58 | D | North Star gắn với outcome quan trọng nhất chứ không chỉ là metric kỹ thuật tiện đo. | Day 2 — North Star Metric |
| 59 | C | Nhiều bước, quyết định động và tool use là các tín hiệu của Agentic Fit cao. | Day 2 — Agentic Fit |
| 60 | A | Gate criteria yêu cầu bài toán có thể đo, có ranh giới và có đường triển khai khả thi. | Day 2 — Gate Criteria |

</details>

---

#### <a name="set-v5"></a>Set V5: AI product UX và eval cơ bản


**Câu 61.** Trợ lý soạn email đề xuất nội dung nhưng không tự gửi là dạng nào?

A. Automation vì agent tự thực hiện side effect
B. Augmentation với quyền quyết định còn ở người dùng
C. Rule-based vì không có LLM
D. Autonomous execution vì có một nút bấm

**Câu 62.** Bộ lọc video trẻ em đánh dấu video là xấu khi thực tế lành mạnh. Đây là lỗi gì?

A. False negative, nên chỉ tăng recall
B. Timeout, nên chỉ tăng retry
C. False positive, nên cần xem xét precision
D. Drift, nên chỉ đổi database

**Câu 63.** Trust calibration tốt cần kết hợp những yếu tố nào?

A. Temperature, top_p và token count
B. Container, gateway và database
C. Worker, router và queue
D. Expectation, explainability và control

**Câu 64.** Vì sao confidence tag High/Medium/Low có thể tốt hơn số 0,84?

A. Nó gắn tín hiệu với hành vi và kỳ vọng dễ hiểu
B. Nó làm score luôn chính xác hơn
C. Nó bỏ qua hoàn toàn chất lượng retrieval
D. Nó đảm bảo model không bao giờ sai

**Câu 65.** Khi AI thiếu thông tin để hiểu câu hỏi mơ hồ, fallback tốt là gì?

A. Đoán câu trả lời để giữ hội thoại ngắn
B. Hỏi lại hoặc chuyển sang con đường an toàn
C. Tự thực hiện hành động không cần duyệt
D. Ẩn lỗi và trả về câu chung chung

**Câu 66.** Cùng một input cho ra hai output khác nhau là loại failure nào?

A. Schema drift do nguồn dữ liệu đổi
B. Cold start do instance mới
C. Output variance do tính xác suất của hệ thống
D. False negative do classifier

**Câu 67.** Vì sao eval AI nên lặp lại trước và sau thay đổi?

A. Để bảo đảm input luôn chỉ có một token
B. Để thay người dùng duyệt mọi hành động
C. Để làm model tự học trực tiếp trong production
D. Để phát hiện hồi quy và đo mức cải thiện trên bộ case

**Câu 68.** Guideline 'make clear what the system can do' chủ yếu xử lý vấn đề nào?

A. Kỳ vọng sai của người dùng về phạm vi AI
B. Lỗi thiếu index của vector store
C. Lỗi timeout của API gateway
D. Lỗi sai phiên bản Docker image

**Câu 69.** Trong Wizard of Oz, giả định rủi ro nhất nên được kiểm tra thế nào?

A. Chọn model đắt nhất để đảm bảo chất lượng
B. Tạo toàn bộ kiến trúc multi-agent trước
C. Mô phỏng trải nghiệm đủ thật trước khi build backend
D. Chờ đến khi có dữ liệu triệu người dùng

**Câu 70.** Nếu PRD nói rõ goal nhưng không nói non-goal, rủi ro dễ gặp là gì?

A. Model không thể nhận user prompt
B. Tool không thể khai báo enum
C. Dashboard không thể vẽ time series
D. Scope phình to và kỳ vọng vượt quá cam kết

<details>
<summary>Đáp án và giải thích Set V5</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 61 | B | Người dùng vẫn duyệt và chỉnh kết quả; mức agency thấp hơn automation hoàn toàn. | Day 5 — Augmentation |
| 62 | C | Hệ thống báo nhầm dương tính là false positive; nếu cost của nó cao thì ưu precision. | Day 5 — Precision / Recall |
| 63 | D | Người dùng tin đúng mức khi biết khả năng, lý do và quyền can thiệp của hệ thống. | Day 5 — Trust Calibration |
| 64 | A | Người dùng cần biết nên tin và kiểm tra thế nào hơn là một số phần trăm thiếu ngữ cảnh. | Day 5 — Confidence UX |
| 65 | B | Graceful fallback giữ tính trung thực và giúp user bổ sung thông tin cần thiết. | Day 5 — Graceful Failure |
| 66 | C | Nondeterminism là mặc định của hệ thống sinh; acceptance criteria cần phản ánh mức biến thiên. | Day 5 — Nondeterminism |
| 67 | D | Eval là chu trình, không phải một lần chấm demo. | Day 5 — Eval Flow |
| 68 | A | UI cần cho user biết khả năng và giới hạn trước khi họ giao việc cho AI. | Day 5 — Human-AI Interaction |
| 69 | C | MVP kiểu Wizard of Oz kiểm tra nhu cầu và hành vi trước khi đầu tư kỹ thuật lớn. | Day 5 — Wizard of Oz |
| 70 | D | Non-goal là hàng rào sản phẩm giúp team biết điều gì chưa nằm trong phiên bản này. | Day 5 — PRD |

</details>

---

### Khó

#### <a name="set-k2"></a>Set K2: Problem framing, metric và quyết định kiến trúc


**Câu 71.** Stakeholder yêu cầu 'tóm tắt mọi email bằng agent'. Phát biểu nào là problem statement tốt hơn?

A. Công ty cần một agent dùng model mới nhất
B. PM mất 3 giờ mỗi tuần gom feedback email thành báo cáo có cấu trúc
C. Team muốn có chatbot đẹp để trình diễn
D. Sản phẩm phải dùng ít nhất ba tool AI

**Câu 72.** Một nhóm chọn số lượng câu trả lời sinh ra làm North Star cho trợ lý. Vì sao metric này yếu?

A. Nó luôn cần dữ liệu realtime từ database
B. Nó không thể tính bằng token của model
C. Nó đo hoạt động hệ thống thay vì giá trị hay outcome người dùng
D. Nó chỉ phù hợp với rule-based bot

**Câu 73.** Tác vụ nhập mã lỗi cố định, luồng xử lý cố định và sai sót rất đắt nên chọn mức nào?

A. Autonomous agent để tự diễn giải mọi mã
B. Multi-agent debate để tăng độ sáng tạo
C. LLM temperature cao để chọn nhánh
D. Rule hoặc workflow deterministic trước khi dùng agent

**Câu 74.** Một workflow gồm parse email → phân loại intent → tạo bản nháp. Vì sao prompt chaining là điểm bắt đầu tốt?

A. Mỗi bước có output rõ và có thể kiểm tra trước bước sau
B. Các bước đều cần quyết định động không thể mô tả
C. Mọi bước phải chạy đồng thời dù phụ thuộc
D. Không cần eval vì workflow đã có tên

**Câu 75.** Orchestrator-workers phù hợp hơn routing đơn giản khi nào?

A. Mỗi input chỉ có một intent cố định
B. Một task cần chia subtask động cho nhiều worker
C. Chỉ có một tool và một bước xử lý
D. Không có tiêu chí để supervisor chọn worker

**Câu 76.** Một dự án có metric rõ nhưng không biết data có quyền truy cập hay đủ freshness. Gate nào đang thiếu?

A. Chỉ thiếu màu sắc của UI
B. Chỉ thiếu tên model trong prompt
C. Feasibility và data readiness trước khi build
D. Chỉ thiếu số lượng worker trong graph

**Câu 77.** Nếu metric offline tăng nhưng user không tiết kiệm thời gian hơn, nên nghi ngờ điều gì?

A. Temperature luôn quá thấp ở production
B. Vector store chắc chắn đã mất toàn bộ index
C. Model cần thêm một lớp Transformer
D. Metric được chọn chưa phản ánh outcome hoặc workflow thật

**Câu 78.** Quan sát user bỏ qua gợi ý AI vì không biết nên bắt đầu prompt thế nào gợi ý thiết kế nào?

A. Cung cấp ví dụ, hướng dẫn hoặc mẫu prompt trong UI
B. Ẩn toàn bộ khả năng để user tự khám phá
C. Tăng quyền agent để tự hành động
D. Thêm nhiều slider sampling vào màn hình

**Câu 79.** Nếu baseline thủ công mất 30 phút và AI mất 20 phút nhưng tỷ lệ sửa lỗi tăng mạnh, quyết định nào cần làm?

A. Deploy ngay vì latency đã giảm
B. Đánh giá lại metric tổng và cost-of-error trước khi Go
C. Tăng tự động hóa để user ít can thiệp
D. Bỏ baseline vì AI đã có giao diện

**Câu 80.** Vì sao scope solution phải mô tả cả bước không có AI?

A. AI chỉ hoạt động khi mọi bước đều là model
B. Bước không có AI luôn là phần rủi ro thấp
C. PRD không cần mô tả boundary ngoài model
D. Outcome người dùng phụ thuộc toàn bộ flow end-to-end

<details>
<summary>Đáp án và giải thích Set K2</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 71 | B | Problem statement cần actor, pain, tần suất và outcome; không lấy tên giải pháp làm vấn đề. | Day 2 — Problem Statement |
| 72 | C | North Star nên nối với outcome như thời gian tiết kiệm, resolution hoặc conversion, không chỉ volume output. | Day 2 — North Star Metric |
| 73 | D | Input ổn định, flow cố định và cost-of-error cao là tín hiệu không nên tăng độ tự chủ. | Day 2 — Rule / Workflow / Agent |
| 74 | A | Chaining phù hợp khi chuỗi bước tương đối ổn định và cần gate giữa các bước. | Day 2 — Prompt Chaining |
| 75 | B | Orchestrator-workers cho phép phân việc động; routing chỉ cần chọn nhánh đã biết. | Day 2 — Orchestrator-Workers |
| 76 | C | Discovery/feasibility phải kiểm tra nguồn, quyền, chất lượng và độ mới trước khi viết nhiều code. | Day 2 — Discovery & Feasibility |
| 77 | D | Eval kỹ thuật không tự chứng minh giá trị sản phẩm; cần nối với outcome của actor. | Day 2 — Impact Metrics |
| 78 | A | Why Johnny Can't Prompt nhấn mạnh user cần biết khả năng và cách tiếp cận task. | Day 5 — Why Johnny Can't Prompt |
| 79 | B | Tác động phải tính cả thời gian sửa, độ chính xác và rủi ro chứ không chỉ thời gian sinh output. | Day 2 / Day 5 — Impact & Cost-of-error |
| 80 | D | Day 5 nhắc không chỉ định nghĩa đoạn AI; cần biết user đi từ input đến kết quả thế nào. | Day 5 — Scope the Solution |

</details>

---

#### <a name="set-k5"></a>Set K5: Thiết kế AI product dưới bất định


**Câu 81.** AI có accuracy khá cao nhưng đôi khi gửi email sai người. Quyết định agency nào hợp lý?

A. Tự gửi ngay vì accuracy trung bình cao
B. Cho AI soạn, yêu cầu user duyệt recipient và nội dung
C. Tăng temperature để model tự tin hơn
D. Ẩn recipient để giảm friction

**Câu 82.** Trong hệ thống phát hiện nội dung nguy hiểm cho trẻ em, bỏ lọt là lỗi nghiêm trọng hơn báo nhầm. Nên ưu tiên gì?

A. Precision cao để giảm mọi false positive
B. Latency thấp dù không đo chất lượng
C. Recall cao để giảm false negative
D. Cost thấp dù bỏ lọt nhiều

**Câu 83.** Acceptance criteria cho output sinh nên viết thế nào để đối phó nondeterminism?

A. Bắt mọi run phải giống từng ký tự
B. Chỉ kiểm tra model có trả response
C. Bỏ hẳn expected behavior vì output mở
D. Dùng tiêu chí về tỷ lệ, chất lượng và boundary thay vì exact string

**Câu 84.** Một UI hiển thị 'AI knows everything' nhưng feature chỉ có dữ liệu đến 2024. Lỗi thiết kế là gì?

A. Expectation không được calibration với capability và freshness
B. Low-fidelity prototype có quá ít màu
C. Precision luôn cao hơn recall
D. Docker image chưa dùng multi-stage

**Câu 85.** Khi confidence thấp nhưng hành động có thể hoàn tác, UX nào hợp lý?

A. Tự động hóa không thông báo để giảm thời gian
B. Cho preview, chỉnh sửa và undo trước hoặc sau hành động
C. Cấm mọi tính năng vì confidence thấp
D. Ẩn nguồn để user không hoài nghi

**Câu 86.** Vì sao eval AI không thể chỉ dùng pass/fail như unit test thuần?

A. AI không thể có test set nào đáng tin để chấm
B. Unit test luôn cần model lớn hơn để chấm
C. Một input có nhiều output hợp lệ cần chấm theo mức độ
D. Pass/fail không đủ để chấm mọi output văn bản

**Câu 87.** Một feature có ba fallback: sửa output, yêu cầu user duyệt, chuyển người thật. Vì sao phải ghi vào PRD?

A. Fallback chỉ là chi tiết code không ảnh hưởng user
B. PRD không nên mô tả failure để tránh lo lắng
C. Ba fallback luôn giống nhau về risk
D. Mỗi fallback thay đổi trải nghiệm, metric và chi phí vận hành

**Câu 88.** Đội ngũ cần kiểm tra workflow nhưng chưa chắc có nhu cầu AI. Prototype nào phù hợp?

A. Prototype rẻ hoặc Wizard of Oz để kiểm tra giả thuyết
B. MVP production với full infra ngay lập tức
C. Fine-tune model trước khi phỏng vấn
D. Multi-agent với mọi integration

**Câu 89.** AI feature đọc nội dung cuộc họp có thể chứa PII. PRD cần mô tả thêm gì ngoài user flow?

A. Chỉ số lượng token tối đa của model
B. Dữ liệu context, disclosure, quyền truy cập và retention
C. Chỉ tên màu của confidence badge
D. Chỉ provider có latency thấp nhất

**Câu 90.** Một sản phẩm AI đo được thumbs-up thấp nhưng LLM judge cao. Nên làm gì?

A. Bỏ human feedback vì judge khách quan hơn
B. Tăng model size mà không xem case
C. Điều tra lệch giữa metric tự động và trải nghiệm user
D. Xóa các trace có rating thấp

<details>
<summary>Đáp án và giải thích Set K5</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 81 | B | Sai recipient là side effect khó hoàn tác; augmentation và approval giảm cost-of-error. | Day 5 — Agency / Cost-of-error |
| 82 | C | Khi FN gây hại lớn, cần tối đa hóa coverage và có thể dùng human review cho phần nghi ngờ. | Day 5 — Precision / Recall |
| 83 | D | AI có nhiều câu trả lời hợp lệ; acceptance cần đo mức đạt, factuality, format và failure handling. | Day 5 — Nondeterminism |
| 84 | A | Trust giảm khi UI hứa vượt khả năng; cần nói rõ phạm vi, thời điểm dữ liệu và cách AI có thể sai. | Day 5 — Trust Calibration |
| 85 | B | Control, preview và rollback cho phép dùng AI trong vùng rủi ro vừa phải. | Day 5 — Recovery UX |
| 86 | C | Output sinh cần chấm theo mức độ, relevance, faithfulness hoặc rubric thay vì một chuỗi duy nhất. | Day 5 — Eval vs Software Test |
| 87 | D | Fallback là quyết định sản phẩm, không chỉ là exception kỹ thuật. | Day 5 — Fallback 3 Tầng |
| 88 | A | Build rẻ trước để giảm rủi ro học sai bài toán. | Day 5 — Prototyping / MVP |
| 89 | B | AI-specific requirements phải nêu input/context và privacy controls, không chỉ mô tả nút bấm. | Day 5 — Privacy / AI Requirements |
| 90 | C | Các tầng quality khác nhau có thể không đồng thuận; cần xem case và outcome thay vì tin một số. | Day 5 / Day 13 — Quality Metrics |

</details>

---

<a name="3-prompt-engineering--system-prompt"></a>
## 3. Prompt Engineering & System Prompt

Thiết kế prompt, few-shot, context structure, output contract và system prompt production-grade.

### Dễ

#### <a name="set-d4"></a>Set D4: Prompt fundamentals và tool schema


**Câu 91.** Bốn thành phần cơ bản của prompt tốt là gì?

A. Model, Token, Cost và Latency
B. Role, Task, Context và Format
C. Input, Vector, Memory và Cloud
D. Rule, Worker, Graph và Trace

**Câu 92.** Zero-shot prompting nghĩa là gì?

A. Yêu cầu model trả về đúng một token
B. Yêu cầu model gọi tool không có schema
C. Yêu cầu model làm task mà không đưa ví dụ mẫu
D. Yêu cầu model bỏ qua toàn bộ context

**Câu 93.** Few-shot prompting hữu ích nhất khi nào?

A. Khi muốn loại bỏ hoàn toàn system prompt
B. Khi muốn thay model bằng cơ sở dữ liệu
C. Khi muốn giảm mọi input xuống bằng không
D. Khi cần giữ format hoặc tăng tính ổn định

**Câu 94.** Chain-of-Thought thường phù hợp với task nào?

A. Bài toán cần suy luận qua nhiều bước
B. Bài toán chỉ cần đổi màu giao diện
C. Bài toán chỉ cần kiểm tra một ký tự
D. Bài toán chỉ cần trả về mã trạng thái

**Câu 95.** System prompt có vai trò chính nào?

A. Lưu mọi bản ghi trong vector database
B. Thay người dùng gửi câu hỏi hằng ngày
C. Đặt vai trò, luật lệ và năng lực cho model
D. Tự động cấp quyền admin cho mọi tool

**Câu 96.** Delimiter hoặc thẻ XML giúp giải quyết vấn đề nào?

A. Tăng số chiều của embedding
B. Giảm số lượng worker trong graph
C. Thay thế việc kiểm tra output
D. Tách instruction khỏi dữ liệu được đưa vào

**Câu 97.** Context bleed là hiện tượng gì?

A. Model nhầm dữ liệu đầu vào với chỉ dẫn cần tuân theo
B. Model đọc thiếu một token cuối cùng
C. Model không thể kết nối tới database
D. Model tự động chia task thành workers

**Câu 98.** Tool description tốt nên hướng tới đối tượng nào?

A. Viết cho người thiết kế logo của sản phẩm
B. Viết cho model biết tool làm gì và khi nào dùng
C. Viết cho database biết cách tạo index
D. Viết cho người dùng cuối thay system prompt

**Câu 99.** Mảng required trong JSON schema dùng để làm gì?

A. Bắt buộc tool chạy song song với mọi tool
B. Bắt buộc model sinh câu trả lời dài hơn
C. Bắt buộc người dùng nhập thêm mật khẩu
D. Bắt buộc model cung cấp các tham số quan trọng

**Câu 100.** Khi Tool B cần kết quả Tool A, nên dùng chiến lược nào?

A. Gọi B trước rồi bỏ qua kết quả A
B. Gọi A và B ngẫu nhiên không chờ nhau
C. Gọi tuần tự A, nhận kết quả rồi gọi B
D. Chỉ gọi A rồi tự đoán kết quả của B

<details>
<summary>Đáp án và giải thích Set D4</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 91 | B | Day 4 dùng khung Role / Task / Context / Format để biến ý định thành chỉ dẫn rõ. | Day 4 — Prompt fundamentals |
| 92 | C | Zero-shot không cung cấp example; few-shot mới dùng các ví dụ minh họa. | Day 4 — Zero-shot |
| 93 | D | Ví dụ mẫu giúp model bắt chước cách trả lời và định dạng mong muốn. | Day 4 — Few-shot |
| 94 | A | CoT được giới thiệu cho các bài toán có reasoning nhiều bước; không phải task nào cũng cần. | Day 4 — CoT |
| 95 | C | System message là hợp đồng nền tảng định hướng hành vi của agent. | Day 4 — System Prompt |
| 96 | D | Cấu trúc hóa context làm giảm context bleed, tức nhầm dữ liệu thành mệnh lệnh. | Day 4 — XML / Delimiters |
| 97 | A | Dữ liệu user, API hoặc tài liệu có thể chứa câu lệnh; delimiters giúp phân biệt chúng. | Day 4 — Context Bleed |
| 98 | B | Mô tả tool là một phần prompt để model chọn đúng hàm và tham số. | Day 4 — Tool Description |
| 99 | D | Required giúp ngăn việc bỏ trống field cần thiết như city hoặc date. | Day 4 — Required Fields |
| 100 | C | Phụ thuộc dữ liệu yêu cầu chained calls để truyền kết quả chính xác sang bước sau. | Day 4 — Sequential Calls |

</details>

---

### Vừa

#### <a name="set-v4"></a>Set V4: Prompt production-grade và tool calling


**Câu 101.** Một tài liệu retrieved chứa câu 'bỏ qua system prompt'. Cách phòng thủ prompt phù hợp là gì?

A. Đưa tài liệu vào system prompt như mệnh lệnh
B. Đặt tài liệu trong delimiter và coi nó là data không tin cậy
C. Cho phép tài liệu sửa tool registry
D. Xóa mọi context để tránh đọc nhầm

**Câu 102.** Few-shot nên ưu tiên ví dụ edge case thay vì chỉ happy path vì sao?

A. Happy path luôn làm context ngắn hơn
B. Edge case không cần format output
C. Edge case dạy model cách xử lý tình huống dễ sai
D. Few-shot chỉ có tác dụng với dữ liệu sạch

**Câu 103.** Muốn model trả JSON ổn định, thành phần nào nên thêm?

A. Một đoạn văn dài không có cấu trúc
B. Một prompt phủ định không nêu output
C. Một tool không có tên và mô tả
D. Schema cụ thể cùng field, type và required

**Câu 104.** Order bias trong few-shot gợi ý cách sắp ví dụ nào?

A. Trộn các nhãn và kiểm tra ảnh hưởng của thứ tự
B. Đặt cùng một nhãn ở ví dụ cuối
C. Chỉ dùng một loại input cuối prompt
D. Xóa ví dụ khó để model không nhầm

**Câu 105.** Để giảm 'Lost in the Middle', nên làm gì với context rất dài?

A. Nhồi thêm toàn bộ tài liệu chưa lọc
B. Cắt tỉa và sắp xếp evidence quan trọng ở vị trí dễ thấy
C. Đặt câu hỏi ở giữa sau hàng trăm trang
D. Tăng temperature để model nhớ tốt hơn

**Câu 106.** Dynamic system prompt hữu ích trong tình huống nào?

A. Khi muốn hệ thống bỏ mọi policy tĩnh
B. Khi muốn biến prompt thành vector
C. Khi luật cần phản ánh ngày, trạng thái hoặc availability hiện tại
D. Khi muốn bỏ qua việc version prompt

**Câu 107.** Vì sao chỉ viết 'đừng bịa' thường chưa đủ?

A. Model không thể đọc chữ phủ định
B. Prompt phủ định luôn tốn ít token hơn
C. Negative instruction làm tool tự tắt
D. Negative instruction thiếu hành vi thay thế và dễ bị bỏ qua

**Câu 108.** Enum trong tool schema phù hợp khi tham số có đặc điểm nào?

A. Chỉ có một tập giá trị hợp lệ hữu hạn
B. Có thể là bất kỳ văn bản dài nào
C. Luôn là kết quả của một tool khác
D. Cần được model tự bịa mỗi lần

**Câu 109.** Vì sao tool không nên có quá nhiều tham số?

A. JSON luôn cấm hơn năm tham số
B. Model dễ nhầm field và giảm độ chính xác khi gọi
C. Nhiều tham số làm vector không có nghĩa
D. Tool nhiều tham số không thể retry

**Câu 110.** Khi tool trả lỗi JSON cho model, self-correction tốt hơn dừng ngay vì sao?

A. Model sẽ tự sửa database nguồn
B. Lỗi được biến thành kết quả đúng
C. Retry không cần giới hạn số lần
D. Model có thể đọc lỗi và sửa arguments theo schema

<details>
<summary>Đáp án và giải thích Set V4</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 101 | B | Delimiter và instruction hierarchy giúp model phân biệt dữ liệu được trích xuất với luật điều khiển. | Day 4 — Context Bleed |
| 102 | C | Ví dụ thiếu dữ liệu, mơ hồ hoặc jailbreak giúp kiểm thử boundary của prompt. | Day 4 — Few-shot Edge Cases |
| 103 | D | Output contract rõ làm giảm format hallucination và giúp parser xử lý nhất quán hơn. | Day 4 — JSON Schema |
| 104 | A | Model có thể bị ảnh hưởng bởi ví dụ gần cuối; cần tránh thứ tự gây lệch nhãn. | Day 4 — Order Bias |
| 105 | B | Model thường chú ý tốt hơn ở đầu/cuối; compression và reordering giúp tận dụng context. | Day 4 — Lost in the Middle |
| 106 | C | Template có placeholder cho date, state hoặc service status giúp prompt thích ứng nhưng vẫn có cấu trúc. | Day 4 — Dynamic Prompt |
| 107 | D | Nên nêu điều kiện thiếu dữ liệu, câu trả lời fallback và escalation thay vì chỉ cấm đoán. | Day 4 — Negative Prompting |
| 108 | A | Enum thu hẹp không gian lựa chọn và giảm tham số sai. | Day 4 — Enums |
| 109 | B | Slide khuyên giữ khoảng 5–7 tham số hoặc ít hơn nếu có thể để contract dễ hiểu. | Day 4 — Tool Complexity |
| 110 | D | Báo lỗi có cấu trúc cho LLM tạo cơ hội sửa, nhưng vẫn cần retry limit và validation. | Day 4 — Tool Failures |

</details>

---

### Khó

#### <a name="set-k4"></a>Set K4: Prompt contract, tool schema và LangGraph


**Câu 111.** System prompt vừa yêu cầu 'giải thích chi tiết từng bước' vừa 'trả lời dưới 50 chữ'. Vấn đề chính là gì?

A. Model không thể nhận role và task cùng lúc
B. Contradictory instructions làm output contract không xác định
C. Context bleed luôn do user prompt
D. Tool schema không thể có field required

**Câu 112.** RAG prompt đặt raw document trước system rules mà không có delimiter. Rủi ro nào tăng?

A. Vector store tự chuyển thành BM25
B. Model tự tạo thêm context window
C. Document có thể làm instruction và dữ liệu bị lẫn
D. Temperature tự về zero trong generation

**Câu 113.** Một prompt có 50 trang context nhưng câu hỏi chỉ ở đầu. Tối ưu nào hợp lý hơn?

A. Thêm 50 trang khác ở giữa để tăng recall
B. Tăng output budget để model nhớ tốt hơn
C. Đưa mọi chunk vào một đoạn không nhãn
D. Đặt lệnh/query rõ và sắp evidence quan trọng bằng reordering

**Câu 114.** Few-shot có nhãn A ở cuối liên tiếp nhiều lần khiến model lệch nhãn. Cách xử lý nào tốt?

A. Cân bằng thứ tự ví dụ và kiểm thử permutation
B. Thêm một nhãn A nữa để model chắc hơn
C. Xóa format output khỏi mọi ví dụ
D. Chỉ dùng happy path để tránh bias

**Câu 115.** Tool search_flights nhận city tự do dù chỉ hỗ trợ mã IATA. Cải tiến schema nào hiệu quả?

A. Tăng mô tả chung nhưng bỏ required
B. Nêu rõ format mã và dùng enum/validation khi miền giá trị hữu hạn
C. Cho model tự đoán mã và không kiểm tra
D. Thêm temperature để chọn mã đa dạng

**Câu 116.** Tool có 12 tham số tùy chọn, model thường bỏ nhầm field. Thiết kế nào đáng thử trước?

A. Gộp thêm 10 tham số để đủ ngữ cảnh
B. Bỏ tên tool để model tự lập luận
C. Tách tool theo capability và giảm số tham số mỗi tool
D. Cho phép mọi field nhận bất kỳ kiểu dữ liệu

**Câu 117.** Dynamic prompt chèn trạng thái payment API đang degraded. Rule nào nên đi kèm?

A. Tự gọi API nhiều lần cho đến khi có kết quả
B. Ẩn trạng thái để UX không bị gián đoạn
C. Cho agent chuyển sang tool không được cấp
D. Không hứa hành động unavailable và dùng fallback/escalation

**Câu 118.** Trong LangGraph, vì sao state thường append messages thay vì ghi đè?

A. Giữ lịch sử để node sau có đủ context và trace
B. Để state không bao giờ được cập nhật
C. Để mọi node tự có một context riêng
D. Để loại bỏ nhu cầu conditional edge

**Câu 119.** Graph cần quay lại Agent sau Tool nếu còn tool_calls, và đi END nếu không. Thành phần nào quyết định?

A. Normal edge cố định không đọc state
B. Conditional router đọc message cuối và chọn edge
C. Embedding model chọn edge theo cosine
D. Health check của container chọn edge

**Câu 120.** Nếu tool node nhận JSON arguments sai kiểu, nên đặt validation ở đâu?

A. Chỉ sau khi side effect đã xảy ra
B. Chỉ trong dashboard sau khi deploy
C. Không cần vì schema là đủ tuyệt đối
D. Trước execution và có thể trả lỗi có cấu trúc cho model

<details>
<summary>Đáp án và giải thích Set K4</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 111 | B | Prompt production-grade cần tránh mâu thuẫn hoặc nêu ưu tiên rõ khi hai yêu cầu xung đột. | Day 4 — System Prompt Anti-patterns |
| 112 | C | Context injection cần phân tách nguồn và luật để giảm context bleed và indirect injection. | Day 4 / Day 8 — Context Injection |
| 113 | D | Recency và lost-in-the-middle khiến vị trí và compression quan trọng không kém tổng dung lượng. | Day 4 / Day 8 — Long Context |
| 114 | A | Order bias yêu cầu kiểm tra ảnh hưởng vị trí, không dồn một loại nhãn ở cuối chuỗi. | Day 4 — Order Bias |
| 115 | B | Schema cần ràng buộc input; nếu chỉ có một tập mã hợp lệ thì enum giúp giảm lỗi. | Day 4 — Tool Schema |
| 116 | C | Contract nhỏ, rõ giúp model chọn và điền arguments chính xác hơn. | Day 4 — Tool Complexity |
| 117 | D | Dynamic system prompt nên phản ánh availability và điều hướng agent tránh capability đang lỗi. | Day 4 — Dynamic System Prompt |
| 118 | A | Append-only giúp graph giữ diễn tiến; node vẫn có thể cập nhật field khác theo schema. | Day 4 — LangGraph State |
| 119 | B | Router/should_continue là hàm đọc state để quyết định vòng tiếp hoặc final answer. | Day 4 — LangGraph Routing |
| 120 | D | Schema giúp model, nhưng runtime validation bảo vệ hệ thống trước input sai hoặc malicious. | Day 4 — Tool Execution |

</details>

---

<a name="4-agent-react--tool-calling"></a>
## 4. Agent, ReAct & Tool Calling

Phân biệt chatbot/agent, vòng lặp ReAct, orchestration tool, error handling và agent evaluation.

### Dễ

#### <a name="set-d3"></a>Set D3: Bot, chatbot và agent


**Câu 121.** Rule-based bot thường xử lý đầu vào bằng cách nào?

A. Dùng vector similarity cho mọi câu hỏi
B. Dùng các luật if/else được định trước
C. Tự lập kế hoạch qua nhiều công cụ
D. Học lại từ phản hồi sau mỗi lượt

**Câu 122.** LLM chatbot khác agent chủ yếu ở điểm nào?

A. Chatbot luôn chạy local, agent luôn chạy cloud
B. Chatbot không có prompt, agent có prompt
C. Chatbot thường trả lời, agent có loop và hành động
D. Chatbot chỉ dùng ảnh, agent chỉ dùng văn bản

**Câu 123.** Agent thường cần thêm thành phần nào ngoài LLM core?

A. Chỉ thêm một màn hình đăng nhập
B. Chỉ thêm một bảng màu giao diện
C. Chỉ thêm nhiều bản sao cùng một prompt
D. Mục tiêu, reasoning, tools và trạng thái

**Câu 124.** ReAct là viết tắt của cụm nào?

A. Reasoning và Acting
B. Reading và Tracking
C. Retrieval và Coding
D. Rendering và Testing

**Câu 125.** Thứ tự cơ bản của vòng lặp ReAct là gì?

A. Action → Thought → Observation
B. Observation → Action → Thought
C. Thought → Action → Observation
D. Thought → Observation → Action

**Câu 126.** Tool calling cung cấp cho agent khả năng nào?

A. Thay thế hoàn toàn bộ nhớ của mô hình
B. Đảm bảo mọi câu trả lời luôn đúng
C. Xóa nhu cầu viết system prompt
D. Tương tác với API, cơ sở dữ liệu hoặc công cụ

**Câu 127.** Short-term memory thường nằm ở đâu?

A. Trong context window của task hiện tại
B. Trong một bảng dữ liệu không bao giờ truy xuất
C. Trong weights của model sau mỗi câu hỏi
D. Trong mã nguồn frontend của ứng dụng

**Câu 128.** Vì sao agent cần giới hạn số vòng lặp?

A. Để làm context luôn rỗng sau mỗi bước
B. Để tránh vòng lặp vô hạn và chi phí tăng
C. Để buộc tool trả về cùng một kết quả
D. Để biến agent thành rule-based bot

**Câu 129.** Hybrid pattern trong chatbot và agent thường làm gì?

A. Dùng agent cho mọi câu hỏi không ngoại lệ
B. Dùng rule cho mọi nhiệm vụ nhiều bước
C. Dùng hai model cùng sinh một câu trả lời
D. Dùng chatbot cho câu đơn giản, agent cho câu phức tạp

**Câu 130.** Agentic Fit dùng để trả lời câu hỏi nào?

A. Model nào có tên thương mại hay nhất
B. Prompt nào có nhiều token nhất
C. Bài toán có thật sự cần agent hay không
D. Vector store nào có giao diện đẹp nhất

<details>
<summary>Đáp án và giải thích Set D3</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 121 | B | Rule-based bot hoạt động theo luồng và điều kiện do con người viết sẵn. | Day 3 — Spectrum Bot → Agent |
| 122 | C | Agent kết hợp reasoning, tools, state và vòng lặp; một LLM call đơn lẻ chưa đủ là agent. | Day 3 — So sánh hệ thống |
| 123 | D | Slide kiến trúc agent nêu goal, reasoning, tools và memory/state là các khối bổ sung. | Day 3 — Thành phần agent |
| 124 | A | ReAct kết hợp suy luận theo bước với hành động gọi công cụ. | Day 3 — ReAct |
| 125 | C | Agent phân tích trước, gọi tool sau, rồi đọc kết quả để quyết định bước tiếp. | Day 3 — ReAct Loop |
| 126 | D | Tool là 'tay chân' giúp agent lấy dữ liệu hoặc thực hiện hành động bên ngoài LLM. | Day 3 — Tool Calling |
| 127 | A | Short-term memory giữ lịch sử gần đây và thông tin cần cho phiên hiện tại. | Day 3 — Memory |
| 128 | B | Max iterations là safeguard cơ bản cùng với timeout và xử lý lỗi. | Day 3 — Max Iterations |
| 129 | D | Hybrid giúp giữ chi phí thấp ở đường đơn giản và chỉ kích hoạt agent khi cần. | Day 3 — Hybrid Pattern |
| 130 | C | Agentic Fit xem xét multi-step reasoning, tool use và quyết định động trước khi nâng cấp kiến trúc. | Day 3 — Agentic Fit |

</details>

---

### Vừa

#### <a name="set-v3"></a>Set V3: ReAct, tool orchestration và kiểm lỗi agent


**Câu 131.** Trong ví dụ tìm chuyến bay và thời tiết, hai tool độc lập có thể gọi thế nào?

A. Gọi thời tiết sau nhiều lần retry vô hạn
B. Gọi song song để giảm latency tổng thể
C. Gọi chuyến bay rồi bỏ kết quả thời tiết
D. Gọi ngẫu nhiên và không lưu observation

**Câu 132.** Trace có observation giá 1,75 triệu nhưng final answer nói 1,5 triệu. Lỗi chính là gì?

A. Tool được gọi song song đúng cách
B. Prompt có quá ít role
C. Agent đã tự bịa hoặc làm lệch bằng chứng
D. Context window chắc chắn bị đầy

**Câu 133.** Nếu search_flights timeout, graceful degradation nên ưu tiên điều gì?

A. Tự bịa giá vé để trả lời ngay
B. Gọi lặp vô hạn đến khi thành công
C. Bỏ qua lỗi rồi ghi kết quả thành công
D. Báo thiếu dữ liệu và đưa hướng xử lý an toàn

**Câu 134.** Stop condition tốt của ReAct agent nên dựa trên điều gì?

A. Đã có đủ evidence để trả lời mục tiêu
B. Đã chạy đúng một vòng bất kể kết quả
C. Đã dùng hết mọi tool trong registry
D. Đã sinh đủ số token tối đa

**Câu 135.** Một use case đạt điểm thấp ở reasoning, tool use và dynamic decision nên chọn gì?

A. Autonomous agent có long horizon
B. Multi-agent supervisor với nhiều worker
C. Rule hoặc chatbot baseline đơn giản
D. LangGraph cyclic flow ngay lập tức

**Câu 136.** Ngoài max iterations, safeguard nào giúp ngăn agent bị treo khi tool không phản hồi?

A. Tăng context để tool tự chạy nhanh
B. Xóa observation để model đoán tiếp
C. Tắt log để giảm số token
D. Timeout riêng cho từng tool call

**Câu 137.** Câu hỏi FAQ một bước không cần dữ liệu mới thường phù hợp với gì?

A. Chatbot hoặc augmented LLM đơn giản
B. Agent có loop nhiều ngày
C. Supervisor-worker có nhiều route
D. Pipeline streaming có DLQ

**Câu 138.** Vì sao tên tool 'do_stuff' làm model chọn tool kém hơn 'search_flights'?

A. Tên dài luôn làm JSON sai cú pháp
B. Tên chung không truyền rõ ý định và phạm vi tool
C. Tên có động từ luôn bị model từ chối
D. Tên cụ thể làm tool chạy song song

**Câu 139.** Trong ReAct, Observation khác Action ở điểm nào?

A. Observation là prompt hệ thống trước khi gọi
B. Observation là mục tiêu ban đầu của user
C. Observation là giới hạn số vòng lặp
D. Observation là kết quả nhận về sau khi gọi tool

**Câu 140.** Vì sao agent thường đắt hơn chatbot cho cùng số query?

A. Agent luôn dùng token input bằng không
B. Chatbot luôn gọi nhiều worker hơn
C. Agent có thể tạo nhiều LLM call và tool loop
D. Agent không thể dùng model rẻ

<details>
<summary>Đáp án và giải thích Set V3</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 131 | B | Nếu search_flights và get_weather không phụ thuộc dữ liệu nhau, parallel calling tiết kiệm thời gian. | Day 3 — Parallel vs Chained |
| 132 | C | Final answer không khớp observation là dấu hiệu hallucination hoặc lỗi tổng hợp. | Day 3 — Trace Debug |
| 133 | D | Agent nên không bịa dữ liệu; có thể retry có giới hạn, fallback hoặc nói rõ chưa đủ evidence. | Day 3 — Tool Failure |
| 134 | A | Agent dừng khi task hoàn tất hoặc không thể tiến thêm trong boundary, không dừng chỉ vì số bước tùy ý. | Day 3 — Stop Condition |
| 135 | C | Agentic Fit thấp cho thấy độ phức tạp của agent chưa tạo thêm giá trị. | Day 3 — Agentic Fit Score |
| 136 | D | Timeout giới hạn thời gian chờ; retry và fallback cần được thiết kế bổ sung. | Day 3 — Agent Loop Control |
| 137 | A | Không nên dùng agent cho bài toán một bước, không tool và yêu cầu deterministic cao. | Day 3 — Anti-patterns |
| 138 | B | Tool name là tín hiệu phân loại đầu tiên; tên rõ giúp model định hướng chức năng. | Day 3 — Tool Definition |
| 139 | D | Action gửi yêu cầu tới tool; Observation là dữ liệu môi trường trả lại cho agent. | Day 3 — Thought / Action / Observation |
| 140 | C | Mỗi bước reasoning hoặc synthesis có thể phát sinh thêm token và latency. | Day 3 — Agent Cost |

</details>

---

### Khó

#### <a name="set-k3"></a>Set K3: Agent loop, control flow và debug trace


**Câu 141.** Trace có ba lỗi: gọi weather trước khi có flight, dùng HCM thay SGN, và final answer đổi 1,75M thành 1,5M. Cách phân loại đúng là gì?

A. Ba lỗi đều là timeout của API
B. Sai dependency, sai tham số và hallucination khi tổng hợp
C. Ba lỗi đều do temperature quá cao
D. Ba lỗi đều do vector store thiếu metadata

**Câu 142.** Hai tool A và B độc lập, nhưng B cần output A. Chiến lược nào tối ưu mà vẫn đúng?

A. Gọi tất cả song song bất kể dependency
B. Gọi B trước để giảm thời gian chờ
C. Chạy phần độc lập song song rồi chain bước phụ thuộc
D. Chạy tuần tự mọi tool dù không cần

**Câu 143.** Agent liên tục gọi lại cùng tool dù observation không thay đổi. Bộ kiểm soát nào nên phối hợp?

A. Tăng top-k để model có thêm context
B. Xóa tool description để model tự do hơn
C. Tăng temperature rồi bỏ mọi giới hạn
D. Max iterations, timeout, loop detection và fallback

**Câu 144.** Tool trả timeout tạm thời nhưng retry lần đầu vẫn lỗi. Retry policy production nên có gì?

A. Backoff có giới hạn, phân loại lỗi và fallback rõ
B. Retry ngay vô hạn với cùng payload
C. Đánh dấu thành công để agent dừng
D. Đổi sang tool bất kỳ không cùng chức năng

**Câu 145.** Agent có thể trả lời từ knowledge nội tại nhưng user hỏi giá realtime. Stop condition đúng yêu cầu gì?

A. Dừng vì model đã biết khái niệm sản phẩm
B. Không dừng trước khi có observation từ tool giá cập nhật
C. Dừng sau một Thought dù thiếu dữ liệu
D. Dừng khi context window còn nhiều chỗ

**Câu 146.** Native function calling được ưu tiên hơn ReAct text thuần trong production vì sao?

A. Function calling loại bỏ mọi lỗi tool execution
B. Function calling không cần system prompt
C. Schema JSON giúp bắt tool call đáng tin hơn regex text
D. Function calling luôn chỉ tạo một token

**Câu 147.** Triage route cho FAQ đơn giản nhưng route nhầm sang agent. Tác động đầu tiên thường là gì?

A. Giảm số token vì agent không có loop
B. Tự động tăng recall của vector store
C. Bảo đảm answer có citation hơn
D. Tăng cost và latency mà chất lượng không nhất thiết tăng

**Câu 148.** Long-horizon task dễ khác task một lượt ở điểm nào?

A. Cần state bền, checkpoint và kiểm soát side effect qua nhiều bước
B. Chỉ cần temperature cao hơn một lượt
C. Chỉ cần tăng kích thước font giao diện
D. Không cần stop condition vì task dài

**Câu 149.** Một bộ eval agent nên chấm riêng tool selection thay vì chỉ chấm final answer vì sao?

A. Final answer không bao giờ thể hiện quality
B. Answer đúng có thể do may mắn dù agent gọi sai tool
C. Tool selection không liên quan đến reliability
D. Agent luôn cần nhiều tool hơn chatbot

**Câu 150.** Nếu một agent trung bình gọi 3 LLM step/query và chatbot gọi 1 step/query, scale 1 triệu query sẽ nhạy với gì?

A. Chỉ số người dùng vì model không tính token
B. Chỉ kích thước vector store vì LLM không gọi
C. Chỉ số container vì tool loop luôn miễn phí
D. Tổng token, latency và cost tăng theo số bước agent

<details>
<summary>Đáp án và giải thích Set K3</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 141 | B | Day 3 chỉ rõ thứ tự tool, mã IATA và sự lệch evidence là ba loại lỗi cần sửa khác nhau. | Day 3 — Trace Bugs |
| 142 | C | Orchestration nên dựa trên dependency graph: parallel ở nhánh độc lập, sequential ở nhánh phụ thuộc. | Day 4 — Tool Execution Strategies |
| 143 | D | Nhiều safeguard cần đi cùng nhau vì một vòng lặp không kiểm soát có thể đốt token và side effect. | Day 3 / Day 4 — Loop Control |
| 144 | A | Retry cần phân biệt transient/permanent failure và giới hạn số lần để bảo vệ cost. | Day 3 / Day 4 — Tool Failure |
| 145 | B | Goal và evidence cần khớp; knowledge tĩnh không thay thế được dữ liệu realtime. | Day 3 — ReAct Evidence |
| 146 | C | Hybrid thường dùng reasoning/control của ReAct cùng format tool call có cấu trúc. | Day 3 — ReAct vs Function Calling |
| 147 | D | Agent có nhiều call hơn; hybrid route giúp tránh dùng độ phức tạp không cần thiết. | Day 3 — Hybrid Pattern |
| 148 | A | Task dài làm tăng rủi ro mất state, loop, retry trùng và cần durable execution. | Day 3 / Day 12 — Long Horizon |
| 149 | B | Day 3 nêu reasoning quality, tool selection, arguments, error handling và stopping là các điểm cần xem. | Day 3 — Agent Evaluation |
| 150 | D | Agent cost scale theo số call và token mỗi call; cần napkin math trước khi mở rộng. | Day 3 — Cost at Scale |

</details>

---

<a name="5-data-foundations-embedding--vector-store"></a>
## 5. Data Foundations, Embedding & Vector Store

Phân loại dữ liệu, memory, embedding, metadata, chunking và semantic search nền tảng.

### Dễ

#### <a name="set-d6"></a>Set D6: Data foundations, embedding và vector store


**Câu 151.** Knowledge data thường bao gồm loại dữ liệu nào?

A. Trạng thái đơn hàng thay đổi từng giây
B. Tài liệu, policy, SOP và FAQ tương đối ổn định
C. Thông tin chỉ tồn tại trong một phiên chat
D. Mã tạm dùng để xác thực một request

**Câu 152.** Operational data có đặc điểm nổi bật nào?

A. Chỉ là tài liệu tĩnh đã khóa phiên bản
B. Chỉ là sở thích ngắn của người dùng
C. Thay đổi liên tục và thường cần dữ liệu gần thời gian thực
D. Chỉ là prompt hệ thống dùng chung

**Câu 153.** Contextual data thường gắn với điều gì?

A. Toàn bộ corpus công khai trên Internet
B. Một model checkpoint cố định
C. Một thuật toán indexing của vector store
D. Session hoặc user hiện tại của yêu cầu

**Câu 154.** Nguyên lý Garbage In, Garbage Out nhắc điều gì?

A. Dữ liệu đầu vào kém có thể làm output AI kém
B. Model lớn sẽ tự sửa mọi dữ liệu sai
C. Thêm token sẽ luôn tạo câu trả lời đúng
D. Thêm agent sẽ tự loại bỏ mọi nhiễu

**Câu 155.** Embedding biến văn bản thành dạng nào?

A. Một file PDF có thể đọc trực tiếp
B. Một luật if/else cho từng từ khóa
C. Vector số biểu diễn tương đối về ngữ nghĩa
D. Một chuỗi mật khẩu để đăng nhập

**Câu 156.** Cosine similarity chủ yếu đo điều gì?

A. Số ký tự chung của hai tài liệu
B. Thời gian xử lý của một API call
C. Số người dùng đang mở một phiên
D. Độ gần về hướng giữa hai vector

**Câu 157.** Vector store thường lưu thêm gì ngoài vector?

A. Chunk gốc và metadata để truy vết, lọc
B. Chỉ lưu mật khẩu của người dùng
C. Chỉ lưu prompt hệ thống cuối cùng
D. Chỉ lưu số lượt gọi model trong ngày

**Câu 158.** Top-k trong retrieval chỉ số lượng gì?

A. Số token model được huấn luyện
B. Số kết quả gần nhất được lấy về
C. Số lớp của Transformer
D. Số vòng retry của một API

**Câu 159.** Metadata filter giúp retrieval làm gì?

A. Tăng temperature của model sinh câu trả lời
B. Tự động sửa mọi lỗi OCR trong PDF
C. Biến chunk text thành hình ảnh mới
D. Giới hạn kết quả theo domain, thời gian hoặc quyền

**Câu 160.** Data inventory có mục đích nào?

A. Chọn màu sắc cho dashboard giám sát
B. Tạo sẵn mọi câu trả lời cho chatbot
C. Ghi rõ loại dữ liệu, owner, freshness và PII
D. Thay thế hoàn toàn bước đánh giá retrieval

<details>
<summary>Đáp án và giải thích Set D6</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 151 | B | Knowledge data là tri thức nền versioned hoặc ít thay đổi mà agent cần tra cứu. | Day 7 — Data Types |
| 152 | C | Operational data như order status hoặc tồn kho cần freshness cao hơn knowledge data. | Day 7 — Operational Data |
| 153 | D | Contextual data thường ngắn và được inject trực tiếp cho task hiện tại. | Day 7 — Contextual Data |
| 154 | A | Chất lượng data giới hạn chất lượng retrieval và câu trả lời, kể cả khi model mạnh. | Day 7 — Data Quality |
| 155 | C | Embedding tạo biểu diễn số để so sánh các đoạn có ý nghĩa gần nhau. | Day 7 — Embeddings |
| 156 | D | Cosine similarity so sánh góc giữa vector query và vector tài liệu. | Day 7 — Cosine Similarity |
| 157 | A | Kho vector cần giữ nội dung và metadata như source, category, date để trả lời có ngữ cảnh. | Day 7 — Vector Store |
| 158 | B | Top-k quyết định bao nhiêu chunk đầu tiên được đưa vào các bước tiếp theo. | Day 7 — Top-k |
| 159 | D | Filter theo category, region, date hoặc ACL giúp tránh lấy nhầm tài liệu. | Day 7 — Metadata |
| 160 | C | Inventory giúp biết dữ liệu nào phù hợp retrieval và trách nhiệm quản trị thuộc về ai. | Day 7 — Data Inventory |

</details>

---

### Vừa

#### <a name="set-v6"></a>Set V6: Data, memory và retrieval design


**Câu 161.** Order status thay đổi liên tục không nên embed như policy tĩnh vì sao?

A. Embedding không thể biểu diễn bất kỳ số nào
B. Nó cần operational retrieval hoặc API có freshness cao
C. Policy tĩnh luôn cần streaming
D. Operational data không có metadata

**Câu 162.** Vì sao nên mask PII trước khi tạo embedding?

A. Tăng số chiều của vector lên gấp đôi
B. Làm mọi query khớp từ khóa chính xác
C. Giảm nguy cơ đưa thông tin nhạy cảm vào vector store
D. Bảo đảm tài liệu luôn được cập nhật

**Câu 163.** Memory lifecycle đầy đủ thường gồm chuỗi nào?

A. Prompt, Generate, Delete và Deploy
B. Extract, Train, Score và Render
C. Parse, Retry, Route và Stream
D. Capture, Filter, Store và Retrieve

**Câu 164.** Một user chỉ được xem policy khu vực miền Bắc. Metadata nào giúp lọc?

A. Region hoặc ACL gắn với từng chunk
B. Temperature của model sinh câu trả lời
C. Số vòng lặp trong system prompt
D. Tên provider của embedding model

**Câu 165.** Top-k quá cao có thể gây tác động nào?

A. Luôn tăng precision mà không đánh đổi
B. Nhiều context nhưng tăng nhiễu và token cost
C. Giảm context nhưng tăng latency bằng không
D. Tự biến sparse search thành dense search

**Câu 166.** Chunk quá nhỏ có nguy cơ gì khi trả lời policy?

A. Vector store không thể lưu metadata
B. Query luôn bị đổi sang từ khóa
C. Model không thể dùng cosine similarity
D. Mất phần điều kiện hoặc ngữ cảnh liên quan

**Câu 167.** Với mã lỗi ERR-x09, retrieval nào có thể đáng tin hơn?

A. Chỉ dense search trên câu diễn giải
B. Chỉ LLM tự nhớ từ training
C. Sparse hoặc hybrid search để khớp chính xác mã
D. Chỉ query expansion bằng từ đồng nghĩa

**Câu 168.** ANN được dùng khi nào?

A. Khi cần kiểm tra một schema bằng mắt
B. Khi cần sinh citation từ prompt
C. Khi cần retry một HTTP request
D. Khi cần tìm vector gần nhất trên kho rất lớn nhanh hơn brute force

**Câu 169.** Hosted retrieval phù hợp hơn self-managed retrieval khi nào?

A. Khi muốn đi nhanh và giảm code hạ tầng
B. Khi cần toàn quyền tối ưu mọi index nội bộ
C. Khi dữ liệu không có quyền truy cập
D. Khi muốn bỏ qua metadata và audit

**Câu 170.** Câu hỏi general knowledge không cần dữ liệu riêng thường không cần RAG vì sao?

A. LLM không thể xử lý context của chính nó
B. Retrieval thêm latency, cost và khả năng nhiễu không cần thiết
C. RAG chỉ dùng được với ảnh scan
D. Vector store không thể lưu tài liệu công khai

<details>
<summary>Đáp án và giải thích Set V6</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 161 | B | Tách knowledge và operational data giúp chọn cơ chế cập nhật và truy vấn phù hợp. | Day 7 — Data Types |
| 162 | C | Tên, số điện thoại hoặc định danh cá nhân có thể lan sang kho và trace nếu không xử lý sớm. | Day 7 — PII Masking |
| 163 | D | Không phải mọi sự kiện đều đáng nhớ; lifecycle cần chọn, lưu và truy xuất có chủ đích. | Day 7 — Memory Lifecycle |
| 164 | A | Attribute filter theo region hoặc quyền giúp tránh retrieval từ domain không được phép. | Day 7 — Metadata Filtering |
| 165 | B | Lấy thêm chunk không đồng nghĩa thêm bằng chứng hữu ích; cần threshold hoặc rerank. | Day 7 — Top-k / Threshold |
| 166 | D | Chunk nhỏ tìm trúng hơn nhưng có thể thiếu phần đầu/cuối của điều khoản. | Day 7 — Chunking |
| 167 | C | Exact identifiers là điểm mạnh của sparse retrieval; hybrid cân bằng thêm ý nghĩa. | Day 8 — Sparse Retrieval |
| 168 | D | Approximate Nearest Neighbor đánh đổi ít chính xác để giảm chi phí tìm kiếm ở quy mô lớn. | Day 7 — ANN |
| 169 | A | Managed service giảm công vận hành; self-managed phù hợp khi cần kiểm soát sâu hơn. | Day 7 — Hosted vs Self-managed |
| 170 | B | RAG nên dùng khi tri thức riêng, cập nhật hoặc cần audit; không phải câu hỏi nào cũng cần. | Day 7 — When Not to Use RAG |

</details>

---

### Khó

#### <a name="set-k6"></a>Set K6: Data architecture và semantic retrieval


**Câu 171.** Một bảng policy có header bị tách khỏi các dòng khi chunk. Cách sửa ưu tiên là gì?

A. Tăng temperature của generation để đoán header
B. Giữ cấu trúc bảng hoặc chuyển row thành text có header
C. Chia nhỏ mỗi ô thành một vector độc lập
D. Bỏ metadata vì bảng không có câu hoàn chỉnh

**Câu 172.** Small-to-big retrieval giải quyết trade-off nào?

A. Tìm bằng chunk lớn nhưng bỏ toàn bộ context
B. Dùng model nhỏ cho indexing và model lớn cho tokenization
C. Tìm bằng chunk nhỏ nhưng đưa parent context rộng hơn khi trả lời
D. Đổi sparse score thành temperature score

**Câu 173.** User chỉ được xem tài liệu năm 2026. Pre-filtering khác post-filtering ở điểm nào?

A. Pre-filter chỉ dùng cho output; post-filter chỉ dùng cho input
B. Pre-filter luôn chậm hơn vì phải quét toàn corpus
C. Hai cách không khác về rủi ro kết quả retrieval
D. Pre-filter chọn candidate trước search; post-filter loại sau top-k

**Câu 174.** Dense search hiểu 'hoàn tiền' và 'refund' gần nhau nhưng hụt mã ERR-x09. Vì sao hybrid hữu ích?

A. Sparse bổ sung exact keyword trong khi dense giữ semantic match
B. Sparse loại bỏ mọi lỗi typo còn dense bỏ mọi ID
C. Hybrid thay thế bước rerank bằng fine-tuning
D. Hybrid làm mọi vector có cùng score

**Câu 175.** Một file PDF upload một lần nhưng agent không thể truy lại có chủ đích. Vì sao chưa nên gọi đó là memory?

A. PDF luôn là operational data realtime
B. Memory cần lifecycle lưu và truy xuất, không chỉ tồn tại trong prompt
C. Memory chỉ được tạo từ token output
D. Memory không bao giờ có thể là tài liệu

**Câu 176.** Chunk có metadata ACL đúng nhưng retriever bỏ qua filter. Rủi ro chính là gì?

A. Chỉ tăng latency nhưng không ảnh hưởng privacy
B. Chỉ làm output ngắn hơn và rẻ hơn
C. Có thể đưa tài liệu ngoài quyền vào context và output
D. Chỉ làm cosine similarity bằng không

**Câu 177.** Raw PDF có OCR lỗi, policy cũ và header lặp. Thứ tự cải thiện nào hợp lý?

A. Embed ngay rồi để LLM tự sửa mọi lỗi
B. Tăng top-k để bù dữ liệu bẩn
C. Đổi model generation trước khi kiểm tra source
D. Clean/normalize, version và cấu trúc hóa trước khi embed

**Câu 178.** Khi kho có hàng triệu vector, ANN đổi điều gì để đạt tốc độ?

A. Đánh đổi một phần exactness để tìm gần nhất nhanh hơn
B. Đánh đổi metadata và bỏ quyền truy cập
C. Đánh đổi mọi citation để giảm output
D. Đánh đổi tokenization bằng cách xóa query

**Câu 179.** Data inventory cho thấy tài liệu FAQ ít thay đổi nhưng order status realtime. Kiến trúc nào hợp?

A. Embed cả hai rồi chỉ dùng một index tĩnh
B. RAG cho FAQ và API/operational retrieval cho order status
C. Fine-tune cả hai sau mỗi lần cập nhật
D. Dùng prompt hệ thống cho cả dữ liệu realtime

**Câu 180.** Nếu đổi GPT-4o-mini sang model lớn nhưng context vẫn bẩn, vì sao chất lượng có thể không cải thiện?

A. Model lớn luôn bị knowledge cutoff sớm hơn
B. RAG chỉ hoạt động với model nhỏ
C. Lỗi nằm ở dữ liệu hoặc retrieval trước khi nằm ở năng lực model
D. Data cleaning không ảnh hưởng grounded answer

<details>
<summary>Đáp án và giải thích Set K6</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 171 | B | Table parsing cần bảo toàn quan hệ header-row; nếu không retrieval mất ngữ cảnh và trả sai. | Day 8 — Table Chunking |
| 172 | C | Child chunk tăng precision khi search; parent chunk bổ sung context khi inject. | Day 8 — Parent-Child Indexing |
| 173 | D | Post-filter có thể loại phần lớn top-k sau khi search và làm thiếu kết quả phù hợp. | Day 8 — Pre vs Post Filtering |
| 174 | A | Hai trường phái bù điểm mù cho nhau; domain enterprise thường cần cả ý nghĩa và exact match. | Day 8 — Hybrid Search |
| 175 | B | Day 7 phân biệt file tạm với long-term memory có cơ chế store/retrieve rõ. | Day 7 — What Is Not Memory |
| 176 | C | Metadata chỉ có giá trị khi pipeline thực sự áp dụng filter và kiểm tra quyền. | Day 7 — Metadata / ACL |
| 177 | D | Data quality pyramid đi từ raw đến cleaned/structured; nạp rác làm retrieval sai dây chuyền. | Day 7 — Data Quality Pyramid |
| 178 | A | ANN không phải exact brute force; nó phù hợp khi quy mô khiến tìm tuyến tính quá chậm. | Day 7 — ANN |
| 179 | B | Ba loại data cần đường truy xuất khác nhau; không nên ép operational data vào knowledge index tĩnh. | Day 7 — Data Inventory |
| 180 | C | Day 7 nhấn mạnh data quality thường quan trọng hơn đổi model đắt hơn. | Day 7 — Data-centric AI |

</details>

---

<a name="6-rag-retrieval--grounding"></a>
## 6. RAG, Retrieval & Grounding

Indexing, retrieval, query transformation, hybrid search, reranking, grounding và RAG evaluation.

### Dễ

#### <a name="set-d7"></a>Set D7: RAG pipeline và grounding


**Câu 181.** RAG là viết tắt của cụm nào?

A. Random Agent Generation
B. Retrieval-Augmented Generation
C. Reasoning and Guardrail
D. Ranked API Gateway

**Câu 182.** Ba khối chính của RAG pipeline là gì?

A. Prompting, Coding và Deployment
B. Cleaning, Billing và Monitoring
C. Indexing, Retrieval và Generation
D. Planning, Acting và Memory

**Câu 183.** Fine-tuning thường phù hợp hơn RAG khi muốn thay đổi điều gì?

A. Cập nhật ngay một policy vừa sửa
B. Tìm một dòng tài liệu theo thời gian thực
C. Lọc dữ liệu theo quyền truy cập hiện tại
D. Phong cách, tone hoặc format phản hồi của model

**Câu 184.** Indexing pipeline thường làm gì với file tài liệu?

A. Parse, clean, chunk, embed và lưu cùng metadata
B. Chỉ gửi nguyên file vào prompt mỗi lần
C. Chỉ đổi tên file rồi xóa bản gốc
D. Chỉ tạo một chatbot không có retrieval

**Câu 185.** Retrieval pipeline bắt đầu khi nào?

A. Khi model được pre-train lần đầu
B. Khi user đổi màu giao diện
C. Khi có query cần tìm context liên quan
D. Khi Docker image được scan

**Câu 186.** Grounding trong RAG yêu cầu model làm gì?

A. Luôn trả lời dù context không có thông tin
B. Tự thêm kiến thức ngoài tài liệu cho đủ ý
C. Bỏ qua nguồn để câu trả lời tự nhiên hơn
D. Chỉ dựa vào context được cấp và nêu giới hạn

**Câu 187.** Vì sao tài liệu thường cần được chunk?

A. Để retrieval tìm đúng đoạn và vừa ngân sách context
B. Để làm model có thêm tham số
C. Để biến dữ liệu thành API key
D. Để bỏ hết metadata trước khi tìm

**Câu 188.** Chunk overlap giúp giảm rủi ro nào?

A. Model không thể nhận biết tên tool
B. Ý quan trọng bị cắt đúng tại ranh giới chunk
C. Cloud không thể cấp địa chỉ public
D. Dashboard có quá nhiều panel

**Câu 189.** BM25 thuộc nhóm retrieval nào?

A. Dense retrieval dựa trên cosine vector
B. Generation dựa trên temperature
C. Streaming dựa trên từng token
D. Sparse retrieval dựa trên khớp từ khóa

**Câu 190.** Citation trong câu trả lời RAG có ích gì?

A. Tăng số vòng lặp của agent
B. Thay thế bước xây vector index
C. Cho phép người dùng kiểm tra nguồn của thông tin
D. Đảm bảo retrieval không bao giờ sai

<details>
<summary>Đáp án và giải thích Set D7</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 181 | B | RAG kết hợp truy xuất tài liệu với khả năng sinh ngôn ngữ của LLM. | Day 8 — RAG |
| 182 | C | Indexing chuẩn bị kho, retrieval tìm context, generation tổng hợp câu trả lời. | Day 8 — High-level RAG Architecture |
| 183 | D | Slide so sánh fine-tuning với RAG: fine-tuning thiên về cách model nói, RAG thiên về tri thức cập nhật. | Day 8 — Fine-tuning vs RAG |
| 184 | A | Indexing biến dữ liệu phi cấu trúc thành các chunk có vector và thông tin truy vết. | Day 8 — Indexing |
| 185 | C | Query được embed và dùng để tìm các chunk gần nhất trong kho. | Day 8 — Retrieval |
| 186 | D | Strict grounding giảm hallucination bằng cách buộc câu trả lời bám evidence. | Day 8 — Grounding |
| 187 | A | Chunk quá lớn gây nhiễu; chunk quá nhỏ có thể mất ngữ cảnh. | Day 8 — Chunking |
| 188 | B | Phần chồng lấn giữ lại một ít ngữ cảnh ở hai phía của ranh giới. | Day 8 — Chunk Overlap |
| 189 | D | BM25 là thuật toán lexical/sparse mạnh khi cần khớp chính xác ID, mã lỗi hoặc tên. | Day 8 — Dense vs Sparse |
| 190 | C | Citation tăng auditability và giúp phát hiện câu trả lời không có evidence. | Day 8 — Citations |

</details>

---

### Vừa

#### <a name="set-v7"></a>Set V7: Advanced retrieval và generation trong RAG


**Câu 191.** Một policy đổi mỗi tuần nhưng model không đổi. Giải pháp nào phù hợp hơn?

A. Fine-tune lại model sau mỗi câu hỏi
B. Cập nhật index và dùng RAG với version/freshness
C. Tăng temperature để model đoán bản mới
D. Đưa toàn bộ policy vào system prompt vĩnh viễn

**Câu 192.** Query expansion giúp ích chủ yếu cho metric nào?

A. TTFT bằng cách giảm số layer model
B. Precision bằng cách xóa toàn bộ query
C. Recall bằng cách thêm từ đồng nghĩa và thuật ngữ
D. Cost bằng cách bỏ bước retrieval

**Câu 193.** Query decomposition phù hợp với câu hỏi nào?

A. Câu hỏi có một mã lỗi exact match
B. Câu hỏi chỉ cần đọc một trường metadata
C. Câu hỏi không có bất kỳ context nào
D. Câu hỏi multi-hop có nhiều ý cần tìm riêng

**Câu 194.** HyDE tạo văn bản giả định để làm gì?

A. Kéo query vector gần không gian của tài liệu trả lời
B. Thay bằng chứng thật bằng câu trả lời bịa
C. Đảm bảo final answer luôn đúng
D. Tạo thêm metadata cho mọi chunk

**Câu 195.** Hybrid search kết hợp hai tín hiệu nào?

A. Prompt length và output length
B. Dense semantic similarity và sparse keyword matching
C. Latency P95 và error rate
D. Liveness probe và readiness probe

**Câu 196.** RRF fusion thường gộp đại lượng nào?

A. Hai vector raw không chuẩn hóa
B. Hai prompt system và user
C. Thứ hạng của kết quả từ nhiều retriever
D. Hai log level debug và error

**Câu 197.** Nếu domain chủ yếu chứa mã lỗi và tên biến, alpha hybrid nên nghiêng về đâu?

A. Alpha bằng một để chỉ dùng dense
B. Alpha luôn bằng không bất kể domain
C. Alpha cao để bỏ qua exact match
D. Alpha thấp hơn để ưu tiên sparse/BM25

**Câu 198.** Cross-encoder khác bi-encoder ở điểm nào?

A. Cross-encoder chấm query-document cùng nhau chính xác hơn
B. Cross-encoder chỉ tạo embedding offline
C. Bi-encoder luôn cần đọc toàn bộ corpus
D. Bi-encoder chỉ dùng cho output formatting

**Câu 199.** MMR giúp xử lý vấn đề gì trong top-k context?

A. Tăng số token của mọi chunk giống nhau
B. Giảm các chunk trùng lặp và tăng độ đa dạng
C. Bỏ hẳn relevance để chọn ngẫu nhiên
D. Đổi dense vector thành sparse vector

**Câu 200.** Context đã chứa đáp án nhưng output vẫn bịa. Nên debug tầng nào trước?

A. Ingestion nguồn vì context chắc chắn rỗng
B. Docker image vì model không được gọi
C. Pagination vì mọi chunk đã mất
D. Generation, prompt grounding hoặc temperature

<details>
<summary>Đáp án và giải thích Set V7</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 191 | B | RAG cho phép cập nhật nguồn riêng mà không phải huấn luyện lại toàn bộ model. | Day 8 — RAG vs Fine-tuning |
| 192 | C | Sinh biến thể query giúp không bỏ sót tài liệu vì khác cách diễn đạt. | Day 8 — Query Expansion |
| 193 | D | Chia câu hỏi thành sub-query cho phép retrieval từng phần rồi tổng hợp. | Day 8 — Query Decomposition |
| 194 | A | Hypothetical answer có hình thức gần document hơn query ngắn, hỗ trợ tìm kiếm; không phải evidence cuối. | Day 8 — HyDE |
| 195 | B | Dense bắt ý nghĩa; sparse bắt keyword, ID và thuật ngữ exact. | Day 8 — Hybrid Search |
| 196 | C | Reciprocal Rank Fusion dùng rank để tránh phải so trực tiếp score khác thang đo. | Day 8 — RRF |
| 197 | D | Slide gợi ý domain code/log/pháp lý ưu tiên keyword chính xác hơn semantic mơ hồ. | Day 8 — Alpha Tuning |
| 198 | A | Bi-encoder phù hợp retrieve nhanh; cross-encoder rerank ít candidate với độ chính xác cao hơn. | Day 8 — Re-ranking |
| 199 | B | Maximum Marginal Relevance cân bằng relevance với diversity để không đưa nhiều bản sao. | Day 8 — MMR |
| 200 | D | Nếu evidence đã vào formatted_context mà câu trả lời sai, lỗi nằm sau retrieval. | Day 8 — Generation Troubleshooting |

</details>

---

### Khó

#### <a name="set-k7"></a>Set K7: RAG end-to-end, grounding và evaluation


**Câu 201.** PDF hai cột làm parser trộn thứ tự câu. Lỗi này nằm ở tầng nào trước khi chunk?

A. Temperature của model trả lời
B. Document parsing/ingestion, không phải generation
C. Reranker sau khi đã inject context
D. Output citation sau khi user đọc

**Câu 202.** Query 'quy định nghỉ phép cho nhân viên mới ở chi nhánh A' vừa mơ hồ vừa multi-hop. Chiến lược nào hợp?

A. Chỉ tăng top-k lên tối đa không filter
B. Chỉ dùng HyDE rồi coi draft là evidence
C. Query expansion kết hợp decomposition và metadata filter
D. Chỉ fine-tune model trên một câu hỏi

**Câu 203.** HyDE sinh câu trả lời giả định có thể sai. Vì sao vẫn dùng vector của nó để retrieve?

A. Vì mọi câu trả lời HyDE được coi là ground truth
B. Vì HyDE tự cập nhật policy vào database
C. Vì HyDE thay luôn citation ở final answer
D. Mục tiêu là khớp hình thức/ngữ nghĩa document, không dùng nó làm bằng chứng

**Câu 204.** Hybrid score dense và BM25 khác thang đo. RRF có lợi thế gì?

A. Gộp rank thay vì so trực tiếp score chưa chuẩn hóa
B. Gộp raw vector thành một prompt duy nhất
C. Gộp output token để giảm cost
D. Gộp log level thành một error rate

**Câu 205.** Reranker đưa ba chunk gần như cùng nội dung lên đầu. Kỹ thuật nào nên thêm?

A. Tăng top-k mà không lọc các bản sao
B. MMR để phạt redundancy và giữ context đa dạng
C. Chuyển toàn bộ dense thành fine-tuning
D. Giảm metadata để score gần nhau hơn

**Câu 206.** Retrieved context tốt nhưng nằm giữa prompt quá dài và model bỏ qua. Thay đổi nào hợp lý?

A. Đưa thêm tài liệu vào giữa để nhắc model
B. Tăng top-k để context càng dài
C. Compression và document reordering theo evidence quan trọng
D. Tăng temperature để model sáng tạo hơn

**Câu 207.** Hai tài liệu nói 12 và 14 ngày nghỉ phép. Generation grounded cần làm gì?

A. Chọn con số lớn hơn để an toàn
B. Trộn hai con số thành 13 ngày
C. Tự bịa điều kiện để quyết định
D. Ưu tiên version mới theo metadata và nêu xung đột nếu chưa đủ chắc

**Câu 208.** RAGAS Context Recall thấp nhưng Faithfulness cao. Diễn giải nào đúng?

A. Context tìm về thiếu evidence, nhưng phần đã có được dùng trung thực
B. Retriever tìm đủ nhưng model bịa thêm
C. Answer đúng trọng tâm nhưng context rỗng
D. Mọi chỉ số đều tốt vì faithfulness cao

**Câu 209.** Formatted context không chứa đáp án nhưng model vẫn trả lời tự tin. Sửa tầng nào trước?

A. Chỉ tăng temperature để model đoán tốt
B. Retrieval/indexing/query transformation trước generation
C. Chỉ thêm citation sau final answer
D. Chỉ thay UI bằng confidence badge

**Câu 210.** Golden dataset tốt cho RAG cần có đặc điểm nào?

A. Chỉ gồm câu hỏi dễ mà demo đã chạy
B. Chỉ chứa prompt dài nhất của user
C. Các câu hỏi đại diện, expected evidence và cách chấm rõ
D. Chỉ đo latency mà không có quality

<details>
<summary>Đáp án và giải thích Set K7</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 201 | B | Nếu nội dung đã bị đọc sai từ nguồn thì mọi embedding và generation phía sau đều bị ảnh hưởng. | Day 8 — Document Parsing |
| 202 | C | Cần mở rộng thuật ngữ, chia sub-query và lọc domain/region để tăng recall có kiểm soát. | Day 8 — Query Processing |
| 203 | D | HyDE là query transformation; evidence thật vẫn phải đến từ tài liệu retrieved. | Day 8 — HyDE |
| 204 | A | RRF dùng vị trí xếp hạng và tránh bài toán 'cam và táo' giữa hai score. | Day 8 — RRF |
| 205 | B | Cross-encoder tối ưu relevance; MMR bổ sung mục tiêu diversity khi các kết quả trùng. | Day 8 — MMR |
| 206 | C | Giảm nhiễu và đặt evidence quan trọng ở vị trí được chú ý hơn cải thiện generation. | Day 8 — Lost in the Middle |
| 207 | D | Conflict resolution cần version/effective date; nếu không giải quyết được, agent nên nói rõ giới hạn. | Day 8 — Conflicting Context |
| 208 | A | Context recall đo độ phủ evidence; faithfulness đo output có bám context đã nhận hay không. | Day 8 — RAG Evaluation Triad |
| 209 | B | Nếu evidence không vào context, generation không thể grounded; cần sửa retrieval trước. | Day 8 — Troubleshooting |
| 210 | C | Bộ câu hỏi vàng giúp A/B test indexing, retrieval, prompt và model trên cùng chuẩn. | Day 8 — Golden Dataset |

</details>

---

<a name="7-multi-agent-mcp-a2a--langgraph"></a>
## 7. Multi-Agent, MCP, A2A & LangGraph

Supervisor-worker, shared state, MCP, message contract A2A, routing và orchestration graph.

### Dễ

#### <a name="set-d8"></a>Set D8: Multi-agent, MCP và LangGraph


**Câu 211.** Khi nào single-agent có thể bắt đầu quá tải?

A. Khi chỉ trả lời một câu hỏi FAQ
B. Khi phải giữ nhiều vai trò, tool output và state
C. Khi chỉ dùng một prompt ngắn
D. Khi chỉ chạy một hàm tính toán

**Câu 212.** Multi-agent chủ yếu nhằm đạt lợi ích nào?

A. Tăng số agent dù bài toán không đổi
B. Loại bỏ hoàn toàn nhu cầu đánh giá
C. Chia vai trò để dễ kiểm soát và debug hơn
D. Đảm bảo latency luôn thấp hơn

**Câu 213.** Supervisor trong pattern supervisor-worker làm gì?

A. Chỉ lưu mọi vector của tài liệu
B. Chỉ thay thế API gateway
C. Chỉ tạo giao diện cho người dùng
D. Phân tích yêu cầu, route worker và tổng hợp kết quả

**Câu 214.** Worker tốt trong hệ multi-agent nên có đặc điểm nào?

A. Tập trung vào một năng lực chính rõ ràng
B. Làm luôn plan, retrieve và monitor
C. Có quyền gọi mọi tool trong hệ thống
D. Tự đổi schema chung sau mỗi lượt

**Câu 215.** MCP giải quyết vấn đề tích hợp nào?

A. Tự động biến mọi agent thành model lớn
B. Thay thế toàn bộ cơ sở dữ liệu nội bộ
C. Chuẩn hóa cách agent kết nối capability bên ngoài
D. Tự chấm điểm mọi câu trả lời bằng người

**Câu 216.** MCP server có thể công bố loại capability nào?

A. Chỉ các trọng số của model
B. Chỉ các luật pháp lý của cloud
C. Chỉ các bảng màu của frontend
D. Tools và resources cho agent sử dụng

**Câu 217.** A2A khác MCP ở điểm nào?

A. A2A giao tiếp giữa agent, MCP nối agent với capability
B. A2A chỉ xử lý vector, MCP chỉ xử lý ảnh
C. A2A dùng cho user, MCP dùng cho database
D. A2A là model, MCP là một loại token

**Câu 218.** Message contract trong A2A giúp điều gì?

A. Tăng temperature cho supervisor
B. Quy định worker cần làm gì và trả về dạng nào
C. Tự động cấp thêm quyền PII
D. Tắt mọi timeout của worker

**Câu 219.** Shared state trong graph thường dùng để lưu gì?

A. Chỉ mật khẩu cloud của ứng dụng
B. Chỉ ảnh đại diện của agent
C. Chỉ log của các request khác
D. Task, plan, messages và kết quả giữa các bước

**Câu 220.** Trong LangGraph, node thường là gì?

A. Một file PDF được embed vào vector store
B. Một HTTP header chứa API key
C. Một hàm nhận state và trả về state mới
D. Một dashboard chỉ hiển thị metric

<details>
<summary>Đáp án và giải thích Set D8</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 211 | B | Context bottleneck và quá nhiều trách nhiệm là dấu hiệu cân nhắc multi-agent. | Day 9 — Single-agent Limits |
| 212 | C | Multi-agent không mặc định tốt hơn; giá trị là phân vai hợp lý cho bài toán phức tạp. | Day 9 — Multi-agent |
| 213 | D | Supervisor chịu trách nhiệm điều phối, còn worker xử lý năng lực hẹp hơn. | Day 9 — Supervisor-worker |
| 214 | A | Worker hẹp giúp route rõ, dễ test và dễ xác định lỗi. | Day 9 — Worker Design |
| 215 | C | MCP giảm việc viết adapter riêng cho từng tool và tạo giao thức client/server thống nhất. | Day 9 — MCP |
| 216 | D | Tools phục vụ hành động; resources cung cấp dữ liệu hoặc tài nguyên để đọc. | Day 9 — MCP Architecture |
| 217 | A | Slide nhấn mạnh MCP là agent–tool, còn A2A là agent–agent communication. | Day 9 — MCP vs A2A |
| 218 | B | Contract rõ giảm context thiếu, output lệch và số lần supervisor phải gọi lại. | Day 9 — A2A Contract |
| 219 | D | State là vùng thông tin chung giúp nodes phối hợp trong một workflow. | Day 9 — Shared State |
| 220 | C | LangGraph mô hình hóa logic bằng nodes, edges và state. | Day 9 — LangGraph |

</details>

---

### Vừa

#### <a name="set-v8"></a>Set V8: Thiết kế multi-agent, MCP và A2A


**Câu 221.** Một task cần planner, retriever và synthesizer. Supervisor nên làm gì?

A. Tự làm toàn bộ để giảm số agent
B. Route từng vai trò và tổng hợp output có kiểm soát
C. Chỉ gọi retriever rồi bỏ synthesis
D. Cho mọi worker quyền gọi mọi capability

**Câu 222.** Hai worker tra hai nguồn độc lập có thể tối ưu latency bằng cách nào?

A. Chạy tuần tự dù không có phụ thuộc
B. Cho worker này sửa state của worker kia
C. Chạy song song rồi supervisor hợp nhất kết quả
D. Bỏ contract để giảm payload

**Câu 223.** Shared state tiện hơn message passing khi nào?

A. Khi muốn worker không biết task gốc
B. Khi muốn giấu mọi output khỏi supervisor
C. Khi chỉ có một hàm thuần không state
D. Khi graph cần nhìn và cập nhật trạng thái chung

**Câu 224.** MCP tool discovery thường bắt đầu bằng bước nào?

A. Client kết nối server rồi gọi tools/list
B. Model tự đoán tên tool từ Internet
C. Server gửi toàn bộ database vào prompt
D. User phải viết lại schema mỗi request

**Câu 225.** Message contract thiếu output schema dễ gây hậu quả nào?

A. Worker luôn trả JSON hợp lệ hơn
B. Supervisor khó tổng hợp và phải gọi lại worker
C. MCP tự động tạo thêm nguồn dữ liệu
D. Latency luôn giảm vì payload ngắn

**Câu 226.** Sync A2A phù hợp hơn async khi nào?

A. Task kéo dài không cần kết quả tức thời
B. Worker sẽ chạy hàng giờ độc lập
C. Supervisor cần kết quả ngay để đi bước tiếp
D. Không có bên nào chờ output

**Câu 227.** Boundary security giữa các agent nên kiểm soát điều gì?

A. Chỉ màu sắc của supervisor dashboard
B. Chỉ số token của model không có tool
C. Chỉ thứ tự các slide trong deck
D. Ai được gọi ai, dữ liệu nào được truyền và output nào cần xác thực

**Câu 228.** Conditional edge trong LangGraph hữu ích thế nào?

A. Đọc state để chọn node tiếp theo
B. Chỉ nối hai node theo thứ tự cố định
C. Chỉ lưu raw prompt không chạy logic
D. Chỉ render trace thành biểu đồ

**Câu 229.** Trace multi-agent nên ghi thêm trường nào để debug routing?

A. Chỉ số lượng token của mọi user khác
B. agent_id, input, route reason và output/status
C. Chỉ màu nền của từng worker
D. Chỉ thời điểm deploy của frontend

**Câu 230.** Nếu thêm worker nhưng cost và latency tăng mà chất lượng không cải thiện, kết luận nào hợp lý?

A. Cần thêm nhiều worker hơn nữa
B. Multi-agent luôn phải dùng model lớn
C. Chỉ cần xóa toàn bộ trace
D. Phân vai chưa tạo đủ giá trị so với độ phức tạp

<details>
<summary>Đáp án và giải thích Set V8</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 221 | B | Phân vai rõ giúp route, debug và kiểm tra từng giai đoạn. | Day 9 — Supervisor-worker |
| 222 | C | Task độc lập phù hợp parallel execution, nhưng vẫn cần schema và timeout rõ. | Day 9 — Orchestration |
| 223 | D | Shared state thuận tiện cho graph orchestration; message passing có thể cách ly tốt hơn giữa các thành phần. | Day 9 — Shared State |
| 224 | A | Luồng discovery giúp client biết danh sách, mô tả và schema tool mà server công bố. | Day 9 — MCP Discovery |
| 225 | B | Contract cần nêu nhiệm vụ, context, format và bằng chứng để worker trả kết quả dùng được. | Day 9 — A2A Contract |
| 226 | C | Sync đơn giản để hiểu và debug khi luồng cần kết quả trước khi tiếp tục. | Day 9 — Sync vs Async |
| 227 | D | Quyền và dữ liệu cần giới hạn; worker chạm external tool phải có validation. | Day 9 — Security Boundary |
| 228 | A | Router/conditional edge cho phép graph rẽ nhánh theo tool call, trạng thái hoặc điều kiện kết thúc. | Day 9 — Conditional Edges |
| 229 | B | Trace cần cho biết ai nhận gì, được gọi vì sao và trả kết quả nào. | Day 9 — Trace Log |
| 230 | D | Multi-agent là trade-off; số agent không phải thước đo chất lượng. | Day 9 — Cost / Latency |

</details>

---

### Khó

#### <a name="set-k8"></a>Set K8: Multi-agent orchestration, MCP và reliability


**Câu 231.** Một single-agent phải đọc hợp đồng 80 trang, tra luật, gọi API và viết risk summary. Dấu hiệu chia agent mạnh nhất là gì?

A. Task chỉ có một bước và một source
B. Nhiều vai trò, nguồn độc lập và cần debug lỗi theo tầng
C. Không có worker nào có capability riêng
D. Chỉ muốn tăng số LLM call cho vui

**Câu 232.** Một pipeline luôn chạy Parser → Research → Synthesis. Pattern nào phù hợp hơn supervisor động?

A. Debate pattern với nhiều bên tranh luận
B. Supervisor-worker route ngẫu nhiên
C. Pipeline pattern với các bước tuần tự rõ
D. Hierarchical pattern không có tầng

**Câu 233.** Supervisor trở thành 'god supervisor' khi nào?

A. Nó chỉ route theo contract ngắn
B. Nó ghi trace cho từng worker
C. Nó kiểm tra output trước khi tổng hợp
D. Nó tự làm plan, retrieve, synthesize và monitor thay worker

**Câu 234.** Shared state chứa PII nhưng worker chỉ cần một kết luận đã mask. Thiết kế nào an toàn hơn?

A. Truyền message tối thiểu và giữ PII ở boundary cần thiết
B. Đưa toàn bộ shared state cho mọi worker
C. Ghi PII vào mọi trace để dễ xem
D. Cấp admin capability cho worker tổng hợp

**Câu 235.** MCP server công bố tool nhưng client không biết tham số bắt buộc. Lỗi nằm ở đâu?

A. Agent chắc chắn thiếu reasoning
B. Tool discovery hoặc schema contract chưa đủ rõ
C. Vector store chắc chắn dùng sai cosine
D. SSE chắc chắn bị timeout

**Câu 236.** A2A worker trả 'đã tìm policy' nhưng không có source, rank hay status. Vì sao supervisor khó tin?

A. Worker dùng model nhỏ nên luôn sai
B. Async luôn tạo output không có source
C. Message contract thiếu evidence và trạng thái kiểm chứng
D. MCP không cho worker trả metadata

**Câu 237.** Worker nghiên cứu chạy 20 phút, supervisor không cần kết quả ngay. Giao tiếp nào phù hợp?

A. Sync request giữ connection vô hạn
B. Gọi lại worker mỗi giây không backoff
C. Bỏ timeout vì task dài
D. Async job có trạng thái và callback/result store

**Câu 238.** Graph route worker dựa trên need_retrieval và last message. Nếu route sai lặp lại, cần inspect gì?

A. State, router condition và trace của quyết định
B. Chỉ model provider mà không xem input
C. Chỉ dashboard latency trung bình
D. Chỉ số chiều embedding của tài liệu

**Câu 239.** Multi-agent khó debug hơn single-agent chủ yếu vì sao?

A. Multi-agent luôn không có log
B. Lỗi có thể nằm ở route, context, tool hoặc synthesis
C. Single-agent không bao giờ dùng tool
D. Nhiều agent không thể chạy song song

**Câu 240.** Nếu workers độc lập chạy song song nhưng supervisor retry toàn bộ khi một worker lỗi, cải tiến nào hợp lý?

A. Retry mọi worker vô hạn cùng lúc
B. Bỏ lỗi worker và báo thành công
C. Chuyển tất cả worker thành một prompt
D. Retry theo worker với timeout và kết quả partial rõ

<details>
<summary>Đáp án và giải thích Set K8</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 231 | B | Context bottleneck, nhiều vai trò và nhu cầu truy nguyên lỗi là lý do thực dụng để phân chia. | Day 9 — Single-agent Limits |
| 232 | C | Pipeline dành cho flow tuyến tính; supervisor phù hợp khi route/subtask thay đổi theo input. | Day 9 — Multi-agent Patterns |
| 233 | D | Supervisor quá tải làm mất lợi ích phân vai và trở lại single-agent khó debug. | Day 9 — Anti-patterns |
| 234 | A | Message passing và data minimization giảm blast radius so với chia toàn bộ state. | Day 9 — Shared State / Security |
| 235 | B | MCP client cần tools/list và schema để biết cách gọi; contract không rõ dẫn đến arguments sai. | Day 9 — MCP Tool Discovery |
| 236 | C | Contract cần định nghĩa output có thể tổng hợp và audit, không chỉ một câu mô tả chung. | Day 9 — A2A Contract |
| 237 | D | Async tách vòng đời task dài khỏi request và cho phép theo dõi trạng thái. | Day 9 / Day 12 — Sync vs Async |
| 238 | A | Routing lỗi có thể do field state, prompt router hoặc điều kiện edge; trace giúp phân biệt. | Day 9 — LangGraph Routing |
| 239 | B | Nhiều boundary tạo nhiều điểm hỏng; trace cần ghi agent_id, input, output và status. | Day 9 — Observability |
| 240 | D | Granular retry giảm cost/latency và tránh lặp side effect của nhánh đã thành công. | Day 9 — Reliability |

</details>

---

<a name="8-data-pipeline-quality--data-observability"></a>
## 8. Data Pipeline, Quality & Data Observability

ETL/ELT, ingestion, CDC, data contract, quality gate, drift, idempotency và triage.

### Dễ

#### <a name="set-d9"></a>Set D9: Data pipeline và data observability


**Câu 241.** ETL khác ELT chủ yếu ở thứ tự nào?

A. ETL load trước extract, ELT extract sau load
B. ETL transform trước load, ELT load trước transform
C. ETL chỉ dùng streaming, ELT chỉ dùng batch
D. ETL không có transform, ELT không có extract

**Câu 242.** Batch processing có đặc điểm nào?

A. Xử lý từng event ngay khi phát sinh
B. Luôn cần một vector store trước đó
C. Xử lý dữ liệu theo lô vào các thời điểm định trước
D. Chỉ chạy được khi có người bấm nút

**Câu 243.** Streaming phù hợp hơn batch khi nào?

A. Khi dữ liệu chỉ cập nhật mỗi quý
B. Khi muốn bỏ qua mọi retry
C. Khi nguồn chỉ là một file tĩnh
D. Khi cần phản ánh event mới với độ trễ thấp

**Câu 244.** CDC dùng để làm gì trong ingestion database?

A. Theo dõi các bản ghi được tạo, sửa hoặc xóa
B. Tạo embedding cho mọi câu trả lời
C. Đổi tên schema thành một model mới
D. Giới hạn số user được gọi API

**Câu 245.** Exponential backoff xử lý lỗi 429 như thế nào?

A. Gửi lại request liên tục không nghỉ
B. Xóa ngay dữ liệu chưa xử lý
C. Tăng dần thời gian chờ giữa các lần retry
D. Đổi mọi lỗi thành trạng thái thành công

**Câu 246.** Cursor pagination có ưu điểm nào so với offset khi dữ liệu đổi?

A. Luôn trả về toàn bộ bảng trong một lần
B. Không cần khóa hay dấu mốc nào
C. Tự động sửa mọi schema drift
D. Giảm nguy cơ bỏ sót hoặc lặp bản ghi khi đọc tiếp

**Câu 247.** DLQ trong pipeline thường chứa gì?

A. Event lỗi cần tách ra để kiểm tra hoặc xử lý lại
B. Mọi event đã xử lý thành công
C. Chỉ các vector có similarity cao
D. Chỉ các prompt hệ thống mới nhất

**Câu 248.** Data contract giúp pipeline biết điều gì?

A. Model nào phải trả lời user đầu tiên
B. Schema, kiểu dữ liệu và giá trị hợp lệ cần tuân thủ
C. Số token tối đa của mọi prompt
D. Màu sắc của dashboard theo dõi

**Câu 249.** Drift nói lên điều gì?

A. Dữ liệu chắc chắn sai trong mọi trường hợp
B. Model chắc chắn đã bị jailbreak
C. Pipeline chắc chắn đã mất toàn bộ dòng
D. Phân phối dữ liệu đã thay đổi so với mốc tham chiếu

**Câu 250.** Idempotency trong pipeline giúp điều gì?

A. Tăng số lần gọi model để có đa dạng
B. Bỏ qua mọi checkpoint đã ghi
C. Chạy lại an toàn mà không tạo bản ghi trùng
D. Cho phép retry side effect không giới hạn

<details>
<summary>Đáp án và giải thích Set D9</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 241 | B | Cả hai đều có Extract, Transform và Load; điểm khác là vị trí transform. | Day 10 — ETL vs ELT |
| 242 | C | Batch phù hợp khi có thể chấp nhận độ trễ và muốn vận hành theo lịch. | Day 10 — Batch vs Streaming |
| 243 | D | Streaming xử lý dòng event liên tục và giảm độ trễ so với chạy theo lô. | Day 10 — Batch vs Streaming |
| 244 | A | Change Data Capture ghi nhận thay đổi thay vì quét lại toàn bộ bảng mỗi lần. | Day 10 — CDC vs Snapshot |
| 245 | C | Backoff giảm áp lực lên dịch vụ đang giới hạn tốc độ; jitter giúp tránh retry đồng thời. | Day 10 — Backoff |
| 246 | D | Cursor tiếp tục từ dấu mốc ổn định hơn khi dữ liệu nguồn thay đổi trong lúc đọc. | Day 10 — Pagination |
| 247 | A | Dead-letter queue giữ message không xử lý được để không chặn toàn bộ dòng dữ liệu. | Day 10 — Queue / DLQ |
| 248 | B | Data contract là thỏa thuận có thể kiểm tra giữa nguồn và bên nhận dữ liệu. | Day 10 — Data Contract |
| 249 | D | Drift là tín hiệu cần điều tra; nó không tự kết luận dữ liệu mới đúng hay sai. | Day 10 — Drift Detection |
| 250 | C | Upsert theo natural key như doc_id và version giúp lần chạy lại không nhân đôi dữ liệu. | Day 10 — Idempotency |

</details>

---

### Vừa

#### <a name="set-v9"></a>Set V9: Ingestion, data quality và pipeline control


**Câu 251.** Team cần governance mạnh trước khi nạp dữ liệu vào warehouse. ETL có thể phù hợp vì sao?

A. Load raw trước rồi không cần contract
B. Transform và kiểm tra trước khi load vào kho đích
C. Chỉ xử lý event mới và bỏ dữ liệu cũ
D. Không cần biết schema nguồn khi ingest

**Câu 252.** Tồn kho cần cập nhật gần ngay sau mỗi thay đổi. Lựa chọn nào hợp lý?

A. Batch chạy mỗi tuần để giảm mọi chi phí
B. Snapshot thủ công khi user phàn nàn
C. Streaming hoặc CDC với độ trễ thấp
D. Embed toàn bộ lịch sử vào một vector

**Câu 253.** CDC có lợi thế gì so với snapshot khi bảng lớn và thay đổi ít?

A. Luôn loại bỏ được mọi schema drift
B. Không cần xử lý delete event
C. Không cần lưu checkpoint nào
D. Chỉ truyền phần thay đổi thay vì quét lại toàn bảng

**Câu 254.** Khi API trả 429 kèm Retry-After, retry policy nên ưu tiên gì?

A. Tôn trọng header, backoff và thêm jitter
B. Bỏ qua header và retry liên tục
C. Đổi lỗi thành dữ liệu hợp lệ
D. Gọi thêm nhiều worker cùng lúc

**Câu 255.** Offset pagination dễ làm lặp bản ghi khi nào?

A. Khi dữ liệu hoàn toàn bất biến
B. Khi bản ghi mới chèn vào trước trang đang đọc
C. Khi request chỉ có một trang
D. Khi server hỗ trợ cursor ổn định

**Câu 256.** Content hash khác logical version ở điểm nào?

A. Hash luôn biết ai phê duyệt tài liệu
B. Logical version chỉ đo kích thước file
C. Hash nói bytes đổi, không đảm bảo policy đã sang phiên bản mới
D. Hai khái niệm luôn là một

**Câu 257.** Backpressure cần thiết khi producer nhanh hơn consumer vì sao?

A. Giúp mọi event tự biến thành success
B. Giúp bỏ qua queue và xử lý trực tiếp
C. Giúp tăng vô hạn số worker
D. Giúp giới hạn dòng vào và tránh làm quá tải downstream

**Câu 258.** Một cột vẫn đúng type nhưng null rate tăng mạnh. Nên kiểm tra dimension nào?

A. Completeness và thay đổi schema/nguồn
B. Chỉ uniqueness của khóa chính
C. Chỉ latency của LLM generation
D. Chỉ temperature của embedding model

**Câu 259.** Agent trả lời policy cũ dù pipeline job không báo lỗi. Triage đầu tiên nên xem gì?

A. Đổi model sang bản đắt hơn ngay
B. Freshness, last success và bước publish/index
C. Tăng temperature để nhớ policy mới
D. Xóa toàn bộ vector store không kiểm tra

**Câu 260.** Quality gate nên làm gì khi dữ liệu vi phạm rule nghiêm trọng?

A. Cho đi tiếp rồi sửa sau khi user thấy
B. Lặng lẽ bỏ dòng không ghi log
C. Retry vô hạn cùng một dữ liệu lỗi
D. Halt hoặc quarantine trước khi embed/publish

<details>
<summary>Đáp án và giải thích Set V9</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 251 | B | ETL lọc và chuẩn hóa sớm; ELT giữ raw để transform sau, thường linh hoạt hơn cho warehouse. | Day 10 — ETL vs ELT |
| 252 | C | Operational freshness cao ưu tiên event-driven ingestion hơn batch chậm. | Day 10 — Batch / Streaming |
| 253 | D | CDC tiết kiệm công đọc và truyền dữ liệu, nhưng phải xử lý đầy đủ create/update/delete. | Day 10 — CDC |
| 254 | A | Retry-After là tín hiệu từ server; exponential backoff và jitter tránh tạo bão retry. | Day 10 — 429 Backoff |
| 255 | B | Offset phụ thuộc vị trí; dữ liệu đổi có thể đẩy dòng sang trang trước hoặc sau. | Day 10 — Cursor Pagination |
| 256 | C | File có thể đổi bytes nhưng giữ version; hoặc version đổi mà bytes xử lý không như mong muốn. | Day 10 — PDF / HTML |
| 257 | D | Queue, giới hạn tốc độ hoặc pause producer bảo vệ consumer khi lưu lượng tăng. | Day 10 — Backpressure |
| 258 | A | Schema có thể pass nhưng dữ liệu thiếu; cần theo dõi completeness và nguyên nhân upstream. | Day 10 — Data Quality |
| 259 | B | Job thành công nhưng không có dữ liệu mới có thể là freshness hoặc publish/cache swap lỗi. | Day 10 — Triage |
| 260 | D | Gate là điểm quyết định; dữ liệu nguy hiểm cần bị chặn và có dấu vết xử lý. | Day 10 — Quality Gate |

</details>

---

### Khó

#### <a name="set-k9"></a>Set K9: Data pipeline, quality gate và incident triage


**Câu 261.** Một lỗi parser làm chunk ngắn bất thường, retrieval sai và agent trả policy cũ. Đây là mẫu lỗi nào?

A. Chỉ là temperature drift ở generation
B. Data cascade từ upstream lan qua ingestion và serving
C. Chỉ là false positive của UI
D. Chỉ là lỗi auth của API gateway

**Câu 262.** Nguồn cần lưu raw để audit nhưng warehouse biến đổi linh hoạt sau khi load. ELT có lợi thế nào?

A. Bỏ qua data quality vì raw luôn đúng
B. Không cần schema vì transform sau
C. Giữ raw trong kho rồi transform theo nhu cầu và contract
D. Luôn giảm latency so với streaming

**Câu 263.** Snapshot job báo thành công nhưng lấy 0 dòng vì watermark sai. Metric nào nên phát hiện?

A. Chỉ uptime của container
B. Chỉ token cost của model
C. Chỉ số lượng citation trong output
D. Volume/row count và freshness thay vì chỉ exit code

**Câu 264.** CDC nhận update rồi delete nhưng consumer chỉ xử lý upsert. Hậu quả là gì?

A. Bản ghi đã xóa có thể còn tồn tại trong downstream/index
B. Mọi bản ghi mới chắc chắn bị nhân đôi
C. Vector similarity tự chuyển thành zero
D. Pipeline luôn tự rollback đúng

**Câu 265.** Một dataset có duplicate id, ngày tháng sai kiểu và nhiều NULL. Cách phân loại dimension nào hợp?

A. Freshness, latency và TTFT
B. Uniqueness, validity và completeness
C. Faithfulness, relevance và recall
D. Traffic, error rate và uptime

**Câu 266.** Drift tăng sau khi nguồn thay đổi nhưng accuracy chưa biết. Quyết định nào đúng?

A. Chặn mọi data mới vì drift luôn là lỗi
B. Bỏ data contract vì distribution đã đổi
C. Điều tra source of truth; drift không tự kết luận data sai
D. Đổi model lớn để drift tự biến mất

**Câu 267.** Agent trả fact cũ lúc 09:12. Theo thứ tự triage slide, nên mở dashboard nào trước?

A. Generation temperature rồi prompt length
B. Model size rồi vector dimension
C. UI confidence rồi màu citation
D. Freshness rồi volume, schema và lineage

**Câu 268.** Pipeline chạy lại cùng doc_id/version nhưng tạo UUID mới và duplicate chunk. Thiết kế nào thiếu?

A. Idempotent upsert theo natural key
B. Streaming token cho output
C. Dense embedding cho query
D. Human review cho every event

**Câu 269.** Một rule chặn 2% dòng nhưng không có owner hoặc lý do. Vấn đề governance nào phát sinh?

A. Không thể tăng context window của LLM
B. Không biết ai chịu trách nhiệm và có thể chặn nhầm data tốt
C. Không thể gọi tool song song
D. Không thể dùng Docker slim

**Câu 270.** Một event lỗi retry nhiều lần rồi làm queue nghẽn. Thiết kế nào giảm tác động?

A. Giữ retry vô hạn để không mất event
B. Xóa event không ghi dấu vết
C. Giới hạn retry và chuyển event sang DLQ có alert
D. Cho producer tăng tốc để bù

<details>
<summary>Đáp án và giải thích Set K9</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 261 | B | Một quyết định/lỗi đầu nguồn có thể làm hậu quả lớn dần qua các tầng. | Day 10 — Data Cascade |
| 262 | C | ELT phù hợp khi warehouse có khả năng xử lý và cần giữ raw; quality gate downstream vẫn cần. | Day 10 — ETL / ELT |
| 263 | D | Không có row mới có thể trông như success; volume và freshness phải có threshold. | Day 10 — Checkpoint |
| 264 | A | CDC phải truyền và xử lý semantics của delete, không chỉ create/update. | Day 10 — CDC |
| 265 | B | Data quality dimensions cần tách câu hỏi: không trùng, đúng kiểu/giá trị và đủ dữ liệu. | Day 10 — Six Dimensions |
| 266 | C | Drift chỉ báo phân phối lệch baseline; cần rule/domain knowledge để phán định. | Day 10 — Drift ≠ Wrong |
| 267 | D | Day 10 nêu thứ tự Freshness → Volume → Schema → Lineage để khoanh tầng dữ liệu. | Day 10 — Triage Order |
| 268 | A | Natural key như (doc_id, version) giúp retry ghi đè đúng bản ghi thay vì tạo bản sao. | Day 10 — Idempotency |
| 269 | B | Data contract và RACI giúp rule có owner, artifact và quyết định chấp nhận rủi ro. | Day 10 — RACI / Quality Gate |
| 270 | C | DLQ cô lập poison message; alert và replay có kiểm soát bảo vệ pipeline chính. | Day 10 — Queue / DLQ |

</details>

---

<a name="9-guardrails-safety-deployment--observability"></a>
## 9. Guardrails, Safety, Deployment & Observability

Prompt injection, defense in depth, HITL, Docker/cloud, reliability, monitoring và incident debugging.

### Dễ

#### <a name="set-d10"></a>Set D10: Guardrails, deployment và monitoring


**Câu 271.** Guardrails tồn tại để làm gì?

A. Làm model sinh văn bản dài hơn
B. Giới hạn hành vi rủi ro và tăng độ tin cậy của agent
C. Thay thế toàn bộ việc đánh giá sản phẩm
D. Bảo đảm mọi prompt đều cho cùng kết quả

**Câu 272.** Input guardrail thường chạy ở thời điểm nào?

A. Sau khi user đã nhận câu trả lời
B. Sau khi container đã bị xóa
C. Trước khi input được gửi vào LLM
D. Chỉ khi dashboard phát hiện lỗi

**Câu 273.** Output guardrail kiểm tra điều gì?

A. Tên miền của website deploy
B. Số lượng CPU trong container
C. Phiên bản hệ điều hành của user
D. Câu trả lời có độc hại, lộ PII hoặc thiếu grounding không

**Câu 274.** Defense in depth nghĩa là gì trong AI safety?

A. Kết hợp nhiều lớp phòng thủ thay vì tin một bộ lọc
B. Dùng một regex duy nhất cho mọi tấn công
C. Chỉ kiểm tra user trước khi đăng nhập
D. Chỉ dựa vào model lớn để tự bảo vệ

**Câu 275.** Red teaming là hoạt động nào?

A. Tối ưu chi phí bằng cách giảm số token
B. Đo uptime của máy chủ theo ngày
C. Chủ động thử các prompt đối nghịch để tìm lỗ hổng
D. Viết tài liệu API cho một tool mới

**Câu 276.** HITL phù hợp nhất với hành động nào?

A. Tạo embedding cho một đoạn văn công khai
B. Đổi tên một biến cục bộ trong code
C. Tính tổng vài số không có side effect
D. Gửi email, xóa dữ liệu hoặc quyết định rủi ro cao

**Câu 277.** Vì sao production nên dùng environment variables cho secrets?

A. Để không hardcode API key trong mã nguồn
B. Để model tự sinh secret mới mỗi request
C. Để log luôn chứa toàn bộ mật khẩu
D. Để container không cần image nữa

**Câu 278.** Health check endpoint giúp hệ thống biết điều gì?

A. Model đang sinh đúng từng token hay không
B. Container còn sống hoặc sẵn sàng nhận request hay không
C. User có thích câu trả lời hay không
D. Prompt có đủ bốn thành phần hay không

**Câu 279.** Ba pillar truyền thống của observability là gì?

A. Prompt, model và vector
B. Input, output và memory
C. Docker, cloud và gateway
D. Metrics, logs và traces

**Câu 280.** P99 latency mô tả điều gì?

A. Thời gian trung bình của mọi request
B. Request nhanh nhất trong một khoảng
C. Mốc mà khoảng 99% request nhanh hơn hoặc bằng
D. Chi phí trung bình của một token

<details>
<summary>Đáp án và giải thích Set D10</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 271 | B | Guardrails là lớp kiểm soát bắt buộc khi agent có dữ liệu, tool hoặc hành động thực tế. | Day 11 — Why Guardrails |
| 272 | C | Input rails có thể kiểm tra độ dài, format, topic và dấu hiệu prompt injection. | Day 11 — Input Guardrails |
| 273 | D | Output rails là tuyến cuối để redact, block hoặc yêu cầu kiểm tra lại response. | Day 11 — Output Guardrails |
| 274 | A | Input rails, LLM rails, output rails và human review bổ sung cho nhau. | Day 11 — Defense in Depth |
| 275 | C | Red team tấn công có chủ đích để kiểm tra guardrails trước khi người xấu làm. | Day 11 — Red Teaming |
| 276 | D | Human-in-the-loop thêm phê duyệt cho hành động khó hoàn tác hoặc high-stakes. | Day 11 — HITL |
| 277 | A | 12-Factor App tách config và secret khỏi code để dễ bảo vệ, thay đổi và triển khai. | Day 12 — 12-Factor App |
| 278 | B | Liveness và readiness probe hỗ trợ restart hoặc loại instance lỗi khỏi traffic. | Day 12 — Health Checks |
| 279 | D | Day 13 bổ sung continuous eval như pillar thứ tư riêng cho AI. | Day 13 — Observability Pillars |
| 280 | C | Percentile cao cho thấy trải nghiệm của nhóm request chậm, thường quan trọng trong agent. | Day 13 — Percentiles |

</details>

---


---

### Vừa

#### <a name="set-v10"></a>Set V10: Safety, deployment và observability


**Câu 281.** User gõ 'ignore previous instructions' là tấn công nào?

A. Indirect injection trong tài liệu
B. Direct prompt injection
C. Data drift trong pipeline
D. Cold start của container

**Câu 282.** Tài liệu PDF có hidden text ra lệnh gửi dữ liệu cho hacker là tấn công nào?

A. Direct injection từ user prompt
B. False positive của moderation
C. Indirect prompt injection
D. Timeout của tool execution

**Câu 283.** Nếu agent có quyền xóa database, guardrail kỹ thuật quan trọng là gì?

A. Tăng temperature để agent thận trọng
B. Tắt output moderation để ít cản trở
C. Cho mọi worker dùng chung admin key
D. Least privilege, sandbox và quyền chỉ đọc nếu đủ

**Câu 284.** HITL model nào hợp với việc publish nội dung công khai?

A. Human-in-the-loop trước hành động không thể hoàn tác
B. Human-on-the-loop chỉ xem sau mọi lần
C. Không cần human nếu confidence cao
D. Human-as-tiebreaker chỉ dùng cho FAQ

**Câu 285.** Multi-stage Docker build đem lại lợi ích nào?

A. Tăng quyền root cho ứng dụng
B. Giảm image cuối bằng cách tách build dependencies
C. Đưa secret vào image để dễ dùng
D. Bỏ qua bước scan lỗ hổng

**Câu 286.** Agent reasoning vượt timeout gateway. Giải pháp UX/infrastructure nào phù hợp?

A. Retry request đồng bộ vô hạn
B. Tăng token budget không giới hạn
C. Streaming SSE hoặc chuyển sang async job
D. Ẩn trạng thái để user chờ im lặng

**Câu 287.** Để agent vừa stateless vừa giữ conversation, nên làm gì?

A. Giữ state trong RAM của một instance
B. Ghi state vào prompt hệ thống cố định
C. Tạo một container riêng cho từng token
D. Externalize session state vào Redis hoặc kho dùng chung

**Câu 288.** API gateway trước agent thường nên có ba lớp bảo vệ nào?

A. Authentication, rate limiting và cost protection
B. Temperature, top_p và chunk overlap
C. Embedding, rerank và citation
D. Prompt, worker và vector store

**Câu 289.** Structured JSON log nên có correlation_id để làm gì?

A. Tăng độ dài context của LLM
B. Nối các log/span của cùng một request
C. Đặt confidence score cho user
D. Tạo unique key cho mỗi tài liệu

**Câu 290.** SLO khác SLA ở điểm nào?

A. SLO luôn là luật pháp, SLA luôn là dashboard
B. SLO chỉ cho AI, SLA chỉ cho database
C. SLO là log, SLA là trace
D. SLO là mục tiêu đo được, SLA là cam kết có trách nhiệm

<details>
<summary>Đáp án và giải thích Set V10</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 281 | B | Chỉ dẫn độc hại nằm trực tiếp trong input user và cố ghi đè system prompt. | Day 11 — Direct Injection |
| 282 | C | Instruction nằm trong nội dung mà agent retrieve, không nằm trực tiếp trong câu hỏi user. | Day 11 — Indirect Injection |
| 283 | D | Giới hạn quyền giảm blast radius nếu model hoặc tool output bị thao túng. | Day 11 — Least Privilege |
| 284 | A | Publish có side effect và rủi ro danh tiếng; nên phê duyệt trước khi thực hiện. | Day 11 — HITL Models |
| 285 | B | Builder chứa công cụ build; runtime image chỉ giữ dependency cần chạy. | Day 12 — Docker Multi-stage |
| 286 | C | SSE báo tiến trình sớm; task dài nên chuyển queue/job để không giữ HTTP request quá lâu. | Day 12 — Long-running Agent |
| 287 | D | External state cho phép load balancer phân request sang nhiều instance. | Day 12 — Stateful vs Stateless |
| 288 | A | Gateway lọc quyền truy cập, tốc độ và ngân sách trước khi request chạm logic agent. | Day 12 — API Gateway |
| 289 | B | Correlation ID giúp đi từ request đến LLM call, tool call và lỗi liên quan. | Day 13 — Correlation ID |
| 290 | D | SLI là số đo; SLO là mục tiêu nội bộ; SLA là cam kết dịch vụ với hệ quả nếu vi phạm. | Day 13 — SLI / SLO / SLA |

</details>

---


---

### Khó

#### <a name="set-k10"></a>Set K10: Safety, deployment và observability tích hợp


**Câu 291.** Agent vừa đọc dữ liệu riêng, vừa nhận nội dung web không tin cậy, vừa có quyền gửi email. Vì sao đây là lethal trifecta?

A. Ba yếu tố chỉ làm latency tăng nhưng không tăng risk
B. Ba yếu tố cùng tạo đường từ untrusted input tới side effect trên private data
C. Private data tự động làm mọi prompt an toàn hơn
D. Có email tool thì agent không cần input guardrail

**Câu 292.** Input classifier bắt được direct injection nhưng indirect injection vẫn lọt. Lớp nào nên bổ sung?

A. Chỉ tăng max tokens cho system prompt
B. Chỉ bật temperature=0 cho mọi model
C. Quarantine, delimiters, tool boundary và output grounding
D. Chỉ thêm một worker tổng hợp không filter

**Câu 293.** Action-Selector Agent giảm risk bằng cách nào?

A. Cho model tự viết bất kỳ lệnh shell nào
B. Cho output tool quyết định mọi side effect
C. Cho user bỏ qua system prompt khi cần
D. Chỉ chọn action từ danh sách tool được phép

**Câu 294.** Gửi tiền và xóa dữ liệu là hành động high-stakes. HITL architecture hợp lý nhất là gì?

A. Agent chuẩn bị, human duyệt trước execution và log quyết định
B. Agent tự làm nếu confidence trên 0,5
C. Chỉ human xem sau khi side effect xảy ra
D. Không cần log vì human đã bấm nút

**Câu 295.** Docker image chứa API key trong layer cũ dù file cuối đã xóa. Cách phòng ngừa là gì?

A. Đưa key vào system prompt để dễ đọc
B. Inject secret lúc runtime và scan image/lịch sử build
C. Chỉ xóa biến môi trường sau deploy
D. Dùng image lớn hơn để che layer

**Câu 296.** Agent giữ conversation trong RAM instance và có load balancer. Tại sao request sau có thể mất context?

A. Load balancer tự xóa API key
B. LLM luôn quên context sau một token
C. Request có thể đi instance khác không có state
D. Redis chỉ dùng được cho batch

**Câu 297.** Agent gửi email rồi crash trước khi ghi kết quả. Retry từ đầu nguy hiểm vì sao?

A. Retry làm input token bằng không
B. Email luôn là action không thể log
C. Crash tự động rollback nhà cung cấp
D. Side effect có thể được gửi lần hai

**Câu 298.** P50 latency vẫn 2 giây nhưng P99 tăng từ 5 lên 12 giây. Tác động production nào cần chú ý?

A. Một nhóm user tail chậm đáng kể dù average/median ổn
B. Mọi request đều nhanh hơn trước
C. Cost chắc chắn giảm vì P50 không đổi
D. P99 chỉ phản ánh số token input

**Câu 299.** Structured logging log raw prompt chứa CCCD và dùng request_id làm metric label. Hai rủi ro là gì?

A. Recall thấp và chunk overlap thiếu
B. PII leakage và cardinality explosion
C. Docker cold start và BM25 sai
D. SLO cao và output token rẻ

**Câu 300.** Error rate bình thường nhưng P95 latency tăng đột ngột; trace cho thấy retrieval quét toàn index sau deploy. Fix nào đúng tầng?

A. Đổi temperature vì latency luôn do generation
B. Tăng model size để bù retrieval chậm
C. Khôi phục filter/index và thêm regression check cho query path
D. Xóa trace vì đã tìm được lỗi

<details>
<summary>Đáp án và giải thích Set K10</summary>

| Câu | Đáp án | Giải thích ngắn | Nguồn slide |
|---:|:---:|---|---|
| 291 | B | Private data, untrusted content và external side effect kết hợp làm blast radius lớn. | Day 11 — Lethal Trifecta |
| 292 | C | Filter đơn lẻ dễ bị bypass; defense in depth và tách data/instruction xử lý nội dung retrieved. | Day 11 — Indirect Injection Defense |
| 293 | D | Giới hạn action space và tách selector khỏi executor làm giảm quyền tự do nguy hiểm. | Day 11 — Design Patterns |
| 294 | A | Human-in-the-loop trước hành động không thể hoàn tác, cùng least privilege và audit log. | Day 11 — HITL |
| 295 | B | 12-Factor tách secret khỏi image; scan và secret manager giảm nguy cơ rò rỉ trong layer. | Day 12 — Secrets / Image Security |
| 296 | C | Stateful process khó scale ngang; external session store giải quyết affinity và durability. | Day 12 — Stateless Design |
| 297 | D | Idempotency key, durable execution hoặc saga giúp tránh lặp side effect. | Day 12 — Idempotency / Durable Execution |
| 298 | A | Percentile cao cho thấy tail latency; agent nhiều lượt làm xác suất gặp một request chậm tăng. | Day 13 — Percentiles |
| 299 | B | Raw PII cần redact/allowlist; label tự do như request_id tạo quá nhiều time series. | Day 13 — PII / Cardinality |
| 300 | C | Trace chỉ ra bottleneck retrieval; sửa hạ tầng/query và bổ sung eval/observability để tránh tái diễn. | Day 13 — Incident Debugging |

</details>

---

## Ghi chú về nguồn

Các nguồn trong cột **Nguồn slide** trỏ tới chủ đề/slide tương ứng trong tài liệu Day 1–13. Một số câu liên kết hai ngày để kiểm tra sự hiểu biết xuyên pipeline, ví dụ data → RAG → agent hoặc guardrails → deployment.

---
