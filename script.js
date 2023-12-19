let questions = [

    { 
        question: "What does HTML stand for?",
        answers: [
            {text: "Hypetext Markup Language", correct: true},
            {text: "Hyper True Makeup Language", correct: false},
            {text: "Hypertext Markdown Language", correct: false},
            {text: "Hyper True Markdown Language", correct: false},

        ]
    },
    {
        question: "What Does CSS stand for?",
        answers: [
            {text: "Computer Style Sheet", correct: false},
            {text: "Creative Style Sheet", correct: false},
            {text: "Cascading Style Sheet", correct: true},
            {text: "Coding Style Sheet", correct: false},
        ]
    },
    {
        question: "Which symbol is used to target and ID in CSS?",
        answers: [ 
            {text: ".", correct: false},
            {text: ",", corect: false},
            {text: "#", correct: true},
            {text: "?", correct: false},
        ]
    },
    {
        question: "What HTML tag is used for a line break?",
        answers: [
            {text: "newline", correct: false},
            {text: "li", correct: false},
            {text: "br", correct: true},
            {text: "lb", correct: false},
        ]
    },
    {
        question: "Which sytax would call a function?",
        answers: [
            {text: "#function", correct: false},
            {text: "function()", correct: true},
            {text: "!function!", correct: false},
            {text: "callfunciton()", correct: false},
        ]
    },
    {
        question: "What does DOM stand for?",
        answers: [
            {text: "Direction of Model", correct: false},
            {text: "Document Objection Model", correct: false},
            {text: "Document Object Model", correct: true},
            {text: "None of the above", correct: false},
        ]
    },

];

var questionElement = document.getElementById("question");
var answerButtons = document.getElementById("answer-buttons");
var nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let timer = "";
let timeLimit = 60; 
let playerName = "";
let playerScore = "";
let playerNameInput = document.getElementById("playerName");
let submitScoreButton = document.getElementById("submitScore");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    startTimer()
    showQuestion()
}

function startTimer() {
    let timeRemaining = timeLimit;

    function updateTimer() {
        timeRemaining--;
        if (timeRemaining < 0) {
            clearInterval(timer);
            showScore();
        } else {
            document.getElementById('timer').innerText = `Time Left: ${timeRemaining} seconds`;
        }
    }
    timer = setInterval(updateTimer, 1000);
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        
    });

}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    var selectedBtn = e.target;
    var isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true
    });
    nextButton.style.display = "block";
}


function showScore() {
    clearInterval(timer);
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    document.getElementById("score-form").style.display = "block";
}





function handleNextButon(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}

let highScores= [];


function addHighScore(name, score) {
    const newScore = { name, score };
    highScores.push(newScore);

    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem('highScores', JSON.stringify(highScores));
}




function displayHighScores() {
    const highScoresList = document.getElementById("highScoresList");
    highScoresList.innerHTML = '';

    highScores.forEach((score, index) => {
        const li = document.createElement("li");
        li.innerText = `${index + 1}. ${score.name}: ${score.score}`;
        highScoresList.appendChild(li);
    });
}


submitScoreButton.addEventListener("click", submitScore);

function submitScore() {
    playerName = playerNameInput.value.trim();

    if (playerName !== "") {
        addHighScore(playerName, score);
        displayHighScores();
        document.getElementById("score-form").style.display = "none";
    } else {
        alert("Please enter your initials!");
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButon()
    }else{
        startQuiz();
    }
})

startQuiz();