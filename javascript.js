const CHOICE_ROCK = "ROCK";
const CHOICE_PAPER = "PAPER";
const CHOICE_SCISSORS = "SCISSORS";
const TIE_RESULT = "Tie Round!";
const WIN_RESULT = "You Win!";
const LOSE_RESULT = "You Lose!";
const PAPER_BEATS_ROCK = " Paper beats Rock!";
const ROCK_BEATS_SCISSORS = " Rock beats Scissors!";
const SCISSORS_BEATS_PAPER = " Scissors beats Paper!";

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
