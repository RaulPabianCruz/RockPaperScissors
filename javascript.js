const choiceR = "ROCK";
const choiceP = "PAPER";
const choiceS = "SCISSORS";

function getComputerChoice(){
    let randChoice = Math.floor(Math.random() * 3) + 1;
    let compChoice;
    switch(randChoice) {
        case 1: 
            compChoice = choiceR;
            break;
        case 2:
            compChoice = choiceP;
            break;
        default:
            compChoice = choiceS;
            break;
    }
    return compChoice;
}