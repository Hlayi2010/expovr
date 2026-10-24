// ---- Question bank: replace with your own CAPS-aligned questions ----
const QUESTIONS = {
  9: [
    { q: "Expand: 3(x+2)", options: ["3x+6", "3x+2", "6x+2"], correctIndex: 0 },
  { q: "x² × x³ = ?", options: ["x^5", "x^6", "x^9"], correctIndex: 0 },
  { q: "Solve: 4x = 20", options: [5, 4, 6], correctIndex: 0 },
  { q: "Factorise: 5x+10", options: ["5(x+2)", "5x(2)", "10(x+1)"], correctIndex: 0 },
  { q: "Solve: 2x-4=6", options: [5, 4, 3], correctIndex: 0 },
  { q: "(x²)³ = ?", options: ["x^6", "x^5", "x^9"], correctIndex: 0 },
  { q: "10³ = ?", options: [1000, 100, 30], correctIndex: 0 },
  { q: "Solve: x/5=3", options: [15, 10, 8], correctIndex: 0 },
  { q: "5² + 3² = ?", options: [34, 25, 9], correctIndex: 0 },
  { q: "(-3)² = ?", options: [9, -9, 6], correctIndex: 0 },
  ],
  10: [
     { q: "5² = ?", options: [10, 25, 15], correctIndex: 1 },
  { q: "√144 = ?", options: [10, 12, 14], correctIndex: 1 },
  { q: "Solve: 3x = 18", options: [6, 5, 9], correctIndex: 0 },
  { q: "Solve: 2x + 4 = 10", options: [2, 3, 4], correctIndex: 1 },
  { q: "(-5) + 8 = ?", options: [3, -3, 13], correctIndex: 0 },
  { q: "7³ = ?", options: [343, 49, 21], correctIndex: 0 },
  { q: "Convert 3/4 to percentage", options: ["75%", "50%", "25%"], correctIndex: 0 },
  { q: "0.6 as fraction?", options: ["3/5", "6/10", "2/3"], correctIndex: 0 },
  { q: "Solve: 5x = 45", options: [9, 8, 10], correctIndex: 0 },
  { q: "Value of 10²?", options: [100, 20, 200], correctIndex: 0 },

    { q: "Sum of angles in triangle?", options: ["180°", "360°", "90°"], correctIndex: 0 }
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
