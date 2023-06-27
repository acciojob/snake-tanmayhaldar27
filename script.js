var gameContainer = document.getElementById("gameContainer");
var food = document.getElementById("pixel1");
var snakeBody = [];
var score = 0;

var interval = setInterval(function() {
  // Move the snake.
  snakeBody.shift();
  snakeBody.push(snakeBody[snakeBody.length - 1] + 1);

  // Check if the snake has eaten the food.
  if (snakeBody[0] == food.id) {
    food.id = Math.floor(Math.random() * 400) + 1;
    score++;
  }

  // Check if the snake has hit itself or the edge of the game container.
  if (snakeBody[0] < 1 || snakeBody[0] > 400 ||
      snakeBody.indexOf(snakeBody[0] - 1) != -1 ||
      snakeBody.indexOf(snakeBody[0] + 1) != -1) {
    clearInterval(interval);
  }

  // Update the score.
  document.querySelector(".scoreBoard").textContent = score;
}, 100);
