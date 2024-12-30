let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let playerXWins = 0;
let playerOWins = 0;

const cells = document.querySelectorAll('.cell');
const playerXScore = document.getElementById('playerXWins');
const playerOScore = document.getElementById('playerOWins');
const message = document.getElementById('message');

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    if (gameBoard[index] === '' && !gameOver) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameOver = true;
            announceWinner(gameBoard[a], pattern);
            return;
        }
    }
    if (!gameBoard.includes('')) {
        gameOver = true;
        announceDraw();
    }
}

function announceWinner(winner, winningPattern) {
    message.textContent = `${winner} gana!`;
    if (winner === 'X') {
        playerXWins++;
    } else {
        playerOWins++;
    }
    updateScore();
    addWinnerAnimation(winningPattern);
}

function announceDraw() {
    message.textContent = '¡Empate!';
}

function updateScore() {
    playerXScore.textContent = `Tache (X): ${playerXWins}`;
    playerOScore.textContent = `Círculo (O): ${playerOWins}`;
}

function addWinnerAnimation(winningPattern) {
    // Remover animación de todas las celdas antes de añadirla
    cells.forEach(cell => {
        cell.classList.remove('winner');
    });
    
    // Añadir animación solo a las celdas ganadoras
    winningPattern.forEach(index => {
        cells[index].classList.add('winner');
    });
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    message.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner');
    });
}

function resetScore() {
    playerXWins = 0;
    playerOWins = 0;
    updateScore();
    restartGame();
}
