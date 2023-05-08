let gameBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer;
let player1Score = 0;
let player2Score = 0;
let isPlayer1Turn = true;

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

    if (isPlayer1Turn) {
        currentPlayer = document.getElementById("player1-symbol").value;
    } else {
        currentPlayer = document.getElementById("player2-symbol").value;
    }

    gameBoard[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add("fade-in");

    const winningCombination = checkWinner();
    if (winningCombination) {
        alert(`Player ${currentPlayer} wins! Winning combination: ${winningCombination}`);
        if (currentPlayer === "X") {
            player1Score++;
        } else {
            player2Score++;
        }
        updateScore();
    } else if ( checkDraw() ) {
        alert("Draw!");
    } else {
        isPlayer1Turn = !isPlayer1Turn;
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
            return combination;
        }
    }

    return null;
}

function updateScore() {
    const player1ScoreDisplay = document.getElementById("player1");
    const player2ScoreDisplay = document.getElementById("player2");

    player1ScoreDisplay.textContent = `Player 1: ${player1Score}`;
    player2ScoreDisplay.textContent = `Player 2: ${player2Score}`;
}

function handleResetClick() {
    if ( !setPlayerSymbols() ) {
        return;
    }
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isplayer1Turn = true;
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("fade-in");
    })
}

function checkDraw() {
    return gameBoard.every((cell) => cell !== "");
}

function setPlayerSymbols() {
    const player1SymbolInput = document.getElementById("player1-symbol");
    const player2SymbolInput = document.getElementById("player2-symbol");

    if (player1SymbolInput.value === "" || player2SymbolInput.value === "") {
        alert("Please choose different non-empty symbols for each player.");
        return false;
    } else if (player1SymbolInput.value === player2SymbolInput.value) {
        alert("Please choose different symbols for each player.");
        return false;
    }

    currentPlayer = player1SymbolInput.value;
    return true;
}

if (!setPlayerSymbols()) {
    alert("Using default symbols X and O.");
}