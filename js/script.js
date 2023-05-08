const ticTacToe = {
    gameBoard: ["", "", "", "", "", "", "", "", ""],
    currentPlayer: "X",
    player1Score: 0,
    player2Score: 0,
    cells: document.querySelectorAll(".cell"),

    handleCellClick(event) {
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
    },

    checkWinner() {
        return this.checkRows() || this.checkColumns() || this.checkDiagonals();
    },

    checkRows() {
        for (let i = 0; i < 9; i += 3) {
            if (this.checkThreeCells(i, i + 1, i + 2)) {
            return true;
            }
        }
        return false;
    },

    checkColumns() {
        for (let i = 0; i < 3; i++) {
            if (this.checkThreeCells(i, i + 3, i + 6)) {
            return true;
            }
        }
        return false;
    },

    checkDiagonals() {
      return this.checkThreeCells(0,4,8) || this.checkThreeCells(2,4,6);
    },

    checkThreeCells(a, b, c) {
        return (
            this.gameBoard[a] !== "" &&
            this.gameBoard[a] === this.gameBoard[b] && 
            this.gameBoard[a] === this.gameBoard[c]
        )
    },

    updateScore() {
        const player1ScoreDisplay = document.getElementById("player1");
        const player2ScoreDisplay = document.getElementById("player2");
    
        player1ScoreDisplay.textContent = `Player 1: ${player1Score}`;
        player2ScoreDisplay.textContent = `Player 2: ${player2Score}`;
    },

    handleResetClick() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        cells.forEach((cell) => {
            cell.textContent = "";
        })
    },

    init() {
        this.cells.forEach((cell) => {
            cell.addEventListener("click", this.handleCellClick);
        })

        const resetButton = document.getElementById("reset");
        resetButton.addEventListener("click", this.handleResetClick);
    },
}

ticTacToe.init();