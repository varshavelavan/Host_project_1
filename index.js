document.addEventListener("DOMContentLoaded", () => {
  const startScreen = document.getElementById("start-screen");
  const gameArea = document.getElementById("game-area");
  const endScreen = document.getElementById("end-screen");

  const startButton = document.getElementById("start-button");
  const playAgainButton = document.getElementById("play-again-button");
  const submitButton = document.getElementById("submit-button");

  const scrambledWordElement = document.getElementById("scrambled-word");
  const userInput = document.getElementById("user-input");
  const timerElement = document.getElementById("timer");
  const scoreElement = document.getElementById("score");
  const finalScoreElement = document.getElementById("final-score");
  const hintElement = document.getElementById("hint");

  const words = [
    { word: "javascript", hint: "A popular programming language used for web development." },
    { word: "webdevelopment", hint: "The process of building websites and web applications, including both frontend and backend." },
    { word: "html", hint: "The standard markup language used to create the structure of web pages." },
    { word: "css", hint: "A stylesheet language used to describe the presentation of web pages." },
    { word: "bootstrap", hint: "A popular front-end framework for building responsive websites quickly." },
    { word: "array", hint: "A data structure used to store multiple values in a single variable." },
    { word: "object", hint: "A data structure that stores collections of data. It contains properties and methods." },
    { word: "function", hint: "A block of reusable code designed to perform a specific task in programming." },
    { word: "variable", hint: "A symbolic name for data stored in a computer's memory." },
    { word: "syntax", hint: "The set of rules that defines the structure of statements in a programming language." },
    { word: "java", hint: "A high-level programming language used for web applications, mobile apps, and enterprise software." },
    { word: "frontend", hint: "The part of web development that deals with everything the user interacts with directly on a webpage." },
    { word: "backend", hint: "The server-side part of a web application that manages the database, authentication, and logic." }
  ];

  let currentWord = "";
  let currentHint = "";
  let score = 0;
  let timeLeft = 45;
  let timerInterval;
  let usedWords = [];

  startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    gameArea.style.display = "flex";
    startGame();
  });

  playAgainButton.addEventListener("click", () => {
    endScreen.style.display = "none";
    startScreen.style.display = "flex";
    resetGame();
  });

  submitButton.addEventListener("click", () => {
    if (userInput.value.trim().toLowerCase() === currentWord.toLowerCase()) {
      score++;
      scoreElement.textContent = score;
      generateScrambledWord();
    } else {
      alert("Incorrect! Try again.");
    }
    userInput.value = "";
  });

  function startGame() {
    score = 0;
    timeLeft = 45;
    scoreElement.textContent = score;
    timerElement.textContent = timeLeft;
    hintElement.textContent = "";
    usedWords = []; // Reset used words for a new game
    generateScrambledWord();
    startTimer();
  }

  function resetGame() {
    clearInterval(timerInterval);
    timerElement.textContent = "45";
    scoreElement.textContent = "0";
    userInput.value = "";
    hintElement.textContent = "";
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      timeLeft--;
      timerElement.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endGame();
      }
    }, 1000);
  }

  function generateScrambledWord() {
    if (usedWords.length === words.length) {
      usedWords = []; // Reset if all words are used
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * words.length);
    } while (usedWords.includes(randomIndex));

    usedWords.push(randomIndex);
    currentWord = words[randomIndex].word;
    currentHint = words[randomIndex].hint;
    scrambledWordElement.textContent = shuffleWord(currentWord);
    hintElement.textContent = `Hint: ${currentHint}`;
  }

  function shuffleWord(word) {
    return word.split("").sort(() => Math.random() - 0.5).join("");
  }

  function endGame() {
    gameArea.style.display = "none";
    endScreen.style.display = "flex";
    finalScoreElement.textContent = score;
  }
});
