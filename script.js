function getComputerChoice() {
    let choice = ['rock', 'paper', 'scissors'];
    let randomChoice = Math.floor(Math.random() * 3);
    // console.log(randomChoice, choice[randomChoice])
    return choice[randomChoice];
}

let playerPoints = 0;
let computerPoints = 0;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function winMessage(playerSelection, computerSelection) {
    playerSelection = capitalizeFirstLetter(playerSelection);
    computerSelection = capitalizeFirstLetter(computerSelection);
    playerPoints++;
    return `You Win! ${playerSelection} beats ${computerSelection}`;
}

function loseMessage(playerSelection, computerSelection) {
    playerSelection = capitalizeFirstLetter(playerSelection);
    computerSelection = capitalizeFirstLetter(computerSelection);
    computerPoints++;
    return `You Lose! ${computerSelection} beats ${playerSelection}`;
}

function tieMessage(playerSelection, computerSelection) {
    playerSelection = capitalizeFirstLetter(playerSelection);
    computerSelection = capitalizeFirstLetter(computerSelection);
    return `It's a tie - ${playerSelection} vs ${computerSelection}`;
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    if (playerSelection === computerSelection) {
        return tieMessage(playerSelection, computerSelection);
    }

    if (playerSelection === "rock" && computerSelection === "scissors") {
        return winMessage(playerSelection, computerSelection)
    }
    else if (playerSelection === "rock" && computerSelection === "paper") {
        return loseMessage(playerSelection, computerSelection)
    }

    if (playerSelection === "scissors" && computerSelection === "paper") {
        return winMessage(playerSelection, computerSelection)
    }
    else if (playerSelection === "scissors" && computerSelection === "rock") {
        return loseMessage(playerSelection, computerSelection)
    }

    if (playerSelection === "paper" && computerSelection === "rock") {
        return winMessage(playerSelection, computerSelection)
    }
    else if (playerSelection === "paper" && computerSelection === "scissors") {
        return loseMessage(playerSelection, computerSelection)
    }
}

const buttons = document.querySelectorAll('button')
const para = document.querySelector('.result');
const live = document.querySelector('.liveScoreCard');
const animation = document.querySelector('.animation');
const finalResult = document.querySelector('.finalResult');

function playSingleRound(e) {
    let playerSelection = e.target.classList.value;
    let computerSelection = getComputerChoice();
    animation.innerHTML = ''
    const ps = document.querySelector(`.${playerSelection}-svg`).cloneNode(true)
    const cs = document.querySelector(`.${computerSelection}-svg`).cloneNode(true)
    ps.classList.add("player")
    cs.classList.add("computer")
    animation.appendChild(ps)
    animation.appendChild(cs)
    para.textContent = playRound(playerSelection, computerSelection);
    live.textContent = `Player = ${playerPoints} vs Computer = ${computerPoints}`;
    if (playerPoints == 5 || computerPoints == 5) firstToFivePoints(playerPoints, computerPoints);
}

function firstToFivePoints(playerPoints, computerPoints) {
    buttons.forEach((button) => button.removeEventListener('click', playSingleRound))
    if (playerPoints > computerPoints) {
        finalResult.textContent = "You Win!!!"
    }
    else {
        finalResult.textContent = "You Lose :("
    }
}

buttons.forEach((button) => button.addEventListener('click', playSingleRound))
