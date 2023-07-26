const CHOICE_ROCK = "ROCK";
const CHOICE_PAPER = "PAPER";
const CHOICE_SCISSORS = "SCISSORS";
const TIE_MESSAGE = "Tie Round!";
const WIN_MESSAGE = "You Win!";
const LOSE_MESSAGE = "You Lose!";
const PAPER_BEATS_ROCK = " Paper beats Rock!";
const ROCK_BEATS_SCISSORS = " Rock beats Scissors!";
const SCISSORS_BEATS_PAPER = " Scissors beats Paper!";
const USER_CHOICE_PROMPT = "Rock Paper Scissors! Please enter a choice: ";
const RETRY_CHOICE_PROMPT = "Invalid value, please choose Rock, Paper, or Scissors: ";
let userChoice = "";

function getComputerChoice(){
    let randChoice = Math.floor(Math.random() * 3) + 1;
    let compChoice;

    switch(randChoice) {
        case 1: 
            compChoice = CHOICE_ROCK;
            break;
        case 2:
            compChoice = CHOICE_PAPER;
            break;
        default:
            compChoice = CHOICE_SCISSORS;
            break;
    }

    return compChoice;
}

function getUserChoice(event) {
    switch(event.target.id){
        case "rock":
            updateUserChoice(CHOICE_ROCK);
            updateUserChoiceDisplay(CHOICE_ROCK);
            break;
        case "paper":
            updateUserChoice(CHOICE_PAPER);
            updateUserChoiceDisplay(CHOICE_PAPER);
            break;
        default: 
            updateUserChoice(CHOICE_SCISSORS);
            updateUserChoiceDisplay(CHOICE_SCISSORS);
            break;
    }
}

function updateUserChoice(choice) {
    userChoice = choice;
}

function updateUserChoiceDisplay(msg) {
    const choiceDisplay = document.querySelector(".choice-display h2");
    choiceDisplay.textContent = "Your Choice: " + msg;
}

function submitChoice() {
    if(userChoice == "")
        alert(RETRY_CHOICE_PROMPT);
    else{
        playRound(userChoice, getComputerChoice());
    }
}

function playRound(playerSelection, compSelection){
    let roundResult = "";
    const roundMessage = document.querySelector(".round-message");

    if(playerSelection === compSelection)
        roundResult = TIE_MESSAGE;
    else if(playerSelection === CHOICE_ROCK){
        if(compSelection === CHOICE_PAPER)
            roundResult = LOSE_MESSAGE + PAPER_BEATS_ROCK;
        else
            roundResult = WIN_MESSAGE + ROCK_BEATS_SCISSORS;
    }
    else if(playerSelection === CHOICE_PAPER){
        if(compSelection === CHOICE_SCISSORS)
            roundResult = LOSE_MESSAGE + SCISSORS_BEATS_PAPER;
        else
            roundResult = WIN_MESSAGE + PAPER_BEATS_ROCK;
    }
    else{
        if(compSelection === CHOICE_ROCK)
            roundResult = LOSE_MESSAGE + ROCK_BEATS_SCISSORS;
        else
            roundResult = WIN_MESSAGE + SCISSORS_BEATS_PAPER;
    }

    roundMessage.textContent = roundResult;
    updateGameVariables(roundResult);
}

function updateGameVariables(roundResult) {
    updateScoreboard(roundResult);
    checkIfGameOver();
    updateUserChoice("");
    updateUserChoiceDisplay("");
}

function updateScoreboard(roundResult) {
    let newScore;
    if(roundResult.includes(WIN_MESSAGE)){
        const userScore = document.querySelector(".user .points");
        newScore = Number(userScore.textContent);
        newScore++;
        userScore.textContent = newScore;
    }
    else if(roundResult.includes(LOSE_MESSAGE)){
        const compScore = document.querySelector(".comp .points");
        newScore = Number(compScore.textContent);
        newScore++;
        compScore.textContent = newScore;
    }
}

function checkIfGameOver() {
    const userPoints = document.querySelector(".user .points");
    const compPoints = document.querySelector(".comp .points");
    let userScore = Number(userPoints.textContent);
    let compScore = Number(compPoints.textContent);
    if(userScore == 5 || compScore == 5){
        displayWinner(userScore, compScore);
    }
}

function displayWinner(userScore, compScore){
    const gameMessage = document.createElement("h1");
    const header = document.querySelector(".header");
    if(userScore > compScore)
        gameMessage.textContent = WIN_MESSAGE + " You beat the computer!";
    else if(compScore > userScore)
        gameMessage.textContent = LOSE_MESSAGE + " The computer beat you!";
    else
        gameMessage.textContent = "Tie Result!";

    header.appendChild(gameMessage);
    disableNonResetButtons();
}

function resetScoreboard(){
    const scores = document.querySelectorAll(".points");
    scores.forEach(function(score) {
        score.textContent = "0";
    });

    const roundMessage = document.querySelector(".round-message");
    roundMessage.textContent = "- - - - - - - -";

    resetHeader();
    enableAllButtons();
    updateUserChoice("");
    updateUserChoiceDisplay("");
}

function resetHeader() {
    const headerMessages = document.querySelectorAll(".header h1");
    let messages = Array.from(headerMessages);

    if(messages.length > 1){
        const header = document.querySelector(".header");
        header.removeChild(messages[1]);
    }
}

function disableNonResetButtons() {
    const buttons = document.querySelectorAll(".non-reset");
    buttons.forEach(function (button) {
        button.disabled = true;
    });
}

function enableAllButtons() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(function (button) {
        button.disabled = false;
    });
}

const choiceButtons = document.querySelectorAll(".choice");
choiceButtons.forEach(function (button) {
    button.addEventListener("click", getUserChoice);
});

const resetBttn = document.querySelector(".reset");
resetBttn.addEventListener("click", resetScoreboard);

const submitBttn = document.querySelector(".submit");
submitBttn.addEventListener("click", submitChoice);