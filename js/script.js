let gameBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let player1Score = 0;
let player2Score = 0;

const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
})

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", handleResetClick);

function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = parseInt(clickedCell.getAttribute("data-index"));

    if (gameBoard[cellIndex] !== "" || checkWinner()) {
        return;
    }

    gameBoard[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWinner()) {
        alert(`Player ${currentPlayer} wins!`);
        if (currentPlayer === "X") {
            player1Score++;
        } else {
            player2Score++;
        }
        updateScore();
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        if (
            gameBoard[a] !== "" &&
            gameBoard[a] === gameBoard[b] &&
            gameBoard[a] === gameBoard[c]
        ) {
            return true;
        }
    }

    return false;
}

function updateScore() {
    const player1ScoreDisplay = document.getElementById("player1");
    const player2ScoreDisplay = document.getElementById("player2");

    player1ScoreDisplay.textContent = `Player 1: ${player1Score}`;
    player2ScoreDisplay.textContent = `Player 2: ${player2Score}`;
}

function handleResetClick() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    cells.forEach((cell) => {
        cell.textContent = "";
    })
}