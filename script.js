"use-strict";
import { aStarSearch } from "./utils.js";
let lastTimestamp = 0;

export const tilesGrid = [
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2],
  [0, 0, 1, 0, 0, 5, 0, 0, 0, 0, 0, 0, 2, 6, 6, 2],
  [5, 0, 1, 0, 0, 0, 0, 5, 0, 0, 5, 0, 2, 6, 6, 2],
  [0, 0, 1, 0, 0, 0, 0, 0, 5, 5, 0, 0, 2, 2, 4, 2],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 3, 3, 3, 3, 0],
  [0, 5, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2],
  [0, 0, 1, 0, 0, 5, 0, 0, 0, 0, 0, 0, 2, 6, 6, 2],
  [5, 0, 1, 0, 0, 0, 0, 5, 0, 0, 5, 0, 2, 6, 6, 2],
  [0, 0, 1, 0, 0, 0, 0, 0, 5, 5, 0, 0, 2, 2, 4, 2],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 3, 3, 3, 3, 0],
  [0, 5, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0],
];

const itemsGrid = [
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export const GRID_HEIGHT = tilesGrid.length;
export const GRID_WIDTH = tilesGrid[0].length;
const TILE_SIZE = 32;

window.addEventListener("load", start);

function start() {
  setupEventlisteners();
  createTiles();
  displayTiles();
  createItems();
  requestAnimationFrame(tick);
  showDebugging();
}

function setupEventlisteners() {
  document.addEventListener("keydown", keyDownEvent);
  document.addEventListener("keyup", keyUpEvent);
}

/* MODEL */
//#region
const player = {
  x: 150,
  y: 200,
  hitbox: {
    x: 6,
    y: 9,
    w: 12,
    h: 20,
  },
  regx: 10,
  regy: 14,
  speed: 100,
  moving: false,
  direction: undefined,
};

const enemy = {
  x: 20,
  y: 23,
  hitbox: {
    x: 6,
    y: 9,
    w: 12,
    h: 20,
  },
  regx: 10,
  regy: 14,
  speed: 50,
  moving: false,
  direction: undefined,
};

const controls = {
  left: false,
  right: false,
  up: false,
  down: false,
};

function getTileAtCoord({ row, col }) {
  return tilesGrid[row][col];
}

function getCoordFromPos({ x, y }) {
  return {
    row: Math.floor(y / TILE_SIZE),
    col: Math.floor(x / TILE_SIZE),
  };
}

function getPosFromCoord({ row, col }) {
  return {
    x: col * TILE_SIZE,
    y: row * TILE_SIZE,
  };
}

function getTileCoordUnder(player, newPos = { x: player.x, y: player.y }) {
  const tileCoords = [];
  const topLeft = {
    x: newPos.x - player.regx + player.hitbox.x,
    y: newPos.y - player.regy + player.hitbox.y,
  };
  const topRight = { x: topLeft.x + player.hitbox.w, y: topLeft.y };
  const bottomLeft = { x: topLeft.x, y: topLeft.y + player.hitbox.h };
  const bottomRight = {
    x: topLeft.x + player.hitbox.w,
    y: topLeft.y + player.hitbox.h,
  };

  tileCoords.push(getCoordFromPos(topLeft));
  tileCoords.push(getCoordFromPos(topRight));
  tileCoords.push(getCoordFromPos(bottomLeft));
  tileCoords.push(getCoordFromPos(bottomRight));

  return tileCoords;
}

function tick(timestamp) {
  requestAnimationFrame(tick);

  const deltaTime = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  movePlayer(deltaTime);
  moveEnemyTowardsPlayer(deltaTime);
  checkForItems();
  displayPlayerAtPosition(player, "player");
  displayPlayerAtPosition(enemy, "enemy");
  displayAnimation(player, "player");
  displayAnimation(enemy, "enemy");
  showDebugTilesUnderPlayer();
  //moveEnemyTowardsPlayer(deltaTime);
  //aStarSearch(tilesGrid, getCoordFromPos(enemy), getCoordFromPos(player));
}

function checkForItems() {
  const items = getItemsUnderPlayer();
  if (items.length > 0) {
    console.log(`There are ${items.length} items under player`);
  }
}

function getItemsUnderPlayer() {
  return getTileCoordUnder(player).filter(
    ({ row, col }) => itemsGrid[row][col] != 0
  );
}

function movePlayer(deltaTime) {
  player.moving = false;
  const diagonalSpeed = (player.speed * Math.sqrt(2)) / 2;
  const newPos = {
    x: player.x,
    y: player.y,
  };
  let moving = false;

  //Left and right controls
  if (controls.left) {
    moving = true;
    player.direction = "left";
    newPos.x -= player.speed * deltaTime;
  } else if (controls.right) {
    moving = true;
    player.direction = "right";
    newPos.x += player.speed * deltaTime;
  }

  //Up and down controls
  if (controls.up) {
    moving = true;
    player.direction = "up";
    newPos.y -= player.speed * deltaTime;
  } else if (controls.down) {
    moving = true;
    player.direction = "down";
    newPos.y += player.speed * deltaTime;
  }

  //Diagonal controls
  if ((controls.up || controls.down) && (controls.left || controls.right)) {
    newPos.x = player.x;
    newPos.y = player.y;
    if (controls.up) {
      newPos.y -= diagonalSpeed * deltaTime;
    } else {
      newPos.y += diagonalSpeed * deltaTime;
    }
    if (controls.left) {
      newPos.x -= diagonalSpeed * deltaTime;
    } else {
      newPos.x += diagonalSpeed * deltaTime;
    }
  }

  if (moving) {
    if (canMovePlayerToPos(player, newPos)) {
      player.x = newPos.x;
      player.y = newPos.y;
      player.moving = true;
    } else {
      player.moving = false;
    }
  }
}

function canMovePlayerToPos(player, pos) {
  const coords = getTileCoordUnder(player, pos);
  return coords.every(canMoveTo);
}

function canMoveTo({ row, col }) {
  if (row < 0 || row >= GRID_HEIGHT || col < 0 || col >= GRID_WIDTH) {
    return false;
  }

  const tileType = getTileAtCoord({ row, col });
  switch (tileType) {
    case 0:
    case 1:
    case 4:
    case 6:
      return true;
      break;
    case 2:
    case 3:
    case 5:
      return false;
      break;
  }

  return true;
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

function moveEnemyTowardsPlayer(deltaTime) {
  // Calculate path using A* search algorithm
  const path = aStarSearch(
    tilesGrid,
    getCoordFromPos(enemy),
    getCoordFromPos(player)
  );

  let moving = false;

  const newPos = {
    x: enemy.x,
    y: enemy.y,
  };

  // If path is found
  if (path && path.length > 1) {
    const nextTile = path[1]; // Next tile in the path (excluding current position)

    // Convert tile coordinates to position
    const nextPos = getPosFromCoord(nextTile);

    // Calculate direction to move towards next position
    const deltaX = nextPos.x - enemy.x;
    const deltaY = nextPos.y - enemy.y;

    // Determine direction based on deltaX and deltaY
    if (deltaX > 0) {
      enemy.direction = "right";
    } else if (deltaX < 0) {
      enemy.direction = "left";
    } else if (deltaY > 0) {
      enemy.direction = "down";
    } else if (deltaY < 0) {
      enemy.direction = "up";
    }

    // Move the enemy towards the next position
    // Adjust for diagonal movement
    if (Math.abs(deltaX) > 0 && Math.abs(deltaY) > 0) {
      // Diagonal movement
      const diagonalSpeed = (enemy.speed * Math.sqrt(2)) / 2;
      const horizontalDelta = Math.sign(deltaX) * diagonalSpeed * deltaTime;
      const verticalDelta = Math.sign(deltaY) * diagonalSpeed * deltaTime;

      if (
        canMovePlayerToPos(enemy, {
          x: newPos.x + horizontalDelta,
          y: newPos.y,
        })
      ) {
        newPos.x += horizontalDelta;
      }

      if (
        canMovePlayerToPos(enemy, { x: newPos.x, y: newPos.y + verticalDelta })
      ) {
        newPos.y += verticalDelta;
      }

      moving = true;
    } else {
      // Non-diagonal movement
      if (
        enemy.direction === "left" &&
        newPos.x - enemy.speed * deltaTime >= 0 &&
        canMovePlayerToPos(enemy, {
          x: newPos.x - enemy.speed * deltaTime,
          y: newPos.y,
        })
      ) {
        moving = true;
        newPos.x -= enemy.speed * deltaTime;
      } else if (
        enemy.direction === "right" &&
        newPos.x + enemy.speed * deltaTime < GRID_WIDTH &&
        canMovePlayerToPos(enemy, {
          x: newPos.x + enemy.speed * deltaTime,
          y: newPos.y,
        })
      ) {
        moving = true;
        newPos.x += enemy.speed * deltaTime;
      }

      if (
        enemy.direction === "up" &&
        newPos.y - enemy.speed * deltaTime >= 0 &&
        canMovePlayerToPos(enemy, {
          x: newPos.x,
          y: newPos.y - enemy.speed * deltaTime,
        })
      ) {
        moving = true;
        newPos.y -= enemy.speed * deltaTime;
      } else if (
        enemy.direction === "down" &&
        newPos.y + enemy.speed * deltaTime < GRID_HEIGHT &&
        canMovePlayerToPos(enemy, {
          x: newPos.x,
          y: newPos.y + enemy.speed * deltaTime,
        })
      ) {
        moving = true;
        newPos.y += enemy.speed * deltaTime;
      }
    }

    if (moving) {
      enemy.x = newPos.x;
      enemy.y = newPos.y;
      enemy.moving = true;
    }
  } else {
    // No path found or enemy is already at the player's position
    enemy.moving = false;
  }
}

//#endregion

/* VIEW */
//#region

function createItems() {
  const visualItems = document.querySelector("#items");

  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      if (itemsGrid[row][col] !== 0) {
        const item = document.createElement("div");
        item.classList.add("item");
        item.classList.add("gold");
        item.style.setProperty("--row", row);
        item.style.setProperty("--col", col);
        visualItems.append(item);
      }
    }
  }
}

function createTiles() {
  const gamefield = document.querySelector("#gamefield");
  const background = document.querySelector("#background");

  for (let i = 0; i < GRID_HEIGHT; i++) {
    for (let j = 0; j < GRID_WIDTH; j++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      background.appendChild(tile);
    }
  }
  gamefield.style.setProperty("--GRID_WIDTH", GRID_WIDTH);
  gamefield.style.setProperty("--GRID_HEIGHT", GRID_HEIGHT);
  gamefield.style.setProperty("--TILE_SIZE", TILE_SIZE + "px");
}

function displayTiles() {
  const visualTiles = document.querySelectorAll("#background .tile");

  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      const modelTile = getTileAtCoord({ row, col });
      const visualTile = visualTiles[row * GRID_WIDTH + col];

      visualTile.classList.add(getClassForTileType(modelTile));
    }
  }
}

function getClassForTileType(tileType) {
  switch (tileType) {
    case 0:
      return "grass";
      break;
    case 1:
      return "path";
      break;
    case 2:
      return "wall";
      break;
    case 3:
      return "water";
      break;
    case 4:
      return "door";
      break;
    case 5:
      return "tree";
      break;
    case 6:
      return "floor-wood";
      break;
  }
}

function displayAnimation(animate, name) {
  const visualAnimate = document.querySelector(`#${name}`);

  if (!animate.moving) {
    visualAnimate.classList.remove("animate");
  } else {
    visualAnimate.classList.add("animate");
    visualAnimate.classList.remove("up", "down", "left", "right");
    visualAnimate.classList.add(animate.direction);
  }
}

function displayPlayerAtPosition(animate, name) {
  const visual = document.querySelector(`#${name}`);
  visual.style.translate = `${animate.x - animate.regx}px ${
    animate.y - animate.regy
  }px`;
}

//#endregion

/*DEBUGGING*/
//#region

let highlightTiles = [];

function showDebugging() {
  showDebugTilesUnderPlayer();
  showDebugPlayerRect();
  showDebugRegistrationPoint();
  showDebugHitbox(player, "player");
  showDebugHitbox(enemy, "enemy");
}

function showDebugTilesUnderPlayer() {
  highlightTiles.forEach(unHighlightTile);

  const tileCoords = getTileCoordUnder(player);
  tileCoords.forEach(highlightTile);

  highlightTiles = tileCoords;
}

function highlightTile({ row, col }) {
  const visualTiles = document.querySelectorAll("#background .tile");
  const visualTile = visualTiles[row * GRID_WIDTH + col];

  visualTile.classList.add("highlight");
}

function unHighlightTile({ row, col }) {
  const visualTiles = document.querySelectorAll("#background .tile");
  const visualTile = visualTiles[row * GRID_WIDTH + col];

  visualTile.classList.remove("highlight");
}

function showDebugPlayerRect() {
  const visualPlayer = document.getElementById("player");
  if (!visualPlayer.classList.contains("show-rect")) {
    visualPlayer.classList.add("show-rect");
  }
  visualPlayer.style.setProperty("--regX", player.regx + "px");
  visualPlayer.style.setProperty("--regY", player.regy + "px");
}

function showDebugRegistrationPoint() {
  const visualPlayer = document.getElementById("player");
  if (!visualPlayer.classList.contains("show-reg-point")) {
    visualPlayer.classList.add("show-reg-point");
  }
}

function showDebugHitbox(character, name) {
  const visual = document.getElementById(`${name}`);
  if (!visual.classList.contains("show-hitbox")) {
    visual.classList.add("show-hitbox");
  }

  visual.style.setProperty("--hitboxW", character.hitbox.w + "px");
  visual.style.setProperty("--hitboxH", character.hitbox.h + "px");
  visual.style.setProperty("--hitboxX", character.hitbox.x + "px");
  visual.style.setProperty("--hitboxY", character.hitbox.y + "px");
}
//#endregion
