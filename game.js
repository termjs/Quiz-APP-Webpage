const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');


let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

//QUESTIONS
let questions = [
    {
        question: "In SQL, to find the total dollar value of sales, use which one?",
        choice1: "COUNT",
        choice2: "MIN",
        choice3: "SUM",
        choice4: "MAX",
        answer: 3
    },
    {
        question: "Which of these expressions is NOT a valid way to add 1 to a variable in JavaScript?",
        choice1: "x++",
        choice2: "x+",
        choice3: "x = x + 1",
        choice4: "x += 1",
        answer: 2
    },
    {
        question: "CPU stand for _____ processing unit",
        choice1: "command",
        choice2: "control",
        choice3: "central",
        choice4: "hogwarts",
        answer: 3
    },
    {
        question: "What is the only language that a computer can understand?",
        choice1: "High-level",
        choice2: "Application",
        choice3: "Assembly",
        choice4: "Machine",
        answer: 4
    },
    {
        question: "Finding and fixing problems in your algorithm or program",
        choice1: "Debugging",
        choice2: "Insect Spray",
        choice3: "Looping",
        choice4: "Digit",
        answer: 1
    },
];

// VALUES
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign("end.html");
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = 'incorrect';
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct';
        }

        if(classToApply == "correct"){
            incremendScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

//ADD SCORE POINTS
incremendScore = num => {
    score += num;  
};

startGame();