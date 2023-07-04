document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const scoreElement = document.getElementById('score');

    const gridSize = 400;
    const pixelSize = 40;
    const gridCount = gridSize / pixelSize;
    const totalPixels = gridCount * gridCount;

    let snake = [{ row: 19, col: 0 }];
    let direction = 'right';
    let food = generateRandomPixel();
    let score = 0;

    function createGrid() {
        for (let i = 0; i < totalPixels; i++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            pixel.id = `pixel${i + 1}`;
            gameContainer.appendChild(pixel);
        }
    }

    function drawSnake() {
        for (let i = 0; i < snake.length; i++) {
            const pixelId = `pixel${snake[i].row * gridCount + snake[i].col + 1}`;
            const pixel = document.getElementById(pixelId);
            pixel.classList.add('snakeBodyPixel');
        }
    }

    function drawFood() {
        const pixelId = `pixel${food.row * gridCount + food.col + 1}`;
        const pixel = document.getElementById(pixelId);
        pixel.classList.add('food');
    }

    function clearBoard() {
        const pixels = document.getElementsByClassName('pixel');
        for (let i = 0; i < pixels.length; i++) {
            pixels[i].className = 'pixel';
        }
    }

    function generateRandomPixel() {
        const row = Math.floor(Math.random() * gridCount);
        const col = Math.floor(Math.random() * gridCount);
        return { row, col };
    }

    function updateScore() {
        scoreElement.textContent = score;
    }

    function gameOver() {
        clearInterval(gameInterval);
        alert('Game Over!');
    }

    function moveSnake() {
        const head = { ...snake[0] };

        if (direction === 'up') {
            head.row--;
        } else if (direction === 'down') {
            head.row++;
        } else if (direction === 'left') {
            head.col--;
        } else if (direction === 'right') {
            head.col++;
        }

        if (head.row < 0 || head.row >= gridCount || head.col < 0 || head.col >= gridCount) {
            gameOver();
            return;
        }

        for (let i = 1; i < snake.length; i++) {
            if (head.row === snake[i].row && head.col === snake[i].col) {
                gameOver();
                return;
            }
        }

        snake.unshift(head);

        if (head.row === food.row && head.col === food.col) {
            score++;
            updateScore();
            food = generateRandomPixel();
            drawFood();
        } else {
            const tail = snake.pop();
            const tailPixelId = `pixel${tail.row * gridCount + tail.col + 1}`;
            const tailPixel = document.getElementById(tailPixelId);
            tailPixel.classList.remove('snakeBodyPixel');
        }

        drawSnake();
    }

    function handleKeyDown(event) {
        const key = event.key.toLowerCase();
        if (key === 'arrowup' && direction !== 'down') {
            direction = 'up';
        } else if (key === 'arrowdown' && direction !== 'up') {
            direction = 'down';
        } else if (key === 'arrowleft' && direction !== 'right') {
            direction = 'left';
        } else if (key === 'arrowright' && direction !== 'left') {
            direction = 'right';
        }
    }

    createGrid();
    drawSnake();
    drawFood();
    updateScore();

    const gameInterval = setInterval(moveSnake, 100);
    document.addEventListener('keydown', handleKeyDown);
});
