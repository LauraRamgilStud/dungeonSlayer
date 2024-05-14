import { tilesGrid } from "./script.js";

class cell {
  constructor() {
    this.parent_i = 0;
    this.parent_j = 0;
    this.f = 0;
    this.g = 0;
    this.h = 0;
  }
}

function isValid(row, col, GRID_HEIGHT, GRID_WIDTH) {
  return row >= 0 && row < GRID_HEIGHT && col >= 0 && col < GRID_WIDTH;
}

function isUnBlocked(tilesGrid, row, col) {
  if (
    tilesGrid[row][col] == 1 ||
    tilesGrid[row][col] == 0 ||
    tilesGrid[row][col] == 4
  )
    return true;
  else return false;
}

function isDestination(row, col, dest) {
  if (row == dest.row && col == dest.col) return true;
  else return false;
}

function calculateHValue(row, col, dest) {
  return Math.sqrt(
    (row - dest.row) * (row - dest.row) + (col - dest.col) * (col - dest.col)
  );
}

function tracePath(cellDetails, dest) {
  console.log("The Path is ");
  let row = dest.row;
  let col = dest.col;

  // stack<Pair> Path;
  let Path = [];

  while (
    !(
      cellDetails[row][col].parent_i == row &&
      cellDetails[row][col].parent_j == col
    )
  ) {
    Path.push({ row, col });
    let temp_row = cellDetails[row][col].parent_i;
    let temp_col = cellDetails[row][col].parent_j;
    row = temp_row;
    col = temp_col;
  }

  Path.push({ row, col });
  console.log(Path);
  Path.reverse();

  return Path;
}

export function aStarSearch(tilesGrid, src, dest) {
  let GRID_HEIGHT = tilesGrid.length;
  let GRID_WIDTH = tilesGrid[0].length;
  console.log(src.row + " " + src.col);
  console.log(GRID_HEIGHT + " " + GRID_WIDTH);
  // If the source is out of range
  if (isValid(src.row, src.col, GRID_HEIGHT, GRID_WIDTH) == false) {
    console.log("Source is invalid\n");
    return;
  }
  if (isValid(dest.row, dest.col, GRID_HEIGHT, GRID_WIDTH) == false) {
    console.log("Destination is invalid\n");
    return;
  }

  if (
    isUnBlocked(tilesGrid, src.row, src.col) == false ||
    isUnBlocked(tilesGrid, dest.row, dest.col) == false
  ) {
    console.log("Source or the destination is blocked\n");
    return;
  }

  if (isDestination(src.row, src.col, dest) == true) {
    console.log("We are already at the destination\n");
    return;
  }

  let closedList = new Array(GRID_HEIGHT);
  for (let i = 0; i < GRID_HEIGHT; i++) {
    closedList[i] = new Array(GRID_WIDTH).fill(false);
  }

  let cellDetails = new Array(GRID_HEIGHT);
  for (let i = 0; i < GRID_HEIGHT; i++) {
    cellDetails[i] = new Array(GRID_WIDTH);
  }

  let i, j;

  for (i = 0; i < GRID_HEIGHT; i++) {
    for (j = 0; j < GRID_WIDTH; j++) {
      cellDetails[i][j] = new cell();
      cellDetails[i][j].f = 2147483647; //Infinity?
      cellDetails[i][j].g = 2147483647;
      cellDetails[i][j].h = 2147483647;
      cellDetails[i][j].parent_i = -1;
      cellDetails[i][j].parent_j = -1;
    }
  }

  (i = src.row), (j = src.col);
  cellDetails[i][j].f = 0;
  cellDetails[i][j].g = 0;
  cellDetails[i][j].h = 0;
  cellDetails[i][j].parent_i = i;
  cellDetails[i][j].parent_j = j;

  let openList = new Map();

  openList.set(0, [i, j]);

  let foundDest = false;

  while (openList.size > 0) {
    let p = openList.entries().next().value;

    openList.delete(p[0]);

    i = p[1][0];
    j = p[1][1];
    closedList[i][j] = true;

    let gNew, hNew, fNew;

    //----------- 1st Successor (North) ------------

    if (isValid(i - 1, j, GRID_HEIGHT, GRID_WIDTH) == true) {
      if (isDestination(i - 1, j, dest) == true) {
        cellDetails[i - 1][j].parent_i = i;
        cellDetails[i - 1][j].parent_j = j;
        console.log("The destination cell is found\n");
        foundDest = true;
        return tracePath(cellDetails, dest);
        return;
      } else if (
        closedList[i - 1][j] == false &&
        isUnBlocked(tilesGrid, i - 1, j) == true
      ) {
        gNew = cellDetails[i][j].g + 1;
        hNew = calculateHValue(i - 1, j, dest);
        fNew = gNew + hNew;

        if (
          cellDetails[i - 1][j].f == 2147483647 ||
          cellDetails[i - 1][j].f > fNew
        ) {
          openList.set(fNew, [i - 1, j]);

          cellDetails[i - 1][j].f = fNew;
          cellDetails[i - 1][j].g = gNew;
          cellDetails[i - 1][j].h = hNew;
          cellDetails[i - 1][j].parent_i = i;
          cellDetails[i - 1][j].parent_j = j;
        }
      }
    }

    //----------- 2nd Successor (South) ------------

    if (isValid(i + 1, j, GRID_HEIGHT, GRID_WIDTH) == true) {
      if (isDestination(i + 1, j, dest) == true) {
        cellDetails[i + 1][j].parent_i = i;
        cellDetails[i + 1][j].parent_j = j;
        console.log("The destination cell is found\n");
        foundDest = true;
        return tracePath(cellDetails, dest);
      } else if (
        closedList[i + 1][j] == false &&
        isUnBlocked(tilesGrid, i + 1, j) == true
      ) {
        gNew = cellDetails[i][j].g + 1;
        hNew = calculateHValue(i + 1, j, dest);
        fNew = gNew + hNew;
        if (
          cellDetails[i + 1][j].f == 2147483647 ||
          cellDetails[i + 1][j].f > fNew
        ) {
          openList.set(fNew, [i + 1, j]);
          cellDetails[i + 1][j].f = fNew;
          cellDetails[i + 1][j].g = gNew;
          cellDetails[i + 1][j].h = hNew;
          cellDetails[i + 1][j].parent_i = i;
          cellDetails[i + 1][j].parent_j = j;
        }
      }
    }

    //----------- 3rd Successor (East) ------------

    if (isValid(i, j + 1, GRID_HEIGHT, GRID_WIDTH) == true) {
      if (isDestination(i, j + 1, dest) == true) {
        // Set the Parent of the destination cell
        cellDetails[i][j + 1].parent_i = i;
        cellDetails[i][j + 1].parent_j = j;
        console.log("The destination cell is found\n");
        foundDest = true;
        return tracePath(cellDetails, dest);
      } else if (
        closedList[i][j + 1] == false &&
        isUnBlocked(tilesGrid, i, j + 1) == true
      ) {
        gNew = cellDetails[i][j].g + 1;
        hNew = calculateHValue(i, j + 1, dest);
        fNew = gNew + hNew;
        if (
          cellDetails[i][j + 1].f == 2147483647 ||
          cellDetails[i][j + 1].f > fNew
        ) {
          openList.set(fNew, [i, j + 1]);

          cellDetails[i][j + 1].f = fNew;
          cellDetails[i][j + 1].g = gNew;
          cellDetails[i][j + 1].h = hNew;
          cellDetails[i][j + 1].parent_i = i;
          cellDetails[i][j + 1].parent_j = j;
        }
      }
    }

    //----------- 4th Successor (West) ------------

    if (isValid(i, j - 1, GRID_HEIGHT, GRID_WIDTH) == true) {
      if (isDestination(i, j - 1, dest) == true) {
        cellDetails[i][j - 1].parent_i = i;
        cellDetails[i][j - 1].parent_j = j;
        console.log("The destination cell is found\n");

        foundDest = true;
        return tracePath(cellDetails, dest);
      } else if (
        closedList[i][j - 1] == false &&
        isUnBlocked(tilesGrid, i, j - 1) == true
      ) {
        gNew = cellDetails[i][j].g + 1;
        hNew = calculateHValue(i, j - 1, dest);
        fNew = gNew + hNew;
        if (
          cellDetails[i][j - 1].f == 2147483647 ||
          cellDetails[i][j - 1].f > fNew
        ) {
          openList.set(fNew, [i, j - 1]);

          cellDetails[i][j - 1].f = fNew;
          cellDetails[i][j - 1].g = gNew;
          cellDetails[i][j - 1].h = hNew;
          cellDetails[i][j - 1].parent_i = i;
          cellDetails[i][j - 1].parent_j = j;
        }
      }
    }

    //----------- 5th Successor (North-East)
    //------------

    // Only process this cell if this is a valid one
    if (isValid(i - 1, j + 1, GRID_HEIGHT, GRID_WIDTH) == true) {
      // If the destination cell is the same as the
      // current successor
      if (isDestination(i - 1, j + 1, dest) == true) {
        // Set the Parent of the destination cell
        cellDetails[i - 1][j + 1].parent_i = i;
        cellDetails[i - 1][j + 1].parent_j = j;
        console.log("The destination cell is found\n");
        foundDest = true;
        return tracePath(cellDetails, dest);
      } else if (
        closedList[i - 1][j + 1] == false &&
        isUnBlocked(tilesGrid, i - 1, j + 1) == true
      ) {
        gNew = cellDetails[i][j].g + 1.414;
        hNew = calculateHValue(i - 1, j + 1, dest);
        fNew = gNew + hNew;
        if (
          cellDetails[i - 1][j + 1].f == 2147483647 ||
          cellDetails[i - 1][j + 1].f > fNew
        ) {
          openList.set(fNew, [i - 1, j + 1]);

          cellDetails[i - 1][j + 1].f = fNew;
          cellDetails[i - 1][j + 1].g = gNew;
          cellDetails[i - 1][j + 1].h = hNew;
          cellDetails[i - 1][j + 1].parent_i = i;
          cellDetails[i - 1][j + 1].parent_j = j;
        }
      }
    }
    if (isValid(i - 1, j - 1, GRID_HEIGHT, GRID_WIDTH) == true) {
      if (isDestination(i - 1, j - 1, dest) == true) {
        cellDetails[i - 1][j - 1].parent_i = i;
        cellDetails[i - 1][j - 1].parent_j = j;
        console.log("The destination cell is found\n");
        foundDest = true;
        return tracePath(cellDetails, dest);
      } else if (
        closedList[i - 1][j - 1] == false &&
        isUnBlocked(tilesGrid, i - 1, j - 1) == true
      ) {
        gNew = cellDetails[i][j].g + 1.414;
        hNew = calculateHValue(i - 1, j - 1, dest);
        fNew = gNew + hNew;
        if (
          cellDetails[i - 1][j - 1].f == 2147483647 ||
          cellDetails[i - 1][j - 1].f > fNew
        ) {
          openList.set(fNew, [i - 1, j - 1]);
          cellDetails[i - 1][j - 1].f = fNew;
          cellDetails[i - 1][j - 1].g = gNew;
          cellDetails[i - 1][j - 1].h = hNew;
          cellDetails[i - 1][j - 1].parent_i = i;
          cellDetails[i - 1][j - 1].parent_j = j;
        }
      }
    }
    if (isValid(i + 1, j + 1, GRID_HEIGHT, GRID_WIDTH) == true) {
      if (isDestination(i + 1, j + 1, dest) == true) {
        cellDetails[i + 1][j + 1].parent_i = i;
        cellDetails[i + 1][j + 1].parent_j = j;
        console.log("The destination cell is found\n");
        foundDest = true;
        return tracePath(cellDetails, dest);
      } else if (
        closedList[i + 1][j + 1] == false &&
        isUnBlocked(tilesGrid, i + 1, j + 1) == true
      ) {
        gNew = cellDetails[i][j].g + 1.414;
        hNew = calculateHValue(i + 1, j + 1, dest);
        fNew = gNew + hNew;
        if (
          cellDetails[i + 1][j + 1].f == 2147483647 ||
          cellDetails[i + 1][j + 1].f > fNew
        ) {
          openList.set(fNew, [i + 1, j + 1]);

          cellDetails[i + 1][j + 1].f = fNew;
          cellDetails[i + 1][j + 1].g = gNew;
          cellDetails[i + 1][j + 1].h = hNew;
          cellDetails[i + 1][j + 1].parent_i = i;
          cellDetails[i + 1][j + 1].parent_j = j;
        }
      }
    }
    if (isValid(i + 1, j - 1, GRID_HEIGHT, GRID_WIDTH) == true) {
      if (isDestination(i + 1, j - 1, dest) == true) {
        cellDetails[i + 1][j - 1].parent_i = i;
        cellDetails[i + 1][j - 1].parent_j = j;
        console.log("The destination cell is found\n");
        foundDest = true;
        return tracePath(cellDetails, dest);
      } else if (
        closedList[i + 1][j - 1] == false &&
        isUnBlocked(tilesGrid, i + 1, j - 1) == true
      ) {
        gNew = cellDetails[i][j].g + 1.414;
        hNew = calculateHValue(i + 1, j - 1, dest);
        fNew = gNew + hNew;

        if (
          cellDetails[i + 1][j - 1].f == Number.MAX_VALUE ||
          cellDetails[i + 1][j - 1].f > fNew
        ) {
          openList.set(fNew, [i + 1, j - 1]);

          // Update the details of this cell
          cellDetails[i + 1][j - 1].f = fNew;
          cellDetails[i + 1][j - 1].g = gNew;
          cellDetails[i + 1][j - 1].h = hNew;
          cellDetails[i + 1][j - 1].parent_i = i;
          cellDetails[i + 1][j - 1].parent_j = j;
        }
      }
    }
  }

  if (foundDest == false) console.log("Failed to find the Destination Cell\n");

  return [];
}
