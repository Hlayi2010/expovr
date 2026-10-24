let selectedGrade = null;
let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let playerName = "Friend";
let scoreboard = null;
let correctStreak = 0;

const questionsByGrade = {
 
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

   
  ]
};

function shuffle(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function startApp() {
  const input = document.getElementById("playerNameInput").value;
  if (input.trim() !== "") playerName = input.trim();
  document.getElementById("nameInputContainer").style.display = "none";
  document.getElementById('enter-vr-btn').style.display = 'block';

  speak(`Welcome ${playerName}! Press start to begin.`);
  document.querySelector('#welcomeText').setAttribute('value', `Welcome to VR Math, ${playerName}!`);
}

function speak(text) {
  window.speechSynthesis.cancel();
  const msg = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(msg);
}

function startGame() {
  if (selectedGrade !== null) return;

  speak(`Welcome ${playerName}, please choose your grade.`);
  document.querySelector('#startButton').setAttribute('visible', 'false');
  document.querySelector('#welcomeText').setAttribute('visible', 'false');
  document.querySelector('#grade10Btn').setAttribute('visible', 'true');
}

function selectGrade(grade) {
  if (selectedGrade !== null) return;

  selectedGrade = grade;
  currentQuestionIndex = 0;
  score = 0;
  correctStreak = 0;

  questions = shuffle(questionsByGrade[grade]).map(q => {
    const correctAnswer = q.options[q.correctIndex];
    const shuffledOptions = shuffle([...q.options]);
    return {
      q: q.q.replace("/", " / "),
      options: shuffledOptions,
      correctAnswer: correctAnswer,
      correctIndex: shuffledOptions.indexOf(correctAnswer)
    };
  });

  speak(`You selected Grade ${grade}, ${playerName}. Let's begin.`);
  document.querySelector('#grade8Btn').setAttribute('visible', 'false');
  document.querySelector('#grade9Btn').setAttribute('visible', 'false');

  initScoreboard();
  showQuestion();
}

function initScoreboard() {
  if (scoreboard) {
    scoreboard.parentNode.removeChild(scoreboard);
  }
  
  scoreboard = document.createElement('a-entity');
  scoreboard.setAttribute('id', 'scoreboard');
  scoreboard.setAttribute('position', '0 3 -5');
  
  scoreboard.setAttribute('geometry', {
    primitive: 'plane',
    width: 2,
    height: 1
  });
  scoreboard.setAttribute('material', {
    color: '#4CAF50',
    opacity: 0.8,
    transparent: true
  });
  
  const scoreText = document.createElement('a-entity');
  scoreText.setAttribute('position', '0 0 0.1');
  scoreText.setAttribute('text', {
    value: `Score: 0/0\n⭐`,
    color: 'white',
    align: 'center',
    width: 3
  });
  scoreboard.appendChild(scoreText);
  
  document.querySelector('a-scene').appendChild(scoreboard);
}

function updateScoreboard() {
  if (!scoreboard) return;5
  
  const stars = '⭐'.repeat(Math.min(5, Math.floor(score / 2))) + 
               '☆'.repeat(Math.max(0, 5 - Math.floor(score / 2)));
  
  const scoreText = scoreboard.querySelector('[text]');
  scoreText.setAttribute('text', 'value', 
    `${playerName}'s Progress\n${score}/${currentQuestionIndex}\n${stars}`);
}

function showQuestion() {
  const q = questions[currentQuestionIndex];

  document.querySelector('#questionText').setAttribute('visible', 'true');
  document.querySelector('#questionText').setAttribute('value', q.q);

  for (let i = 0; i < 3; i++) {
    document.querySelector(`#option${i + 1}`).setAttribute('visible', 'true');
    document.querySelector(`#text${i + 1}`).setAttribute('value', q.options[i]);
  }

  updateScoreboard();
}

function selectAnswer(selectedIndex) {
  const q = questions[currentQuestionIndex];
  const isCorrect = selectedIndex === q.correctIndex;

  for (let i = 1; i <= 3; i++) {
    document.querySelector(`#option${i}`).setAttribute('visible', 'false');
  }

  if (isCorrect) {
    score += 1;
    correctStreak += 1;
    
    if (correctStreak >= 5) {
      speak(`You rock, ${playerName}! That's ${correctStreak} in a row!`);
      correctStreak = 0;
    }
  } else {
    speak(`Sorry ${playerName}, that's not right.`);
    correctStreak = 0;
  }

  updateScoreboard();
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    setTimeout(showQuestion, 2000);
  } else {
    setTimeout(showFinalScore, 2000);
  }
}

function showFinalScore() {
  document.querySelector('#questionText').setAttribute('visible', 'false');
  
  const percent = Math.round((score/questions.length)*100);
  let message, stars;
  
  if (percent >= 90) {
    message = `Math Champion ${playerName}!`;
    stars = '⭐⭐⭐⭐⭐';
  } else if (percent >= 70) {
    message = `Great Job ${playerName}!`;
    stars = '⭐⭐⭐';
  } else {
    message = `Keep Practicing ${playerName}!`;
    stars = '⭐';
  }

  if (scoreboard) {
    scoreboard.parentNode.removeChild(scoreboard);
  }

  const finalScore = document.createElement('a-entity');
  finalScore.setAttribute('position', '0 1 -2');
  
  finalScore.setAttribute('geometry', {
    primitive: 'plane',
    width: 3,
    height: 1.5
  });
  finalScore.setAttribute('material', {
    color: '#2196F3',
    opacity: 0.9,
    transparent: true
  });
  
  const finalText = document.createElement('a-entity');
  finalText.setAttribute('position', '0 0 0.1');
  finalText.setAttribute('text', {
    value: `FINAL SCORE\n${score}/${questions.length}\n${stars}\n${message}`,
    color: 'white',
    align: 'center',
    width: 5
  });
  finalScore.appendChild(finalText);
  
  document.querySelector('a-scene').appendChild(finalScore);
  
  speak(`${playerName}, you scored ${score} out of ${questions.length}. ${message}`);
}

document.getElementById('enter-vr-btn').addEventListener('click', function() {
  const scene = document.querySelector('a-scene');
  if (scene.hasLoaded) {
    scene.enterVR().catch(err => {
      console.error('Error entering VR:', err);
      alert('VR mode not available. Please try on a VR-compatible device.');
    });
  } else {
    scene.addEventListener('loaded', function() {
      scene.enterVR().catch(err => {
        console.error('Error entering VR:', err);
        alert('VR mode not available. Please try on a VR-compatible device.');
      });
    });
  }
});
