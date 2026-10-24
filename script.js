// ---- Question bank: replace with your own CAPS-aligned questions ----
// Accepted field names are flexible (see normalize() below):
//   question: q | question
//   choices:  options | choices | answers
//   correct:  answer | correct | correctAnswer  (index 0-2, or the answer text)
const QUESTIONS = {
  9: [
    // Algebra
    { q: "Solve: 2x + 6 = 14", options: ["x = 3", "x = 4", "x = 5"], answer: 1 },
    { q: "What is 3^2 + 4^2?", options: ["25", "49", "14"], answer: 0 },
    { q: "Simplify: 5a - 2a", options: ["7a", "3a", "3"], answer: 1 },
    { q: "Solve: 3x - 5 = 10", options: ["x = 3", "x = 5", "x = 15"], answer: 1 },
    { q: "Expand: 3(x + 4)", options: ["3x + 4", "7x", "3x + 12"], answer: 2 },
    { q: "Factorise: 6x + 12", options: ["6(x + 2)", "3(x + 4)", "6(x + 12)"], answer: 0 },
    { q: "Simplify: 2a + 3a - a", options: ["4a", "5a", "6a"], answer: 0 },
    { q: "Solve: x/3 = 5", options: ["x = 8", "x = 15", "x = 2"], answer: 1 },
    { q: "What is the value of 2^4?", options: ["8", "12", "16"], answer: 2 },
    { q: "Factorise: x^2 - 16", options: ["(x - 4)(x + 4)", "(x - 8)(x + 2)", "(x - 4)^2"], answer: 0 },

    // Exponents and number patterns
    { q: "Simplify: 2^3 × 2^2", options: ["2^6", "2^5", "4^5"], answer: 1 },
    { q: "What is the square root of 144?", options: ["12", "14", "72"], answer: 0 },
    { q: "What is the next term: 3, 7, 11, 15, ...?", options: ["18", "19", "20"], answer: 1 },
    { q: "Write 0.75 as a fraction in simplest form.", options: ["3/4", "1/4", "7/5"], answer: 0 },
    { q: "Calculate: -6 + 10", options: ["-16", "16", "4"], answer: 2 },

    // Functions and graphs
    { q: "What is the gradient of y = 2x + 5?", options: ["5", "2", "7"], answer: 1 },
    { q: "If y = 3x, find y when x = 4.", options: ["7", "12", "16"], answer: 1 },
    { q: "Which point lies on y = x + 2?", options: ["(2, 4)", "(2, 5)", "(3, 4)"], answer: 0 },
    { q: "What is the y-intercept of y = 4x - 3?", options: ["4", "-3", "3"], answer: 1 },

    // Geometry and measurement
    { q: "What is the sum of angles in a triangle?", options: ["90 degrees", "180 degrees", "360 degrees"], answer: 1 },
    { q: "Find the area of a rectangle 8 cm by 5 cm.", options: ["26 cm^2", "40 cm^2", "13 cm^2"], answer: 1 },
    { q: "Find the perimeter of a square with side 6 cm.", options: ["24 cm", "36 cm", "12 cm"], answer: 0 },
    { q: "A straight-line angle is equal to?", options: ["90 degrees", "180 degrees", "360 degrees"], answer: 1 },
    { q: "Find the circumference of a circle with radius 7 cm. Use pi = 22/7.", options: ["22 cm", "44 cm", "154 cm"], answer: 1 },

    // Statistics and probability
    { q: "Find the mean of 2, 4, 6, 8.", options: ["4", "5", "6"], answer: 1 },
    { q: "Find the median of 3, 7, 9, 11, 15.", options: ["7", "9", "11"], answer: 1 },
    { q: "What is the probability of getting heads on a fair coin?", options: ["1/4", "1/2", "1"], answer: 1 },
    { q: "Find the mode of 2, 3, 3, 4, 5.", options: ["2", "3", "4"], answer: 1 }
  ],

  10: [
    // Algebra
    { q: "Factorise: x^2 - 9", options: ["(x-3)(x+3)", "(x-9)(x+1)", "(x-3)^2"], answer: 0 },
    { q: "Solve x^2 = 49 (positive root).", options: ["5", "7", "9"], answer: 1 },
    { q: "What is the gradient of y = 3x + 2?", options: ["2", "3", "5"], answer: 1 },
    { q: "Solve: 2x - 7 = 9", options: ["x = 1", "x = 8", "x = 16"], answer: 1 },
    { q: "Expand: (x + 3)(x + 2)", options: ["x^2 + 5x + 6", "x^2 + 6", "x^2 + x + 6"], answer: 0 },
    { q: "Factorise: x^2 + 5x + 6", options: ["(x + 1)(x + 6)", "(x + 2)(x + 3)", "(x - 2)(x - 3)"], answer: 1 },
    { q: "Solve: x^2 - 16 = 0", options: ["x = 4 only", "x = -4 only", "x = 4 or x = -4"], answer: 2 },
    { q: "Simplify: (3x^2)(2x^3)", options: ["6x^5", "5x^6", "6x^6"], answer: 0 },
    { q: "Simplify: (x^6)/(x^2), where x is nonzero.", options: ["x^3", "x^4", "x^8"], answer: 1 },
    { q: "Solve: 5(x - 2) = 20", options: ["x = 2", "x = 4", "x = 6"], answer: 2 },

    // Quadratic equations and patterns
    { q: "Solve: x^2 - 5x + 6 = 0", options: ["x = 2 or 3", "x = -2 or -3", "x = 1 or 6"], answer: 0 },
    { q: "What is the discriminant of ax^2 + bx + c = 0?", options: ["b^2 + 4ac", "b^2 - 4ac", "2a - b"], answer: 1 },
    { q: "Find the next term: 2, 6, 12, 20, ...", options: ["28", "30", "32"], answer: 1 },
    { q: "What is the common difference in 5, 9, 13, 17, ...?", options: ["3", "4", "5"], answer: 1 },

    // Functions and graphs
    { q: "Find y when x = 3 in y = x^2 - 1.", options: ["6", "8", "9"], answer: 1 },
    { q: "What is the y-intercept of y = 2x + 7?", options: ["2", "7", "-7"], answer: 1 },
    { q: "Which equation represents a straight line?", options: ["y = 2x + 1", "y = x^2", "y = 1/x"], answer: 0 },
    { q: "If f(x) = 2x - 3, calculate f(5).", options: ["7", "10", "13"], answer: 0 },
    { q: "What is the gradient between (1, 2) and (3, 6)?", options: ["2", "3", "4"], answer: 0 },

    // Geometry and trigonometry
    { q: "What is the sum of the interior angles of a quadrilateral?", options: ["180 degrees", "270 degrees", "360 degrees"], answer: 2 },
    { q: "A right-angled triangle has sides 3 and 4 as its shorter sides. Find the hypotenuse.", options: ["5", "6", "7"], answer: 0 },
    { q: "What is sin(30 degrees)?", options: ["1", "1/2", "sqrt(3)/2"], answer: 1 },
    { q: "What is cos(60 degrees)?", options: ["1/2", "sqrt(3)/2", "1"], answer: 0 },
    { q: "Two angles of a triangle are 50 and 60 degrees. Find the third angle.", options: ["60 degrees", "70 degrees", "80 degrees"], answer: 1 },
    { q: "Find the area of a triangle with base 10 cm and height 6 cm.", options: ["60 cm^2", "30 cm^2", "16 cm^2"], answer: 1 },
    { q: "What is the equation of a circle with centre at the origin and radius 5?", options: ["x^2 + y^2 = 25", "x + y = 5", "x^2 - y^2 = 25"], answer: 0 },

    // Finance, statistics and probability
    { q: "An item costs R200 and has a 10% discount. What is the sale price?", options: ["R180", "R190", "R220"], answer: 0 },
    { q: "Calculate simple interest on R1,000 at 5% per year for 2 years.", options: ["R50", "R100", "R150"], answer: 1 },
    { q: "Find the mean of 4, 6, 8, 10, 12.", options: ["6", "8", "10"], answer: 1 },
    { q: "A bag contains 3 red and 2 blue balls. What is P(blue)?", options: ["2/5", "3/5", "1/2"], answer: 0 },
    { q: "Find the interquartile range if Q1 = 10 and Q3 = 18.", options: ["8", "14", "28"], answer: 0 }
  ]
};

let playerName = "Player";
let grade = null;
let qIndex = 0;
let score = 0;
let locked = false;

const $ = (id) => document.getElementById(id);

// Accepts different field names and text-or-index answers, so no value is undefined.
function normalize(item) {
  const options = item.options || item.choices || item.answers || [];
  let answer = item.answer ?? item.correct ?? item.correctAnswer;
  if (typeof answer === "string") {
    const idx = options.indexOf(answer);
    answer = idx >= 0 ? idx : Number(answer);
  }
  return { q: item.q || item.question || "", options, answer };
}

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
  if (!list || qIndex >= list.length) return finish();

  const item = normalize(list[qIndex]);
  locked = false;
  $("welcomeText").setAttribute("value", "Grade " + grade + " - Question " + (qIndex + 1) + " of " + list.length);
  $("questionText").setAttribute("value", item.q);
  show($("questionText"), true);

  for (let i = 0; i < 3; i++) {
    const box = $("option" + (i + 1));
    if (item.options[i] !== undefined) {
      $("text" + (i + 1)).setAttribute("value", String(item.options[i]));
      show(box, true);
    } else {
      show(box, false);
    }
  }
  refreshRaycasters();
}

function selectAnswer(i) {
  if (locked) return;
  locked = true;

  const item = normalize(QUESTIONS[grade][qIndex]);
  const correct = i === item.answer;
  if (correct) score++;

  const right = item.options[item.answer];
  $("questionText").setAttribute(
    "value",
    correct ? "Correct!" : "Not quite." + (right !== undefined ? " Answer: " + right : "")
  );

  setTimeout(() => {
    qIndex++;
    showQuestion();
  }, 1500);
}

function finish() {
  [1, 2, 3].forEach((n) => show($("option" + n), false));
  $("welcomeText").setAttribute("value", "Well done, " + playerName + "!");
  $("questionText").setAttribute("value", "Score: " + score + " / " + (QUESTIONS[grade] || []).length);

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
