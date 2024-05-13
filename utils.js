import { getTileAtCoord, getCoordFromPos } from "./script.js";

let GRID_HEIGHT;
let GRID_WIDTH;

export function findPath(start, goal, grid) {
  GRID_HEIGHT = grid.length;
  GRID_WIDTH = grid[0].length;
  const openList = [];
  const closedList = [];
  const cameFrom = {};
  const gScore = {};
  const fScore = {};

  // Initialize starting point
  gScore[start] = 0;
  fScore[start] = heuristic(start, goal);
  openList.push(start);

  while (openList.length > 0) {
    // Get the node with the lowest fScore from the open list
    const current = openList.reduce(
      (minNode, node) => (fScore[node] < fScore[minNode] ? node : minNode),
      openList[0]
    );

    // If current node is the goal, reconstruct and return the path
    if (current.x === goal.x && current.y === goal.y) {
      return reconstructPath(cameFrom, current);
    }

    // Remove current node from open list and add it to closed list
    openList.splice(openList.indexOf(current), 1);
    closedList.push(current);

    // Get neighbors of current node
    const neighbors = getNeighbors(current);

    neighbors.forEach((neighbor) => {
      if (closedList.includes(neighbor)) return;

      const tentativeGScore = gScore[current] + 1; // Assuming each step has a cost of 1

      if (!openList.includes(neighbor) || tentativeGScore < gScore[neighbor]) {
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentativeGScore;
        fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, goal);

        if (!openList.includes(neighbor)) {
          openList.push(neighbor);
        }
      }
    });
  }

  // If no path found, return empty array
  return [];
}

function heuristic(node, goal) {
  // Euclidean distance heuristic
  return Math.sqrt((goal.x - node.x) ** 2 + (goal.y - node.y) ** 2);
}

function reconstructPath(cameFrom, current) {
  const path = [current];
  while (cameFrom[current]) {
    current = cameFrom[current];
    path.unshift(current);
  }
  return path;
}

function getNeighbors(node) {
  // Assuming grid-based movement with 8-way movement (including diagonals)
  const neighbors = [];
  const directions = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 }, // Cardinal directions
    { x: 1, y: 1 },
    { x: -1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: -1 }, // Diagonal directions
  ];

  directions.forEach((dir) => {
    const neighbor = { x: node.x + dir.x, y: node.y + dir.y };
    // Add neighbor only if it's within the grid bounds and is not an obstacle
    if (
      neighbor.x >= 0 &&
      neighbor.x < GRID_WIDTH &&
      neighbor.y >= 0 &&
      neighbor.y < GRID_HEIGHT &&
      (getTileAtCoord(neighbor) === 1 ||
        getTileAtCoord(neighbor) === 4 ||
        getTileAtCoord(neighbor) === 0) // Check if it's a valid tile (1 or 5)
    ) {
      neighbors.push(neighbor);
    }
  });

  return neighbors;
}
