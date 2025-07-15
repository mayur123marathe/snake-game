lastRender = 0;
fps = 60;
let snakeBody = [{ x: 13, y: 16 }];

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
  // Rendering Snake
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

  //   Rendering Food
}

window.requestAnimationFrame(main);
