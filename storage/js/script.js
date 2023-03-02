//pages
const startButton = document.querySelector("#startbutton");
const questionPage = document.querySelector("#question-container");
const startPage = document.querySelector("#startcon")
const initialPage = document.querySelector('#initialpage')
const initialStorage = document.querySelector('#initialstorage');
var todoForm = document.querySelector("#todo-form");

//elements
let highScore = document.querySelector("#highscore");
let timeEl = document.querySelector("#timeLeft");
let askEl = document.querySelector('#questions');
let btn = document.querySelectorAll('#btn1');
let submitbtn = document.querySelector('#submitbutton');
var qIndex = 0;
let choicesEl = document.querySelector('#choices');
let displayEl = document.querySelector('#display');
let storeInitial = document.querySelector('#storeinitial')
const initial = document.querySelector('#initial');



// timer settings.
let timeLeft = document.querySelector("#tiemleft")
let score = 100;
let timer;

// pushed item from initial
var pushedItem = [];

// questions and answers
let questions = [
    {
        question: 'What is the capital of Japan',
        choices: ['Hutkaido', 'Kyoto', 'Osaka', 'Tokyo'],
        answer: 'Tokyo'
    },
    {
        question: 'What is the capital of Korea',
        choices: ['Busan', 'Seoul', 'Pohang', 'Deagu'],
        answer: 'Seoul'
    },
    {
        question: 'What is the capital of Canada',
        choices: ['Quebec', 'Montreal', 'Vancouver', 'Ottawa'],
        answer: 'Ottawa'
    },
    {
        question: 'What is the capital of Brazil',
        choices: ['Rio De Janeiro', 'Sao Paulo', 'Manaus', 'Brasilia'],
        answer: 'Brasilia'
    }
]; 

// hide questionpage.
questionPage.style.display = 'none';

// hide initialpage.
initialPage.style.display = 'none';

// hide initialstorage.
initialStorage.style.display = 'none';

// click init.
startButton.addEventListener('click', gameStarter);

// function when user press start, displays the quiz page, hides the main page, and display initialpage after time set 0.
function gameStarter(){
    timer = setInterval(function(){
        score--;
        timeLeft.textContent = score;
        // hide question page and display initialpage after time set 0
            if(score === 0){
                clearInterval(timer);
                questionPage.style.display = 'none';
                initialPage.style.display = 'flex';
            }
    }, 1000)
    // once start button init, hide the startpage and display questionpage.
    questionPage.style.display = 'flex';
    startPage.style.display ='none';
    showQus();
}

// function to display questions and anwsers.

function showQus(){
    var currentQ = questions[qIndex];
    var questionsEl = document.getElementById('questions');
    questionsEl.textContent = currentQ.question;
    choicesEl.innerHTML = '';
    // calling the index of choices
    for( var i = 0; i < currentQ.choices.length; i++){
        let choice = currentQ.choices[i];
        let choiceBtn = document.createElement('button')
        // creating class of choice for the button
        choiceBtn.setAttribute('class', 'choice');
        // putting the value into the choice
        choiceBtn.setAttribute('value', choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choicesEl.appendChild(choiceBtn);
    }
   
}

// onclick event for choosing the answer.
choicesEl.addEventListener('click', rightAns);
// function that initiate once the user pick the choice.
function rightAns(event){
    var buttonEl = event.target;
    // If i'm not pressing a choice button, don't initiate.
    if(!buttonEl.matches('.choice')){
        return;
    }

    // if the user chooce wrong answer, deduct score -10.
    if(buttonEl.value !== questions[qIndex].answer){
        score -= 10;
        displayEl.innerHTML = 'Wrong';
        // when the score is less than 0, just set it to 0.
        if(score < 0){
            score = 0;
        }
    }
    if(buttonEl.value === questions[qIndex].answer){
        displayEl.innerHTML = 'Correct';
    }
    // updates the score so that the deducted value will be inputed.
    timeLeft.textContent = score;
    // leads to the next question by adding 1 to the qindex, the indicator for array.
    qIndex++;

    if(score <= 0 || qIndex === questions.length){
        endGame();

    } else{
        showQus();
    }
}

function endGame(){
    initialPage.style.display = 'flex';
    questionPage.style.display = 'none';
    clearInterval(timer);
    // timeLeft = timer;
    document.getElementById('score2').textContent = score;
}

// Calls display highscore.
function storeHighscore(){
    // hide initialpage and display initialstorage
    initialStorage.style.display = 'flex';
    initialPage.style.display = 'none';

    storeInitial.innerHTML = '';
    for(var i = 0; i < pushedItem.length; i++){
        var hello = pushedItem[i].user; // brings user initial
        var hello_score = pushedItem[i].score; //brings the score.
        var li = document.createElement('li');

        li.innerHTML = hello + ": " + hello_score;
        storeInitial.appendChild(li);
    }

}

function save(){
    localStorage.setItem("HighScore", JSON.stringify(pushedItem));    
}

function init(){
    var storage = JSON.parse(localStorage.getItem("HighScore"));

    if (storage !== null){
        pushedItem = storage;
    }
}

todoForm.addEventListener("submit", function(event){
    event.preventDefault();
    var todoText = initial.value;

    init();

    pushedItem.push(
        {user: todoText, score: score}
    );

    save();
    storeHighscore();
})

//below add a function to clear button 
document.querySelector('#clear').addEventListener('click', () => {
    localStorage.clear();
    pushedItem = [];
    storeHighscore();
})

//BELOW A FUNCTION TO BACK BUTTON
document.querySelector('#back').addEventListener('click', () => {
    location.reload();
})