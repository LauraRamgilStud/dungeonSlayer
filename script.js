"use-strict";
let lastTimestamp = 0;

window.addEventListener("load", start);

function start() {
  document.addEventListener("keydown", keyDownEvent);
  document.addEventListener("keyup", keyUpEvent);
  requestAnimationFrame(tick);
}

/* MODEL */
const player = {
  x: 0,
  y: 0,
  speed: 100,
  moving: false,
  direction: undefined,
};

const controls = {
  left: false,
  right: false,
  up: false,
  down: false,
};

function displayPlayerAtPosition() {
  const visualPlayer = document.querySelector("#player");
  visualPlayer.style.translate = `${player.x}px ${player.y}px`;
}

function tick(timestamp) {
  requestAnimationFrame(tick);

  const deltaTime = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  movePlayer(deltaTime);

  displayPlayerAtPosition();
  displayPlayerAnimation();
}

function displayPlayerAnimation() {
  const visualPlayer = document.querySelector("#player");

  if (!player.moving) {
    visualPlayer.classList.remove("animate");
  } else if (!visualPlayer.classList.contains("animate")) {
    visualPlayer.classList.add("animate");
  }

  if (player.direction && !visualPlayer.classList.contains(player.direction)) {
    visualPlayer.classList.remove("up", "down", "left", "right");
    visualPlayer.classList.add(player.direction);
  }
}

function movePlayer(deltaTime) {
  player.moving = false;

  const newPos = {
    x: player.x,
    y: player.y,
  };

  if (controls.left) {
    player.moving = true;
    player.direction = "left";
    newPos.x -= player.speed * deltaTime;
  } else if (controls.right) {
    player.moving = true;
    player.direction = "right";
    newPos.x += player.speed * deltaTime;
  }

  if (controls.up) {
    player.moving = true;
    player.direction = "up";
    newPos.y -= player.speed * deltaTime;
  } else if (controls.down) {
    player.moving = true;
    player.direction = "down";
    newPos.y += player.speed * deltaTime;
  }

  if (canMoveTo(newPos)) {
    player.x = newPos.x;
    player.y = newPos.y;
  }
}

function canMoveTo(pos) {
  const gamefield = document.querySelector("#gamefield");
  const visualPlayer = document.querySelector("#player");

  const width = gamefield.clientWidth;
  const height = gamefield.clientHeight;

  const playerWidth = visualPlayer.clientWidth;
  const playerHeight = visualPlayer.clientHeight;

  if (
    pos.x < 0 ||
    pos.x > width - playerWidth ||
    pos.y < 0 ||
    pos.y > height - playerHeight
  ) {
    player.moving = false;
    return false;
  } else {
    return true;
  }
}

function keyDownEvent(evt) {
  if (evt.key === "ArrowUp" || evt.key === "w") {
    controls.up = true;
  } else if (evt.key === "ArrowDown" || evt.key === "s") {
    controls.down = true;
  } else if (evt.key === "ArrowLeft" || evt.key === "a") {
    controls.left = true;
  } else if (evt.key === "ArrowRight" || evt.key === "d") {
    controls.right = true;
  }
}

function keyUpEvent(evt) {
  if (evt.key === "ArrowUp" || evt.key === "w") {
    controls.up = false;
  } else if (evt.key === "ArrowDown" || evt.key === "s") {
    controls.down = false;
  } else if (evt.key === "ArrowLeft" || evt.key === "a") {
    controls.left = false;
  } else if (evt.key === "ArrowRight" || evt.key === "d") {
    controls.right = false;
  }
}
