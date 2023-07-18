const CHOICE_ROCK = "ROCK";
const CHOICE_PAPER = "PAPER";
const CHOICE_SCISSORS = "SCISSORS";
const TIE_RESULT = "Tie Round!";
const WIN_RESULT = "You Win!";
const LOSE_RESULT = "You Lose!";
const PAPER_BEATS_ROCK = " Paper beats Rock!";
const ROCK_BEATS_SCISSORS = " Rock beats Scissors!";
const SCISSORS_BEATS_PAPER = " Scissors beats Paper!";
const USER_CHOICE_PROMPT = "Rock Paper Scissors! Please enter a choice: ";
const RETRY_CHOICE_PROMPT = "Invalid value, please choose Rock, Paper, or Scissors: ";

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

function playRound(playerSelection, compSelection){
    if(playerSelection === compSelection)
        return TIE_RESULT;
    else if(playerSelection === CHOICE_ROCK){
        if(compSelection === CHOICE_PAPER)
            return LOSE_RESULT + PAPER_BEATS_ROCK;
        else
            return WIN_RESULT + ROCK_BEATS_SCISSORS;
    }
    else if(playerSelection === CHOICE_PAPER){
        if(compSelection === CHOICE_SCISSORS)
            return LOSE_RESULT + SCISSORS_BEATS_PAPER;
        else
            return WIN_RESULT + PAPER_BEATS_ROCK;
    }
    else{
        if(compSelection === CHOICE_ROCK)
            return LOSE_RESULT + ROCK_BEATS_SCISSORS;
        else
            return WIN_RESULT + SCISSORS_BEATS_PAPER;
    }
}

function game(){
    let userScore = 0;
    let compScore = 0;

    console.log("Five Rounds of Rock, Paper, Scissors! Oh Boy!");

    for(let i = 1; i < 6; i++){
        console.log("Round " + i + ":");
        let userChoice = promptUserChoice();
        let compChoice = getComputerChoice();
        let roundResult = playRound(userChoice, compChoice);

        console.log(roundResult);

        if(roundResult.includes(WIN_RESULT))
            userScore++;
        else if(roundResult.includes(LOSE_RESULT))
            compScore++;
    }

    displayResults(userScore, compScore);
}

function promptUserChoice(){
    let userChoice = prompt(USER_CHOICE_PROMPT);
    if(userChoice !== null)
        userChoice = userChoice.toUpperCase();

    while(userChoice !== CHOICE_ROCK && userChoice !== CHOICE_PAPER
            && userChoice !== CHOICE_SCISSORS){
        userChoice = prompt(RETRY_CHOICE_PROMPT);
        if(userChoice !== null)
            userChoice = userChoice.toUpperCase();
    }

    return userChoice;
}

function displayResults(userScore, compScore){
    if(userScore > compScore)
        console.log(WIN_RESULT + " You beat the computer!");
    else if(compScore > userScore)
        console.log(LOSE_RESULT + " The computer beat you!");
    else
        console.log("Tie Result!");
}