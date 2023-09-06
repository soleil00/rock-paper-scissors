// Elements
const userScoreCard = document.querySelector(".score .user");
const compScoreCard = document.querySelector(".score .comp");
const buttons = document.querySelectorAll(".options button");
const status = document.querySelector(".status strong");
const endStatus = document.querySelector(".game-over");
const resetButton = document.querySelector("#reset");

// Game variables
let userScore = 0;
let compScore = 0;
let rounds = 0;

// Event listeners for the buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const userChoice = button.classList[1];
        const compChoice = randChoice();
        rounds++;
        checkDecision(userChoice, compChoice);
        checkRoundOver();
    });
});

// Function to generate a random choice for the computer
function randChoice() {
    const choices = ["r", "p", "s"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to check the result of a round
function checkDecision(userChoice, compChoice) {
    if (userChoice === compChoice) {
        draw(userChoice);
    } else if (
        (userChoice === "r" && compChoice === "s") ||
        (userChoice === "p" && compChoice === "r") ||
        (userChoice === "s" && compChoice === "p")
    ) {
        win(userChoice);
    } else {
        loss(compChoice);
    }
    userScoreCard.textContent = userScore;
    compScoreCard.textContent = compScore;
}

// Function to handle a win
function win(userChoice) {
    userScore++;
    status.textContent = `Round ${rounds}: You won this round!`;
    document.querySelector(`.${userChoice}`).classList.add("win");
    setTimeout(() => document.querySelector(`.${userChoice}`).classList.remove("win"), 600);
}

// Function to handle a loss
function loss(compChoice) {
    compScore++;
    status.textContent = `Round ${rounds}: Computer wins this round.`;
    document.querySelector(`.${compChoice}`).classList.add("loss");
    setTimeout(() => document.querySelector(`.${compChoice}`).classList.remove("loss"), 600);
}

// Function to handle a draw
function draw(userChoice) {
    status.textContent = `Round ${rounds}: It's a draw.`;
    document.querySelector(`.${userChoice}`).classList.add("draw");
    setTimeout(() => document.querySelector(`.${userChoice}`).classList.remove("draw"), 600);
}

// Function to reset the game
function reset() {
    userScore = 0;
    compScore = 0;
    status.textContent = "New Game! Good luck this time 👍🏼.";
    userScoreCard.textContent = userScore;
    compScoreCard.textContent = compScore;
    buttons.forEach((button) => (button.disabled = false));
    rounds = 0;
    endStatus.textContent = "";
}

// Function to check if the game is over
function checkRoundOver() {
    if (rounds === 5) {
        buttons.forEach((button) => (button.disabled = true));

        if (userScore > compScore) {
            endStatus.textContent = `You won. You are the champion 🤩. Play Again?`;
        } else if (compScore > userScore) {
            endStatus.textContent = `You lose. Better luck next time 🤕. Play Again?`;
        } else {
            endStatus.textContent = `It's a draw. Play Again?`;
        }
    }
}

// Event listener for the reset button
resetButton.addEventListener("click", reset);

// Initial status message
status.textContent = "Make a choice. Don't worry, the computer has made its choice already.";
