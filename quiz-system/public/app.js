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
  localStorage.removeItem("ai20k_quiz_token");
  $("#app-view").hidden = true;
  $("#login-view").hidden = false;
  $("#login-form").reset();
}

function setView(view) {
  state.view = view;
  const titles = {
    dashboard: ["Tổng quan học tập", "OVERVIEW"],
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
}

async function loadDashboard() {
  try {
    const [stats, wrong] = await Promise.all([api("/api/stats"), api("/api/wrong-questions")]);
    renderStats(stats);
    renderWrongList(wrong.questions);
  } catch (error) {
    if (error.status === 401) setLoggedOut();
    else showToast(error.message, true);
  }
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

async function startQuiz(mode = "normal") {
  try {
    showToast(mode === "wrong" ? "Đang tải hàng đợi câu sai..." : "Đang trộn 20 câu hỏi...");
    const data = await api(`/api/questions?mode=${mode}&limit=20`);
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
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) {
    const view = viewButton.dataset.view;
    if (view === "dashboard") {
      setView("dashboard");
      loadDashboard();
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
