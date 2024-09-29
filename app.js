
var questions = [
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    answers: [
      {text: "script", correct: true},
      {text: "javascript", correct: false},
      {text: "js", correct: false},
      {text: "jxs", correct: false},
    ]
  },
  {
    question: 'Where is the correct place to insert a JavaScript?',
    answers: [
      {text: "The head section", correct: false},
      {text: "The body section", correct: true},
      {text: "Both the head and body section are correct", correct: false},
      {text: "Above the head section", correct: false},
    ]
  },
  {
    question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
    answers: [
      {text: "script href=xxx.js", correct: false},
      {text: "script name=xxx.js", correct: false},
      {text: "script src=xxx.js", correct: true},
      {text: "All of above", correct: false},
    ]
  }
];

var questionElement = document.getElementById("question");
var answerButtons = document.getElementById("answer-buttons");
var nextButton = document.getElementById("next-btn");
var prevButton = document.getElementById("prev-btn"); // Adding reference to previous button

var currentQuestionIndex = 0;
var score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  prevButton.style.display = "none"; // Hide previous button at start
  showQuestion();
}

function showQuestion() {
  resetState();
  var currentQuestion = questions[currentQuestionIndex];
  var questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    var button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });

  if (currentQuestionIndex > 0) {
    prevButton.style.display = "block"; // Show previous button if not on first question
  } else {
    prevButton.style.display = "none"; // Hide previous button on first question
  }
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  var selectedBtn = e.target;
  var isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  prevButton.style.display = "none"; // Hide previous button when the quiz ends
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function handlePrevButton() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion(); // Go back to the previous question
  }
}

// Event listeners for buttons
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

prevButton.addEventListener("click", () => {
  handlePrevButton(); // Handle previous question
});

// Start the quiz
startQuiz();



