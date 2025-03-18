// Array to store user answers
let userAnswers = [];

// Retrieve saved progress from session storage
const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || [];
userAnswers = savedProgress;

// Get references to the DOM elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}

// Save user answers to session storage
function saveProgress() {
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

// Calculate the score and display it
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
}

// Event listener for radio buttons to save user answers
questionsElement.addEventListener("change", function(event) {
  if (event.target.tagName === "INPUT" && event.target.type === "radio") {
    const questionIndex = event.target.name.split("-")[1];
    userAnswers[questionIndex] = event.target.value;
    saveProgress();
  }
});

// Event listener for the submit button
submitButton.addEventListener("click", function() {
  calculateScore();
});

// Initial rendering of questions
renderQuestions();

// Display the last score from local storage
const lastScore = localStorage.getItem("score");
if (lastScore !== null) {
  scoreElement.textContent = `Your last score was ${lastScore} out of ${questions.length}.`;
}