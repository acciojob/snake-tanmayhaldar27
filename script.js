// Get the game container element
const gameContainer = document.getElementById('gameContainer');

// Snake starting position
let snakeRow = 20;
let snakeCol = 1;

// Movement direction
let direction = 'right';

// Function to create the snake body pixel
function createSnakePixel() {
	const snakePixel = document.createElement('div');
	snakePixel.className = 'snakeBodyPixel';
	const pixelId = 'pixel' + snakeRow + snakeCol;
	snakePixel.id = pixelId;
	gameContainer.appendChild(snakePixel);
}

// Function to move the snake
function moveSnake() {
	// Remove the previous snake pixel
	const previousPixelId = 'pixel' + snakeRow + snakeCol;
	const previousPixel = document.getElementById(previousPixelId);
	previousPixel.remove();
	
	// Update the snake's position based on the direction
	if (direction === 'right') {
		snakeCol++;
	} else if (direction === 'left') {
		snakeCol--;
	} else if (direction === 'up') {
		snakeRow--;
	} else if (direction === 'down') {
		snakeRow++;
	}
	
	// Create a new snake pixel at the updated position
	createSnakePixel();
}

// Start the snake movement
setInterval(moveSnake, 100);
