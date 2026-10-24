// ---- Question bank: replace with your own CAPS-aligned questions ----
const QUESTIONS = {
  9: [
    { q: "Solve: 2x + 6 = 14", options: ["x = 3", "x = 4", "x = 5"], answer: 1 },
    { q: "What is 3^2 + 4^2 ?", options: ["25", "49", "14"], answer: 0 },
    { q: "Simplify: 5a - 2a", options: ["7a", "3a", "3"], answer: 1 }
  ],
  10: [
    { q: "Factorise: x^2 - 9", options: ["(x-3)(x+3)", "(x-9)(x+1)", "(x-3)^2"], answer: 0 },
    { q: "Solve x^2 = 49 (positive root)", options: ["5", "7", "9"], answer: 1 },
    { q: "Gradient of y = 3x + 2 ?", options: ["2", "3", "5"], answer: 1 }
  ]
};

let playerName = "Player";
let grade = null;
let qIndex = 0;
let score = 0;
let locked = false;

const $ = (id) => document.getElementById(id);

// Show/hide a 3D entity AND make it (un)clickable.
// Hidden buttons must not stay in the raycaster list, or they keep stealing clicks.
function show(el, on) {
  el.setAttribute("visible", on);
  el.classList.toggle("clickable", on && el.dataset.button === "true");
}

// Tell every raycaster to rebuild its list of clickable objects.
function refreshRaycasters() {
  document.querySelectorAll("[raycaster]").forEach((e) => {
    const rc = e.components && e.components.raycaster;
    if (rc) rc.refreshObjects();
  });
}

// ---- Flow ----
function startApp() {
  playerName = $("playerNameInput").value.trim() || "Player";
  $("nameInputContainer").style.display = "none";
  $("welcomeText").setAttribute("value", "Welcome, " + playerName + "!");
  $("enter-vr-btn").style.display = "block";
}

function startGame() {
  show($("startButton"), false);
  show($("questionText"), false);
  $("welcomeText").setAttribute("value", "Hi " + playerName + ", pick your grade");
  show($("grade9Btn"), true);
  show($("grade10Btn"), true);
  refreshRaycasters();
}

function selectGrade(g) {
  grade = g;
  qIndex = 0;
  score = 0;
  show($("grade9Btn"), false);
  show($("grade10Btn"), false);
  showQuestion();
}

function showQuestion() {
  const list = QUESTIONS[grade];
  if (qIndex >= list.length) return finish();

  const item = list[qIndex];
  locked = false;
  $("welcomeText").setAttribute("value", "Grade " + grade + " - Question " + (qIndex + 1) + " of " + list.length);
  $("questionText").setAttribute("value", item.q);
  show($("questionText"), true);

  item.options.forEach((opt, i) => {
    $("text" + (i + 1)).setAttribute("value", opt);
    show($("option" + (i + 1)), true);
  });
  refreshRaycasters();
}

function selectAnswer(i) {
  if (locked) return;
  locked = true;

  const item = QUESTIONS[grade][qIndex];
  const correct = i === item.answer;
  if (correct) score++;

  $("questionText").setAttribute(
    "value",
    correct ? "Correct!" : "Not quite. Answer: " + item.options[item.answer]
  );

  setTimeout(() => {
    qIndex++;
    showQuestion();
  }, 1500);
}

function finish() {
  [1, 2, 3].forEach((n) => show($("option" + n), false));
  $("welcomeText").setAttribute("value", "Well done, " + playerName + "!");
  $("questionText").setAttribute("value", "Score: " + score + " / " + QUESTIONS[grade].length);

  const start = $("startButton");
  start.querySelector("a-text").setAttribute("value", "Play again");
  show(start, true);
  refreshRaycasters();
}

// ---- Wire up the buttons (replaces the inline onclick attributes) ----
document.addEventListener("DOMContentLoaded", () => {
  const buttons = {
    startButton: () => startGame(),
    grade9Btn: () => selectGrade(9),
    grade10Btn: () => selectGrade(10),
    option1: () => selectAnswer(0),
    option2: () => selectAnswer(1),
    option3: () => selectAnswer(2)
  };

  Object.keys(buttons).forEach((id) => {
    const el = $(id);
    el.dataset.button = "true";
    el.addEventListener("click", buttons[id]);
    // simple hover feedback (works for mouse and gaze)
    el.addEventListener("mouseenter", () => el.setAttribute("scale", "1.1 1.1 1.1"));
    el.addEventListener("mouseleave", () => el.setAttribute("scale", "1 1 1"));
  });

  $("playerNameInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") startApp();
  });

  $("enter-vr-btn").addEventListener("click", () => {
    document.querySelector("a-scene").enterVR();
  });
});
