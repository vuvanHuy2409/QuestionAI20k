const state = {
  token: localStorage.getItem("ai20k_quiz_token"),
  user: null,
  view: "dashboard",
  quizQuestions: [],
  quizAnswers: {},
  quizIndex: 0,
  quizMode: "normal",
  lastResult: null,
  toastTimer: null,
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
  const safe = escapeHTML(value || "Không có thuật ngữ mới cần tra cứu.");
  return safe.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function showToast(message, isError = false) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.toggle("is-error", isError);
  toast.classList.add("is-visible");
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

async function api(path, options = {}) {
  const headers = new Headers(options.headers || {});
  if (state.token) headers.set("Authorization", `Bearer ${state.token}`);
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const response = await fetch(path, { ...options, headers });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error || "Có lỗi kết nối.");
    error.status = response.status;
    throw error;
  }
  return payload;
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
  localStorage.removeItem("ai20k_quiz_token");
  $("#app-view").hidden = true;
  $("#login-view").hidden = false;
  $("#login-form").reset();
}

function setView(view) {
  state.view = view;
  const titles = {
    dashboard: ["Tổng quan học tập", "OVERVIEW"],
    workspace: ["Kho workspace", "WORKSPACE LIBRARY"],
    quiz: ["Bài kiểm tra", "QUIZ / 20 QUESTIONS"],
    result: ["Kết quả bài làm", "RESULTS"],
    wrong: ["Luyện lại câu sai", "SPACED REVIEW"],
  };
  const [title, breadcrumb] = titles[view] || titles.dashboard;
  $("#page-title").textContent = title;
  $("#breadcrumb-current").textContent = breadcrumb;
  $$(".view-section").forEach((section) => {
    section.hidden = section.id !== `${view}-section`;
  });
  $$(".nav-item[data-view]").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.view === view);
  });
  $$(".workspace-nav-item").forEach((item) => {
    item.classList.toggle("is-active", view === "workspace" && Number(item.dataset.workspaceId) === state.selectedWorkspaceId);
  });
}

async function loadDashboard() {
  try {
    const [stats, wrong, workspaces] = await Promise.all([
      api("/api/stats"),
      api("/api/wrong-questions"),
      api("/api/workspaces"),
    ]);
    renderStats(stats);
    renderWrongList(wrong.questions);
    renderWorkspaces(workspaces.workspaces);
  } catch (error) {
    if (error.status === 401) setLoggedOut();
    else showToast(error.message, true);
  }
}

function renderWorkspaces(workspaces) {
  state.workspaces = workspaces;
  if (!state.selectedWorkspaceId || !workspaces.some((workspace) => workspace.id === state.selectedWorkspaceId)) {
    const preferred = workspaces.find((workspace) => workspace.slug === "bai-thi-thi-khoa-2");
    state.selectedWorkspaceId = preferred?.id || workspaces[0]?.id || null;
  }

  const nav = $("#workspace-nav-list");
  nav.innerHTML = workspaces.length
    ? workspaces
        .map(
          (workspace) => `<button type="button" class="workspace-nav-item ${workspace.id === state.selectedWorkspaceId && state.view === "workspace" ? "is-active" : ""}" data-workspace-id="${workspace.id}">
            <span class="workspace-nav-dot"></span><span>${escapeHTML(workspace.name)}</span><small>${workspace.item_count}</small>
          </button>`,
        )
        .join("")
    : '<span class="workspace-nav-empty">Chưa có workspace</span>';

  const select = $("#workspace-select");
  select.innerHTML = workspaces
    .map((workspace) => `<option value="${workspace.id}">${escapeHTML(workspace.name)} · ${workspace.item_count} nội dung</option>`)
    .join("");
  select.value = state.selectedWorkspaceId ? String(state.selectedWorkspaceId) : "";
}

async function openWorkspace(workspaceId = state.selectedWorkspaceId) {
  const id = Number(workspaceId);
  if (!id) return;
  state.selectedWorkspaceId = id;
  setView("workspace");
  $("#workspace-items").innerHTML = '<div class="empty-state compact">Đang tải nội dung workspace...</div>';
  const workspace = state.workspaces.find((item) => item.id === id);
  if (workspace) renderWorkspaceSummary(workspace);
  try {
    const data = await api(`/api/workspace-items?workspace_id=${encodeURIComponent(id)}`);
    renderWorkspaceSummary(data.workspace);
    renderWorkspaceItems(data.items);
  } catch (error) {
    showToast(error.message, true);
    $("#workspace-items").innerHTML = '<div class="empty-state compact">Không tải được nội dung workspace.</div>';
  }
}

function renderWorkspaceSummary(workspace) {
  $("#workspace-title").textContent = workspace.name;
  $("#workspace-description").textContent = workspace.description || "Các câu hỏi và phần giải thích được lưu trong SQL.";
  $("#workspace-item-count").textContent = workspace.item_count || 0;
  const actions = $("#workspace-summary-actions");
  actions.innerHTML = workspace.mcq_count
    ? '<button type="button" class="button button-outline" data-action="start-workspace-quiz">Làm trắc nghiệm <span>→</span></button>'
    : '<span class="workspace-type-label">Q&amp;A / TỰ HỌC</span>';
}

function renderWorkspaceItems(items) {
  $("#workspace-items").innerHTML = items.length
    ? items
        .map((item, index) => {
          const isMcq = item.item_type === "mcq";
          const heading = item.item_type === "reference" ? "Tài liệu tham khảo" : `Câu ${index + 1}`;
          const options = isMcq
            ? `<div class="workspace-options">${Object.entries(item.options || {})
                .map(
                  ([letter, option]) => `<div class="workspace-option ${letter === item.correct_option ? "is-correct" : ""}"><span>${letter}</span><p>${escapeHTML(option)}</p></div>`,
                )
                .join("")}</div>`
            : "";
          const answer = isMcq && item.correct_option
            ? `${item.correct_option}. ${(item.options || {})[item.correct_option] || ""}`
            : item.answer;
          const explanation = item.explanation && item.explanation !== item.answer ? `<div class="workspace-block"><strong>Giải thích</strong><p class="workspace-text">${escapeHTML(item.explanation)}</p></div>` : "";
          const source = item.source_url
            ? `<a class="workspace-source" href="${escapeHTML(item.source_url)}" target="_blank" rel="noreferrer">Nguồn: ${escapeHTML(item.source_title || item.source_url)}</a>`
            : "";
          return `<article class="workspace-item panel ${isMcq ? "workspace-item-mcq" : "workspace-item-qa"}">
            <div class="workspace-item-head"><span class="question-number">${heading}</span><span class="topic-label">${escapeHTML(item.topic || "AI20K")}</span>${item.difficulty ? `<span class="difficulty-badge">${escapeHTML(item.difficulty)}</span>` : ""}</div>
            <h3>${escapeHTML(item.prompt)}</h3>
            ${options}
            ${answer ? `<div class="workspace-block workspace-answer"><strong>${isMcq ? "Đáp án đúng" : "Câu trả lời / giải thích"}</strong><p class="workspace-text">${escapeHTML(answer)}</p></div>` : ""}
            ${explanation}
            ${item.terms ? `<div class="workspace-block workspace-terms"><strong>Thuật ngữ</strong><p class="workspace-text">${formatTerms(item.terms)}</p></div>` : ""}
            ${source}
          </article>`;
        })
        .join("")
    : '<div class="empty-state compact">Workspace này chưa có nội dung.</div>';
}

function renderStats(data) {
  const summary = data.summary;
  $("#metric-attempts").textContent = summary.attempts;
  $("#metric-average").textContent = `${summary.average_score}%`;
  $("#metric-answered").textContent = summary.answered_questions;
  $("#metric-wrong").textContent = summary.pending_wrong;
  $("#review-card-count").textContent = summary.pending_wrong;
  $("#sidebar-wrong-count").textContent = summary.pending_wrong;
  $("#recent-list").innerHTML = data.recent.length
    ? data.recent
        .map((attempt) => {
          const percent = attempt.total ? Math.round((attempt.score / attempt.total) * 100) : 0;
          const date = new Date(attempt.completed_at).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
          });
          return `<div class="recent-row">
            <strong>${attempt.mode === "wrong" ? "Luyện câu sai" : "Bài kiểm tra tổng hợp"}</strong>
            <span>${date} · ${attempt.total} câu</span>
            <span class="${percent >= 70 ? "score-good" : "score-low"}">${attempt.score}/${attempt.total}</span>
          </div>`;
        })
        .join("")
    : '<div class="empty-state compact">Chưa có bài làm. Bắt đầu bài đầu tiên của bạn.</div>';
}

async function showWrongView() {
  setView("wrong");
  try {
    const data = await api("/api/wrong-questions");
    renderWrongList(data.questions);
  } catch (error) {
    showToast(error.message, true);
  }
}

function renderWrongList(questions) {
  $("#wrong-page-count").textContent = questions.reduce(
    (sum, question) => sum + question.pending_review_count,
    0,
  );
  $("#wrong-list").innerHTML = questions.length
    ? questions
        .map(
          (question) => `<div class="wrong-row">
            <div>
              <strong>Câu #${question.id}</strong>
              <span>${escapeHTML(question.prompt)}</span>
            </div>
            <span class="wrong-topic">${escapeHTML(question.topic)} · ${escapeHTML(question.difficulty)}</span>
            <span class="wrong-count">${question.pending_review_count} lượt chờ</span>
          </div>`,
        )
        .join("")
    : '<div class="empty-state compact">Chưa có câu sai. Làm một bài để tạo hàng đợi luyện tập.</div>';
}

async function startQuiz(mode = "normal", workspaceId = null) {
  try {
    showToast(mode === "wrong" ? "Đang tải hàng đợi câu sai..." : "Đang trộn 20 câu hỏi...");
    const query = new URLSearchParams({ mode, limit: "20" });
    if (workspaceId) query.set("workspace_id", String(workspaceId));
    const data = await api(`/api/questions?${query.toString()}`);
    if (!data.questions.length) {
      showToast("Hiện chưa có câu sai cần luyện lại.");
      showWrongView();
      return;
    }
    state.quizMode = mode;
    state.quizQuestions = data.questions;
    state.quizAnswers = {};
    state.quizIndex = 0;
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
  const isLast = position === total;

  $("#quiz-mode-label").textContent =
    state.quizMode === "wrong" ? "SPACED REVIEW / WRONG ANSWERS" : "MIXED SET / 20 QUESTIONS";
  $("#quiz-title").textContent = state.quizMode === "wrong" ? "Luyện lại câu sai" : "Bài kiểm tra tổng hợp";
  $("#question-number").textContent = `QUESTION ${String(position).padStart(2, "0")}`;
  $("#question-difficulty").textContent = question.difficulty;
  $("#question-topic").textContent = question.topic;
  $("#question-prompt").textContent = question.prompt;
  $("#quiz-progress-text").textContent = `${position} / ${total}`;
  $("#quiz-progress-bar").style.width = `${(position / total) * 100}%`;
  $("#previous-question").disabled = state.quizIndex === 0;
  $("#next-question").textContent = isLast ? "Nộp bài ✓" : "Câu tiếp theo →";
  $("#answered-indicator").textContent = selected ? `Đã chọn đáp án ${selected}` : "Chưa chọn đáp án";
  $("#answered-indicator").classList.toggle("is-done", Boolean(selected));
  $("#options-list").innerHTML = Object.entries(question.options)
    .map(
      ([letter, option]) => `<button type="button" class="option-button ${selected === letter ? "is-selected" : ""}" data-option="${letter}">
        <span class="option-letter">${letter}</span><span>${escapeHTML(option)}</span>
      </button>`,
    )
    .join("");
}

async function submitQuiz() {
  const submitButton = $("#next-question");
  submitButton.disabled = true;
  submitButton.textContent = "Đang lưu...";
  try {
    const data = await api("/api/attempts", {
      method: "POST",
      body: JSON.stringify({
        mode: state.quizMode,
        answers: state.quizQuestions.map((question) => ({
          question_id: question.id,
          selected_option: state.quizAnswers[question.id] || null,
        })),
      }),
    });
    state.lastResult = data;
    renderResult(data);
    setView("result");
    await loadDashboard();
  } catch (error) {
    showToast(error.message, true);
  } finally {
    submitButton.disabled = false;
    renderQuiz();
  }
}

function renderResult(data) {
  $("#result-score").textContent = `${data.score}/${data.total}`;
  const percent = data.total ? Math.round((data.score / data.total) * 100) : 0;
  $("#result-message").textContent =
    percent >= 80 ? "Rất tốt — nền tảng đang chắc dần." : percent >= 50 ? "Đã có tiến bộ — tiếp tục xử lý các câu sai." : "Hãy dùng hàng đợi luyện lại để củng cố nền tảng.";
  $("#result-detail").textContent = `${percent}% chính xác. Các câu sai được lưu riêng theo tài khoản của bạn.`;
  $("#result-pending").textContent = data.pending_wrong;
  $("#result-list").innerHTML = data.results
    .map((result, index) => {
      const question = result.question;
      const selectedText = result.selected_option
        ? `${result.selected_option}. ${question.options[result.selected_option]}`
        : "Chưa chọn đáp án";
      const correctText = `${question.correct_option}. ${question.options[question.correct_option]}`;
      return `<article class="result-item ${result.is_correct ? "is-correct" : "is-wrong"}">
        <div class="result-item-head"><strong>Câu ${index + 1} · ${escapeHTML(question.topic)}</strong><span class="result-status">${result.is_correct ? "Đúng" : "Sai"}</span></div>
        <p>${escapeHTML(question.prompt)}</p>
        <p class="result-explanation"><b>Bạn chọn:</b> ${escapeHTML(selectedText)}<br /><b>Đáp án đúng:</b> ${escapeHTML(correctText)}<br /><b>Giải thích:</b> ${escapeHTML(question.explanation)}</p>
        <p class="result-terms"><b>Thuật ngữ:</b> ${formatTerms(question.terms)}</p>
      </article>`;
    })
    .join("");
}

async function handleLogin(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const errorBox = $("#login-error");
  errorBox.hidden = true;
  try {
    const data = await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        display_name: form.get("display_name"),
        gate_answer: form.get("gate_answer"),
      }),
    });
    state.token = data.token;
    localStorage.setItem("ai20k_quiz_token", state.token);
    setLoggedIn(data.user);
  } catch (error) {
    errorBox.textContent = error.message;
    errorBox.hidden = false;
  }
}

async function handleLogout() {
  try {
    await api("/api/auth/logout", { method: "POST", body: "{}" });
  } catch {
    // The local token is cleared below even if the server is unavailable.
  }
  setLoggedOut();
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
    if (view === "dashboard") {
      setView("dashboard");
      loadDashboard();
    } else if (view === "workspace") {
      openWorkspace();
    } else if (view === "quiz") {
      startQuiz("normal");
    } else if (view === "wrong") {
      showWrongView();
    }
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;
  const action = actionButton.dataset.action;
  if (action === "start-normal") startQuiz("normal");
  else if (action === "start-wrong") startQuiz("wrong");
  else if (action === "start-workspace-quiz") startQuiz("normal", state.selectedWorkspaceId);
  else if (action === "exit-quiz") {
    setView("dashboard");
    loadDashboard();
  } else if (action === "previous-question" && state.quizIndex > 0) {
    state.quizIndex -= 1;
    renderQuiz();
  } else if (action === "next-question") {
    if (state.quizIndex < state.quizQuestions.length - 1) {
      state.quizIndex += 1;
      renderQuiz();
    } else {
      submitQuiz();
    }
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

$("#workspace-select").addEventListener("change", (event) => {
  openWorkspace(Number(event.currentTarget.value));
});

$("#login-form").addEventListener("submit", handleLogin);
$("#logout-button").addEventListener("click", handleLogout);

async function bootstrap() {
  if (!state.token) return;
  try {
    const data = await api("/api/me");
    setLoggedIn(data.user);
  } catch {
    setLoggedOut();
  }
}

bootstrap();
