const API = "/api/index.php";
const LINKED_WORKSPACE_SLUG = "bai-thi-thi-khoa-2";
const PAYMENT_QR = Object.freeze({
  bankId: "MB",
  accountNo: "0339761204",
  accountName: "VU VAN HUY",
  displayName: "Vũ Văn Huy",
  amount: 5000,
  displayAmount: "5.000₫",
  contentDisplay: "đóng họ hệ thống",
  contentQr: "DONG HO HE THONG",
  template: "compact2",
});

const state = {
  token: localStorage.getItem("ai20k_php_mysql_token"),
  user: null,
  pack: null,
  view: "dashboard",
  quizQuestions: [],
  quizAnswers: {},
  quizIndex: 0,
  quizMode: "normal",
  selectedTopic: null,
  quizTopic: null,
  topics: [],
  toastTimer: null,
  pendingExplanationId: null,
  pendingExplanationTarget: null,
  pendingExplanationQuestion: null,
  explanationOpen: {},
  resultQuestions: {},
  workspaces: [],
  selectedWorkspaceId: null,
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatTerms(value) {
  return escapeHTML(value || "Không có thuật ngữ mới cần tra cứu.").replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function showToast(message, isError = false) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.toggle("is-error", isError);
  toast.classList.add("is-visible");
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

async function api(action, options = {}) {
  const query = options.query ? `&${new URLSearchParams(options.query).toString()}` : "";
  const headers = new Headers(options.headers || {});
  if (state.token) headers.set("Authorization", `Bearer ${state.token}`);
  if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  const response = await fetch(`${API}?action=${encodeURIComponent(action)}${query}`, { ...options, headers });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error || "Có lỗi kết nối với PHP backend.");
    error.status = response.status;
    error.payload = payload;
    throw error;
  }
  return payload;
}

function buildVietQrUrl() {
  const params = new URLSearchParams({
    amount: String(PAYMENT_QR.amount),
    addInfo: PAYMENT_QR.contentQr,
    accountName: PAYMENT_QR.accountName,
  });
  return `https://img.vietqr.io/image/${PAYMENT_QR.bankId}-${PAYMENT_QR.accountNo}-${PAYMENT_QR.template}.png?${params.toString()}`;
}

function openPaymentModal() {
  const image = $("#vietqr-image");
  image.src = buildVietQrUrl();
  image.alt = `VietQR MB Bank ${PAYMENT_QR.displayName} ${PAYMENT_QR.displayAmount}`;
  $("#qr-account-name").textContent = PAYMENT_QR.displayName;
  $("#qr-account-number").textContent = PAYMENT_QR.accountNo;
  $("#qr-amount").textContent = PAYMENT_QR.displayAmount;
  $("#qr-content").textContent = PAYMENT_QR.contentDisplay;
  $("#payment-error").hidden = true;
  $("#payment-modal").hidden = false;
}

function setLoggedIn(user) {
  state.user = user;
  $("#login-view").hidden = true;
  $("#app-view").hidden = false;
  $("#user-name").textContent = user.display_name;
  $("#user-initial").textContent = user.display_name.charAt(0).toUpperCase();
  loadDashboard();
}

function setLoggedOut() {
  state.token = null;
  state.user = null;
  state.workspaces = [];
  state.selectedWorkspaceId = null;
  localStorage.removeItem("ai20k_php_mysql_token");
  $("#app-view").hidden = true;
  $("#login-view").hidden = false;
}

function setView(view) {
  state.view = view;
  const titles = {
    dashboard: ["Tổng quan học tập", "OVERVIEW"],
    workspace: ["Kho workspace", "WORKSPACE LIBRARY"],
    quiz: ["Bài ôn tập", "QUIZ / FIXED SET"],
    result: ["Kết quả bài làm", "RESULTS"],
    wrong: ["Luyện lại câu sai", "SPACED REVIEW"],
    "linked-workspace": ["Bài thi khoá 2", "COURSE 2 EXAM"],
  };
  const [title, breadcrumb] = titles[view] || titles.dashboard;
  $("#page-title").textContent = title;
  $("#breadcrumb-current").textContent = breadcrumb;
  const sectionView = view === "linked-workspace" ? "workspace" : view;
  $$(".view-section").forEach((section) => {
    section.hidden = section.id !== `${sectionView}-section`;
  });
  $$(".nav-item[data-view]").forEach((item) => item.classList.toggle("is-active", item.dataset.view === view));
  const isWorkspaceView = view === "workspace" || view === "linked-workspace";
  $$(".workspace-nav-item").forEach((item) => item.classList.toggle("is-active", isWorkspaceView && view === "workspace" && Number(item.dataset.workspaceId) === state.selectedWorkspaceId));
  const linked = view === "linked-workspace";
  $("#workspace-eyebrow").textContent = linked ? "COURSE 2 EXAM / LINKED Q&A" : "WORKSPACE LIBRARY";
  $("#workspace-library-title").textContent = linked ? "Bài thi khoá 2" : "Kho học tập";
  $(".workspace-select-wrap").hidden = linked;
}

function renderPack(pack) {
  state.pack = pack;
  const packFields = {
    "#pack-title": pack.title,
    "#pack-description": pack.description,
    "#pack-detail-title": pack.title,
    "#pack-detail-text": pack.detail,
    "#pack-count": pack.question_count || pack.total_questions,
  };
  Object.entries(packFields).forEach(([selector, value]) => {
    const element = $(selector);
    if (element) element.textContent = value;
  });
}

function renderStats(data) {
  const summary = data.summary;
  $("#metric-attempts").textContent = summary.attempts;
  $("#metric-average").textContent = `${summary.average_score}%`;
  $("#metric-answered").textContent = summary.answered_questions;
  $("#metric-wrong").textContent = summary.pending_wrong;
  const reviewCardCount = $("#review-card-count");
  if (reviewCardCount) reviewCardCount.textContent = summary.pending_wrong;
  $("#sidebar-wrong-count").textContent = summary.pending_wrong;
  $("#recent-list").innerHTML = data.recent.length
    ? data.recent.map((attempt) => {
        const percent = attempt.total ? Math.round((attempt.score / attempt.total) * 100) : 0;
        const date = new Date(`${attempt.completed_at.replace(" ", "T")}+07:00`).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
        return `<div class="recent-row"><strong>${attempt.mode === "wrong" ? "Luyện câu sai" : "Bài ôn tập cố định"}</strong><span>${date} · ${attempt.total} câu</span><span class="${percent >= 70 ? "score-good" : "score-low"}">${attempt.score}/${attempt.total}</span></div>`;
      }).join("")
    : '<div class="empty-state compact">Chưa có bài làm. Bắt đầu bài đầu tiên của bạn.</div>';
}

function renderTopics(topics) {
  state.topics = topics;
  const select = $("#topic-select");
  if (!select) return;
  if (!state.selectedTopic || !topics.some((topic) => topic.topic === state.selectedTopic)) {
    state.selectedTopic = topics[0]?.topic || null;
  }
  select.innerHTML = topics.map((topic) => `<option value="${escapeHTML(topic.topic)}">${escapeHTML(topic.topic)} · ${topic.total} câu</option>`).join("");
  select.value = state.selectedTopic || "";
  updateTopicHint();
}

function updateTopicHint() {
  const hint = $("#topic-hint");
  if (!hint) return;
  const topic = state.topics.find((item) => item.topic === state.selectedTopic);
  hint.textContent = topic
    ? `${topic.total} câu · Dễ ${topic.easy_count} · Vừa ${topic.medium_count} · Khó ${topic.hard_count}`
    : "Chọn một nhánh để hệ thống bốc câu trong đúng chủ đề.";
}

function shuffleQuestions(questions) {
  const shuffled = [...questions];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function renderWrongList(questions) {
  $("#wrong-page-count").textContent = questions.reduce((sum, question) => sum + question.pending_count, 0);
  $("#wrong-list").innerHTML = questions.length
    ? questions.map((question) => `<div class="wrong-row"><div><strong>Câu #${question.id}</strong><span>${escapeHTML(question.prompt)}</span></div><span class="wrong-topic">${escapeHTML(question.topic)} · ${escapeHTML(question.difficulty)}</span><span class="wrong-count">${question.pending_count} lượt chờ</span></div>`).join("")
    : '<div class="empty-state compact">Chưa có câu sai. Làm một bài để tạo hàng đợi luyện tập.</div>';
}

async function loadDashboard() {
  try {
    const [pack, stats, wrong, topics, workspaces] = await Promise.all([api("pack"), api("stats"), api("wrong"), api("topics"), api("workspaces")]);
    renderPack(pack.pack);
    renderStats(stats);
    renderWrongList(wrong.questions);
    renderTopics(topics.topics);
    renderWorkspaces(workspaces.workspaces);
  } catch (error) {
    if (error.status === 401) setLoggedOut();
    else showToast(error.message, true);
  }
}

function renderWorkspaces(workspaces) {
  state.workspaces = workspaces;
  const libraryWorkspaces = workspaces.filter((workspace) => workspace.slug !== LINKED_WORKSPACE_SLUG);
  if (!state.selectedWorkspaceId || !libraryWorkspaces.some((workspace) => workspace.id === state.selectedWorkspaceId)) {
    state.selectedWorkspaceId = libraryWorkspaces[0]?.id || workspaces[0]?.id || null;
  }

  const nav = $("#workspace-nav-list");
  nav.innerHTML = libraryWorkspaces.length
    ? libraryWorkspaces.map((workspace) => `<button type="button" class="workspace-nav-item ${workspace.id === state.selectedWorkspaceId && state.view === "workspace" ? "is-active" : ""}" data-workspace-id="${workspace.id}"><span class="workspace-nav-dot"></span><span>${escapeHTML(workspace.name)}</span><small>${workspace.item_count}</small></button>`).join("")
    : '<span class="workspace-nav-empty">Chưa có workspace gốc</span>';

  const select = $("#workspace-select");
  select.innerHTML = libraryWorkspaces.map((workspace) => `<option value="${workspace.id}">${escapeHTML(workspace.name)} · ${workspace.item_count} nội dung</option>`).join("");
  select.value = state.selectedWorkspaceId ? String(state.selectedWorkspaceId) : "";
}

async function openWorkspace(workspaceId = state.selectedWorkspaceId, view = "workspace") {
  const id = Number(workspaceId);
  if (!id) return;
  state.selectedWorkspaceId = id;
  setView(view);
  $("#workspace-items").innerHTML = '<div class="empty-state compact">Đang tải nội dung workspace...</div>';
  const workspace = state.workspaces.find((item) => item.id === id);
  if (workspace) renderWorkspaceSummary(workspace);
  try {
    const data = await api("workspace-items", { query: { workspace_id: id } });
    renderWorkspaceSummary(data.workspace);
    renderWorkspaceItems(data.items);
  } catch (error) {
    showToast(error.message, true);
    $("#workspace-items").innerHTML = '<div class="empty-state compact">Không tải được nội dung workspace.</div>';
  }
}

function openLinkedWorkspace() {
  const workspace = state.workspaces.find((item) => item.slug === LINKED_WORKSPACE_SLUG);
  if (!workspace) {
    showToast("Chưa tìm thấy phần Bài thi khoá 2 trong SQL.", true);
    return;
  }
  openWorkspace(workspace.id, "linked-workspace");
}

function openWorkspaceLibrary() {
  const workspace = state.workspaces.find((item) => item.slug !== LINKED_WORKSPACE_SLUG);
  if (!workspace) {
    showToast("Chưa tìm thấy workspace câu hỏi gốc trong SQL.", true);
    return;
  }
  openWorkspace(workspace.id, "workspace");
}

function renderWorkspaceSummary(workspace) {
  $("#workspace-title").textContent = workspace.name;
  $("#workspace-description").textContent = workspace.description || "Các câu hỏi và phần giải thích được lưu trong SQL.";
  $("#workspace-item-count").textContent = workspace.item_count || 0;
  $("#workspace-summary-actions").innerHTML = workspace.mcq_count
    ? '<button type="button" class="button button-outline" data-action="start-workspace-quiz">Làm trắc nghiệm <span>→</span></button>'
    : '<span class="workspace-type-label">Q&amp;A / TỰ HỌC</span>';
}

function renderWorkspaceItems(items) {
  $("#workspace-items").innerHTML = items.length
    ? items.map((item, index) => {
        const isMcq = item.item_type === "mcq";
        const heading = item.item_type === "reference" ? "Tài liệu tham khảo" : `Câu ${index + 1}`;
        const options = isMcq
          ? `<div class="workspace-options">${Object.entries(item.options || {}).map(([letter, option]) => `<div class="workspace-option ${letter === item.correct_option ? "is-correct" : ""}"><span>${letter}</span><p>${escapeHTML(option)}</p></div>`).join("")}</div>`
          : "";
        const answer = isMcq && item.correct_option ? `${item.correct_option}. ${(item.options || {})[item.correct_option] || ""}` : item.answer;
        const explanation = item.explanation && item.explanation !== item.answer ? `<div class="workspace-block"><strong>Giải thích</strong><p class="workspace-text">${escapeHTML(item.explanation)}</p></div>` : "";
        const source = item.source_url ? `<a class="workspace-source" href="${escapeHTML(item.source_url)}" target="_blank" rel="noreferrer">Nguồn: ${escapeHTML(item.source_title || item.source_url)}</a>` : "";
        return `<article class="workspace-item panel ${isMcq ? "workspace-item-mcq" : "workspace-item-qa"}"><div class="workspace-item-head"><span class="question-number">${heading}</span><span class="topic-label">${escapeHTML(item.topic || "AI20K")}</span>${item.difficulty ? `<span class="difficulty-badge">${escapeHTML(item.difficulty)}</span>` : ""}</div><h3>${escapeHTML(item.prompt)}</h3>${options}${answer ? `<div class="workspace-block workspace-answer"><strong>${isMcq ? "Đáp án đúng" : "Câu trả lời / giải thích"}</strong><p class="workspace-text">${escapeHTML(answer)}</p></div>` : ""}${explanation}${item.terms ? `<div class="workspace-block workspace-terms"><strong>Thuật ngữ</strong><p class="workspace-text">${formatTerms(item.terms)}</p></div>` : ""}${source}</article>`;
      }).join("")
    : '<div class="empty-state compact">Workspace này chưa có nội dung.</div>';
}

async function showWrongView() {
  setView("wrong");
  try {
    const data = await api("wrong");
    renderWrongList(data.questions);
  } catch (error) {
    showToast(error.message, true);
  }
}

async function startQuiz(mode = "normal", topic = state.selectedTopic) {
  try {
    if (!topic) {
      const topicData = await api("topics");
      renderTopics(topicData.topics);
      topic = state.selectedTopic;
    }
    if (!topic) {
      showToast("Chưa có chủ đề để tạo bộ câu hỏi.", true);
      return;
    }
    showToast(mode === "wrong" ? `Đang tải câu sai trong chủ đề ${topic}...` : `Đang bốc 20 câu trong chủ đề ${topic}...`);
    const all = await api("questions");
    let questions = all.questions.filter((question) => question.topic === topic);
    if (mode === "wrong") {
      const wrong = await api("wrong");
      const ids = new Set(wrong.questions.map((question) => question.id));
      questions = questions.filter((question) => ids.has(question.id));
    }
    // Chỉ xáo trộn trong chủ đề đã chọn; không trộn lẫn toàn bộ ngân hàng.
    questions = shuffleQuestions(questions).slice(0, 20);
    if (!questions.length) {
      showToast(mode === "wrong" ? "Chủ đề này chưa có câu sai cần luyện lại." : "Chủ đề này chưa có câu hỏi.");
      if (mode === "wrong") showWrongView();
      return;
    }
    state.quizMode = mode;
    state.quizTopic = topic;
    state.quizQuestions = questions;
    state.quizAnswers = {};
    state.quizIndex = 0;
    state.explanationOpen = {};
    setView("quiz");
    renderQuiz();
  } catch (error) {
    showToast(error.message, true);
  }
}

function renderQuiz() {
  const question = state.quizQuestions[state.quizIndex];
  if (!question) return;
  const total = state.quizQuestions.length;
  const position = state.quizIndex + 1;
  const selected = state.quizAnswers[question.id] || null;
  $("#quiz-mode-label").textContent = state.quizMode === "wrong" ? `SPACED REVIEW / ${state.quizTopic}` : `TOPIC / ${state.quizTopic} / ${total} QUESTIONS`;
  $("#quiz-title").textContent = state.quizMode === "wrong" ? `Luyện lại · ${state.quizTopic}` : `Ôn tập · ${state.quizTopic}`;
  $("#question-number").textContent = `QUESTION ${String(position).padStart(2, "0")}`;
  $("#question-difficulty").textContent = question.difficulty;
  $("#question-topic").textContent = question.topic;
  $("#question-prompt").textContent = question.prompt;
  $("#quiz-progress-text").textContent = `${position} / ${total}`;
  $("#quiz-progress-bar").style.width = `${(position / total) * 100}%`;
  $("#previous-question").disabled = state.quizIndex === 0;
  $("#next-question").textContent = position === total ? "Nộp bài ✓" : "Câu tiếp theo →";
  $("#answered-indicator").textContent = selected ? `Đã chọn đáp án ${selected}` : "Chưa chọn đáp án";
  $("#answered-indicator").classList.toggle("is-done", Boolean(selected));
  $("#options-list").innerHTML = Object.entries(question.options).map(([letter, option]) => `<button type="button" class="option-button ${selected === letter ? "is-selected" : ""}" data-option="${letter}"><span class="option-letter">${letter}</span><span>${escapeHTML(option)}</span></button>`).join("");

  const liveExplanation = $("#live-explanation");
  const liveButton = $("#live-explanation-button");
  const liveContent = $("#live-explanation-content");
  const isExplanationOpen = Boolean(state.explanationOpen[question.id]);
  liveExplanation.hidden = false;
  liveButton.dataset.questionId = String(question.id);
  liveButton.hidden = isExplanationOpen;
  liveButton.disabled = isExplanationOpen;
  $("#live-explanation-status").textContent = isExplanationOpen ? "ĐÃ MỞ" : "SẴN SÀNG";
  $("#live-explanation-lock-copy").textContent = isExplanationOpen
    ? "Phần giải thích đang hiển thị bên phải câu hỏi này."
    : "Mở phần giải thích ngay để xem lý do và nghĩa của thuật ngữ tiếng Anh.";
  if (isExplanationOpen) {
    renderExplanation(question, liveContent);
  } else {
    liveContent.hidden = true;
    liveContent.innerHTML = "";
  }
}

async function submitQuiz() {
  const button = $("#next-question");
  button.disabled = true;
  button.textContent = "Đang lưu...";
  try {
    const result = await api("submit", {
      method: "POST",
      body: JSON.stringify({ mode: state.quizMode, answers: state.quizQuestions.map((question) => ({ question_id: question.id, selected_option: state.quizAnswers[question.id] || null })) }),
    });
    renderResult(result);
    setView("result");
    await loadDashboard();
  } catch (error) {
    showToast(error.message, true);
  } finally {
    button.disabled = false;
    renderQuiz();
  }
}

function renderResult(data) {
  state.resultQuestions = Object.fromEntries(data.results.map((result) => [result.question.id, result.question]));
  $("#result-score").textContent = `${data.score}/${data.total}`;
  const percent = data.total ? Math.round((data.score / data.total) * 100) : 0;
  $("#result-message").textContent = percent >= 80 ? "Rất tốt — nền tảng đang chắc dần." : percent >= 50 ? "Đã có tiến bộ — tiếp tục xử lý các câu sai." : "Hãy dùng hàng đợi luyện lại để củng cố nền tảng.";
  $("#result-detail").textContent = `${percent}% chính xác. Bấm “Mở giải thích” ở từng câu để xem phân tích.`;
  $("#result-pending").textContent = data.pending_wrong;
  $("#result-list").innerHTML = data.results.map((result, index) => {
    const question = result.question;
    const selectedText = result.selected_option ? `${result.selected_option}. ${question.options[result.selected_option]}` : "Chưa chọn đáp án";
    const correctText = `${question.correct_option}. ${question.options[question.correct_option]}`;
    return `<article class="result-item ${result.is_correct ? "is-correct" : "is-wrong"}"><div class="result-item-head"><strong>Câu ${index + 1} · ${escapeHTML(question.topic)}</strong><span class="result-status">${result.is_correct ? "Đúng" : "Sai"}</span></div><p>${escapeHTML(question.prompt)}</p><p class="result-explanation"><b>Bạn chọn:</b> ${escapeHTML(selectedText)}<br /><b>Đáp án đúng:</b> ${escapeHTML(correctText)}</p><button class="button button-outline explanation-toggle" data-action="open-explanation" data-question-id="${question.id}">Mở giải thích bên dưới <span>↓</span></button><div class="explanation-panel" data-explanation-id="${question.id}" hidden></div></article>`;
  }).join("");
}

function renderExplanation(question, target) {
  const correct = question.correct_option && question.options?.[question.correct_option]
    ? `<p><strong>Đáp án đúng:</strong> ${escapeHTML(question.correct_option)}. ${escapeHTML(question.options[question.correct_option])}</p>`
    : "";
  target.innerHTML = `${correct}<p><strong>Giải thích:</strong> ${escapeHTML(question.explanation)}</p><p><strong>Thuật ngữ tiếng Anh:</strong> ${formatTerms(question.terms)}</p>`;
  target.hidden = false;
}

function markLiveExplanationOpen() {
  $("#live-explanation-button").hidden = true;
  $("#live-explanation-button").disabled = true;
  $("#live-explanation-status").textContent = "ĐÃ MỞ";
  $("#live-explanation-lock-copy").textContent = "Phần giải thích đang hiển thị bên phải câu hỏi này.";
}

async function openExplanation(questionId, explicitTarget = null) {
  const target = explicitTarget || document.querySelector(`[data-explanation-id="${questionId}"]`);
  if (!target) return;
  state.pendingExplanationQuestion = state.resultQuestions[questionId]
    || state.quizQuestions.find((question) => question.id === questionId)
    || null;
  try {
    const data = await api("explanation", { query: { question_id: questionId } });
    renderExplanation(data.question, target);
    state.explanationOpen[questionId] = true;
    if (target.id === "live-explanation-content") markLiveExplanationOpen();
  } catch (error) {
    if (error.status === 402 && error.payload?.requires_demo_payment) {
      state.pendingExplanationId = questionId;
      state.pendingExplanationTarget = target;
      openPaymentModal();
    } else {
      showToast(error.message, true);
    }
  }
}

async function confirmDemoPayment() {
  if (!state.pendingExplanationId) return;
  const button = $("#demo-payment-button");
  button.disabled = true;
  button.textContent = "Đang mở demo...";
  try {
    const data = await api("demo-payment", { method: "POST", body: JSON.stringify({ question_id: state.pendingExplanationId }) });
    renderExplanation(data.question, state.pendingExplanationTarget);
    state.explanationOpen[state.pendingExplanationId] = true;
    if (state.pendingExplanationTarget?.id === "live-explanation-content") markLiveExplanationOpen();
    $("#payment-modal").hidden = true;
    showToast(data.payment_demo_disabled ? "Payment demo đã tự tắt; giải thích mở bình thường." : "Đã mở phần giải thích demo.");
  } catch (error) {
    $("#payment-error").textContent = error.message;
    $("#payment-error").hidden = false;
  } finally {
    button.disabled = false;
    button.innerHTML = "Mở giải thích (demo) <span>→</span>";
  }
}

function skipPayment() {
  if (!state.pendingExplanationId || !state.pendingExplanationTarget || !state.pendingExplanationQuestion) {
    $("#payment-modal").hidden = true;
    return;
  }
  renderExplanation(state.pendingExplanationQuestion, state.pendingExplanationTarget);
  state.explanationOpen[state.pendingExplanationId] = true;
  if (state.pendingExplanationTarget.id === "live-explanation-content") markLiveExplanationOpen();
  $("#payment-modal").hidden = true;
  showToast("Đã bỏ qua payment demo và mở phần giải thích.");
}

async function handleLogin(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const errorBox = $("#login-error");
  errorBox.hidden = true;
  try {
    const data = await api("login", { method: "POST", body: JSON.stringify({ username: form.get("username"), password: form.get("password") }) });
    state.token = data.token;
    localStorage.setItem("ai20k_php_mysql_token", state.token);
    setLoggedIn(data.user);
  } catch (error) {
    errorBox.textContent = error.message;
    errorBox.hidden = false;
  }
}

async function handleRegister(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const errorBox = $("#register-error");
  errorBox.hidden = true;
  try {
    const data = await api("register", { method: "POST", body: JSON.stringify({ display_name: form.get("display_name"), username: form.get("username"), password: form.get("password") }) });
    state.token = data.token;
    localStorage.setItem("ai20k_php_mysql_token", state.token);
    setLoggedIn(data.user);
  } catch (error) {
    errorBox.textContent = error.message;
    errorBox.hidden = false;
  }
}

async function handleLogout() {
  try { await api("logout", { method: "POST", body: "{}" }); } catch { /* clear local session below */ }
  setLoggedOut();
}

function toggleAuthMode() {
  const register = $("#register-form").hidden;
  $("#register-form").hidden = !register;
  $("#login-form").hidden = register;
  $("#auth-title").textContent = register ? "Tạo tài khoản" : "Đăng nhập";
  $("#auth-subtitle").textContent = register ? "Tạo tài khoản để lưu riêng điểm số và câu sai." : "Đăng nhập để mở bộ câu hỏi và lưu tiến độ cá nhân.";
  $("#auth-switch-copy").textContent = register ? "Đã có tài khoản?" : "Chưa có tài khoản?";
  $("#auth-switch-button").textContent = register ? "Đăng nhập" : "Tạo tài khoản";
}

document.addEventListener("click", (event) => {
  const workspaceButton = event.target.closest("[data-workspace-id]");
  if (workspaceButton) {
    openWorkspace(Number(workspaceButton.dataset.workspaceId));
    return;
  }

  const viewButton = event.target.closest("[data-view]");
  if (viewButton) {
    const view = viewButton.dataset.view;
    if (view === "dashboard") { setView("dashboard"); loadDashboard(); }
    else if (view === "workspace") openWorkspaceLibrary();
    else if (view === "linked-workspace") openLinkedWorkspace();
    else if (view === "quiz") startQuiz("normal", state.selectedTopic);
    else if (view === "wrong") showWrongView();
    return;
  }
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;
  const action = actionButton.dataset.action;
  if (action === "start-normal") startQuiz("normal", state.selectedTopic);
  else if (action === "start-wrong") startQuiz("wrong", state.selectedTopic);
  else if (action === "start-workspace-quiz") startQuiz("normal", state.selectedTopic);
  else if (action === "exit-quiz") { setView("dashboard"); loadDashboard(); }
  else if (action === "open-explanation") openExplanation(Number(actionButton.dataset.questionId));
  else if (action === "open-live-explanation") openExplanation(Number(actionButton.dataset.questionId), $("#live-explanation-content"));
  else if (action === "previous-question" && state.quizIndex > 0) { state.quizIndex -= 1; renderQuiz(); }
  else if (action === "next-question") {
    if (state.quizIndex < state.quizQuestions.length - 1) { state.quizIndex += 1; renderQuiz(); }
    else submitQuiz();
  }
});

$("#options-list").addEventListener("click", (event) => {
  const option = event.target.closest("[data-option]");
  if (!option) return;
  const question = state.quizQuestions[state.quizIndex];
  if (!question) return;
  state.quizAnswers[question.id] = option.dataset.option;
  renderQuiz();
});

$("#topic-select").addEventListener("change", (event) => {
  state.selectedTopic = event.currentTarget.value;
  updateTopicHint();
});

$("#workspace-select").addEventListener("change", (event) => {
  openWorkspace(Number(event.currentTarget.value));
});

$("#login-form").addEventListener("submit", handleLogin);
$("#register-form").addEventListener("submit", handleRegister);
$("#auth-switch-button").addEventListener("click", toggleAuthMode);
$("#logout-button").addEventListener("click", handleLogout);
$("#close-payment").addEventListener("click", () => { $("#payment-modal").hidden = true; });
$("#demo-payment-button").addEventListener("click", confirmDemoPayment);
$("#skip-payment").addEventListener("click", skipPayment);

async function bootstrap() {
  if (!state.token) return;
  try {
    const data = await api("me");
    setLoggedIn(data.user);
  } catch {
    setLoggedOut();
  }
}

bootstrap();
