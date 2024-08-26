const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: [
      "Ice Cream Sandwich",
      "Jelly Bean",
      "Marshmallow",
    ],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 50;
let timerInterval;

const benchmarkQuiz = document.getElementById('quiz');
const footer = document.getElementById('question-number');
const timeLeftElement = document.getElementById('time_left');
const timerElement = document.getElementById('timer');

function displayQuestion(index) {
  clearInterval(timerInterval);
  startTimer();

  benchmarkQuiz.innerHTML = ''; 
  const question = questions[index];
  const questionDiv = document.createElement('div');
  const questionContent = document.createElement('p');
  questionContent.innerHTML = `${index + 1}. ${question.question}`;
  questionDiv.appendChild(questionContent);

  
  const answersContainer = document.createElement('div');
  answersContainer.className = 'answers-container'; 

 
  const answers = [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5);

  answers.forEach(answer => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'question' + index; 
    input.value = answer; 

    label.appendChild(input);
    label.appendChild(document.createTextNode(answer));
    answersContainer.appendChild(label); 
  });

  
  questionDiv.appendChild(answersContainer); 
  benchmarkQuiz.appendChild(questionDiv);
  footer.innerText = `Question ${index + 1}/${questions.length}`;
}

function showResult() {
  clearInterval(timerInterval);
  timerElement.style.display = 'none';
  benchmarkQuiz.innerHTML = ''; 
  footer.innerText = `You got ${score} out of ${questions.length}`;
}

function startTimer() {
  timeLeft = 50;
  timeLeftElement.textContent = timeLeft;

  timerInterval = setInterval(function () {
    timeLeft--;
    timeLeftElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      currentQuestion++;
      if (currentQuestion < questions.length) {
        displayQuestion(currentQuestion);
      } else {
        showResult();
      }
    }
  }, 1000);
}

window.onload = function() {
  displayQuestion(currentQuestion);
};

