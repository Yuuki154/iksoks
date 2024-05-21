const boardSize = 5;
const winningLength = 4;
let board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
let currentPlayer = 0;
const players = ['X', 'O', '△'];
const gameBoard = document.getElementById('gameBoard');

function createBoard() {
    for (let i = 0; i < boardSize; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('td');
            cell.addEventListener('click', () => makeMove(i, j));
            row.appendChild(cell);
        }
        gameBoard.appendChild(row);
    }
}

function makeMove(row, col) {
    if (board[row][col] !== null) return;
    
    board[row][col] = players[currentPlayer];
    gameBoard.rows[row].cells[col].innerText = players[currentPlayer];
    
    if (checkWin(row, col)) {
        setTimeout(() => alert(`Igrac ${players[currentPlayer]} Je Pobedio!`), 100);
        resetBoard();
    } else if (board.flat().every(cell => cell !== null)) {
        setTimeout(() => alert('Nereseno je!'), 100);
        resetBoard();
    } else {
        currentPlayer = (currentPlayer + 1) % players.length;
    }
}

function checkWin(row, col) {
    const player = players[currentPlayer];

    function count(directionX, directionY) {
        let count = 0;
        let x = row;
        let y = col;
        
        while (x >= 0 && y >= 0 && x < boardSize && y < boardSize && board[x][y] === player) {
            count++;
            x += directionX;
            y += directionY;
        }
        
        return count - 1; // Subtract the initial point
    }
    
    return (
        count(1, 0) + count(-1, 0) + 1 >= winningLength || // Horizontal
        count(0, 1) + count(0, -1) + 1 >= winningLength || // Vertical
        count(1, 1) + count(-1, -1) + 1 >= winningLength || // Diagonal \
        count(1, -1) + count(-1, 1) + 1 >= winningLength // Diagonal /
    );
}

function resetBoard() {
    board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            gameBoard.rows[i].cells[j].innerText = '';
        }
    }
    currentPlayer = 0;
}

createBoard();
