lastRender = 0;
fps = 9;
let snakeBody = [
  { x: 13, y: 16 },
  { x: 13, y: 15 },
  { x: 13, y: 14 },
];
let food = { x: 5, y: 5 };
let board = document.querySelector(".board");
let direction = { x: 0, y: 0 };
let foodMusic = new Audio("../music/food.mp3");
let gameOverMusic = new Audio("../music/gameover.mp3");
let moveMusic = new Audio("../music/move.mp3");
let music = new Audio("../music/music.mp3");

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastRender) / 1000 < 1 / fps) {
    return;
  } else {
    lastRender = ctime;
    gameEngine();
  }
}

function gameEngine() {
  music.play();
  board.innerHTML = "";

  // Rendering Snake
  function renderSnake() {
    snakeBody.forEach((e, index) => {
      let snakeElement = document.createElement("div");
      snakeElement.style.gridRowStart = e.y;
      snakeElement.style.gridColumnStart = e.x;
      if (index === 0) {
        snakeElement.classList.add("snakeHead");
      } else {
        snakeElement.classList.add("snakeBody");
      }
      document.querySelector(".board").appendChild(snakeElement);
    });
  }
  renderSnake();

  // Rendering Food
  let foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("foodStyle");
  document.querySelector(".board").appendChild(foodElement);

  // Food is Yummmmy
  if (snakeBody[0].x === food.x && snakeBody[0].y === food.y) {
    foodMusic.play();
    snakeBody.unshift({
      x: snakeBody[0].x + direction.x,
      y: snakeBody[0].y + direction.y,
    });
    food = {
      x: 2 + Math.floor(Math.random() * 16),
      y: 2 + Math.floor(Math.random() * 16),
    };
  }

  // Snake Movement
  if (direction.x === 0 && direction.y === 0) {
    return;
  } else {
    for (let i = snakeBody.length - 2; i >= 0; i--) {
      snakeBody[i + 1] = { ...snakeBody[i] };
    }

    snakeBody[0] = {
      x: snakeBody[0].x + direction.x,
      y: snakeBody[0].y + direction.y,
    };
  }

  // Collision with the walls
  if (
    snakeBody[0].x < 0 ||
    snakeBody[0].x > 19 ||
    snakeBody[0].y < 0 ||
    snakeBody[0].y > 19
  ) {
    renderSnake();
    gameOver();
  }

  // Snake bites itself
  snakeBody.forEach((e, index) => {
    if (index !== 0) {
      if (snakeBody[0].x === e.x && snakeBody[0].y === e.y) {
        renderSnake();
        gameOver();
      }
    }
  });
}

function gameOver() {
  music.pause();
  gameOverMusic.play();
  setTimeout(() => {
    music.play();
  }, 8000);
  alert("Game Over");
  snakeBody = [
    { x: 13, y: 16 },
    { x: 13, y: 15 },
    { x: 13, y: 14 },
  ];
  direction = { x: 0, y: 0 };
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (direction.y === 1 || direction.y === -1) break;
      direction.x = 0;
      direction.y = -1;
      moveMusic.play();

      break;
    case "ArrowDown":
      if (direction.y === -1 || direction.y === 1) break;
      direction.x = 0;
      direction.y = 1;
      moveMusic.play();

      break;
    case "ArrowLeft":
      if (direction.x === 1 || direction.x === -1) break;
      direction.x = -1;
      direction.y = 0;
      moveMusic.play();

      break;
    case "ArrowRight":
      if (direction.x === -1 || direction.x === 1) break;
      direction.x = 1;
      direction.y = 0;
      moveMusic.play();

      break;
  }
});
