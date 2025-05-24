
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const resetButton = document.getElementById('reset-button');

    let gameActive = true;
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const handleCellClick = (e) => {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        fetch('/move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cell_index: clickedCellIndex }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'continue' || data.status === 'win' || data.status === 'draw') {
                gameState = data.board;
                updateBoard();
                if (data.status === 'win') {
                    statusDisplay.textContent = `Player ${data.winner} has won!`;
                    gameActive = false;
                    drawWinningLine(data.win_combination);
                } else if (data.status === 'draw') {
                    statusDisplay.textContent = 'Game ended in a draw!';
                    gameActive = false;
                } else {
                    currentPlayer = data.current_player;
                    statusDisplay.textContent = `Current player: ${currentPlayer}`;
                }
            } else if (data.status === 'invalid_move') {
                // Optionally display a message for invalid move
            }
        });
    };

    const updateBoard = () => {
        cells.forEach((cell, index) => {
            cell.textContent = gameState[index];
        });
    };

    const handleResetGame = () => {
        fetch('/reset', {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            gameState = data.board;
            currentPlayer = data.current_player;
            gameActive = true;
            updateBoard();
            statusDisplay.textContent = `Current player: ${currentPlayer}`;
            removeWinningLine();
        });
    };

    const drawWinningLine = (combination) => {
        const boardElement = document.getElementById('board');
        const boardRect = boardElement.getBoundingClientRect();
        const cell1 = cells[combination[0]];
        const cell3 = cells[combination[2]];

        const cell1Rect = cell1.getBoundingClientRect();
        const cell3Rect = cell3.getBoundingClientRect();

        const line = document.createElement('div');
        line.classList.add('winning-line');

        // Calculate position and angle
        const x1 = cell1Rect.left + cell1Rect.width / 2 - boardRect.left;
        const y1 = cell1Rect.top + cell1Rect.height / 2 - boardRect.top;
        const x2 = cell3Rect.left + cell3Rect.width / 2 - boardRect.left;
        const y2 = cell3Rect.top + cell3Rect.height / 2 - boardRect.top;

        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

        line.style.width = `${length}px`;
        line.style.top = `${y1}px`;
        line.style.left = `${x1}px`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.transformOrigin = '0 0'; // Change transformOrigin to 0 0

        boardElement.appendChild(line);
    };

    const removeWinningLine = () => {
        const line = document.querySelector('.winning-line');
        if (line) {
            line.remove();
        }
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleResetGame);
});
