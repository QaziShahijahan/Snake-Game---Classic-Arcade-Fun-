// Selectors and initial setup
const gameContainer = document.getElementById("gameContainer");
const scoreDisplay = document.getElementById("score");
const gridSize = 40; // 40x40 grid
let snake = [760]; // Starting snake position (row 20, column 1)
let direction = "RIGHT"; // Initial direction
let food = null; // Food position
let score = 0;

// Create grid
for (let i = 1; i <= gridSize * gridSize; i++) {
  const pixel = document.createElement("div");
  pixel.id = `pixel${i}`;
  gameContainer.appendChild(pixel);
}

// Function to generate random food
function generateFood() {
  // Remove previous food
  if (food) document.getElementById(`pixel${food}`).classList.remove("food");

  // Generate new food position
  food = Math.floor(Math.random() * gridSize * gridSize) + 1;

  // Ensure food is not generated on the snake body
  while (snake.includes(food)) {
    food = Math.floor(Math.random() * gridSize * gridSize) + 1;
  }

  // Add food class to the pixel
  document.getElementById(`pixel${food}`).classList.add("food");
}

// Function to move the snake
function moveSnake() {
  let newHead;

  // Calculate the new head position based on the current direction
  switch (direction) {
    case "UP":
      newHead = snake[0] - gridSize; // Move up by one row
      if (newHead < 1) newHead += gridSize * gridSize; // Wrap to bottom
      break;
    case "DOWN":
      newHead = snake[0] + gridSize; // Move down by one row
      if (newHead > gridSize * gridSize) newHead -= gridSize * gridSize; // Wrap to top
      break;
    case "LEFT":
      newHead = snake[0] - 1; // Move left by one column
      if (newHead % gridSize === 0) newHead += gridSize; // Wrap to right
      break;
    case "RIGHT":
      newHead = snake[0] + 1; // Move right by one column
      if (newHead % gridSize === 1) newHead -= gridSize; // Wrap to left
      break;
  }

  // Check for collision with itself
  if (snake.includes(newHead)) {
    alert("Game Over! Your score: " + score);
    location.reload();
  }

  // Add new head to the snake
  snake.unshift(newHead);

  // Check if the snake eats food
  if (newHead === food) {
    score++;
    scoreDisplay.textContent = score;
    generateFood();
  } else {
    // Remove the tail if no food is eaten
    const tail = snake.pop();
    document.getElementById(`pixel${tail}`).classList.remove("snakeBodyPixel");
  }

  // Render the snake on the grid
  snake.forEach((segment) => {
    document.getElementById(`pixel${segment}`).classList.add("snakeBodyPixel");
  });
}

// Listen for arrow key inputs to change direction
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "DOWN") direction = "UP";
      break;
    case "ArrowDown":
      if (direction !== "UP") direction = "DOWN";
      break;
    case "ArrowLeft":
      if (direction !== "RIGHT") direction = "LEFT";
      break;
    case "ArrowRight":
      if (direction !== "LEFT") direction = "RIGHT";
      break;
  }
});

// Handle on-screen controls
document.getElementById("up").addEventListener("click", () => {
    if (direction !== "DOWN") direction = "UP";
  });
  document.getElementById("left").addEventListener("click", () => {
    if (direction !== "RIGHT") direction = "LEFT";
  });
  document.getElementById("down").addEventListener("click", () => {
    if (direction !== "UP") direction = "DOWN";
  });
  document.getElementById("right").addEventListener("click", () => {
    if (direction !== "LEFT") direction = "RIGHT";
  });
  
// Start the game
generateFood();
setInterval(moveSnake, 100); // Move the snake every 100ms
