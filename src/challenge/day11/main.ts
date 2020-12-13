const EMPTY: string = "L",
  OCCUPIED: string = "#",
  FLOOR: string = ".";

const countSeats = (input: string[], state: string): number => {
  let totalCount = 0;
  const regExp = new RegExp(state, "g");
  for (let i = 0; i < input.length; i++) {
    totalCount += (input[i].match(regExp) || []).length;
  }
  return totalCount;
} 
 
const isSeatsEqual = (a: string[], b: string[]): boolean => {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

const checkAdjacent = (input: string[], row: number, col: number, directionVertical: number, directionHorizontal: number, isNextOnly: boolean): string => {
  let count = 0;
  do {
    count++;
    row = row + directionVertical;
    col = col + directionHorizontal;
    if ((row >= 0 && row < input.length) && (col >= 0 && col < input[row].length)) {
      if (input[row][col] === EMPTY || input[row][col] === OCCUPIED) {
        return input[row][col];
      }
    }
    else {
      return FLOOR;
    }
  }
  while (!isNextOnly);
  return FLOOR;
}

const countAdjacentSeats = (input: string[], row: number, col: number, state: string, isNexOnly: boolean): number => {
  let countAdjacent = 0;
  if (checkAdjacent(input, row, col, -1, -1, isNexOnly) === state) countAdjacent++; // top-left
  if (checkAdjacent(input, row, col, -1, 0, isNexOnly) === state) countAdjacent++; // top
  if (checkAdjacent(input, row, col, -1, +1, isNexOnly) === state) countAdjacent++; // top-right
  if (checkAdjacent(input, row, col, 0, -1, isNexOnly) === state) countAdjacent++; // left
  if (checkAdjacent(input, row, col, 0, +1, isNexOnly) === state) countAdjacent++; // right
  if (checkAdjacent(input, row, col, +1, -1, isNexOnly) === state) countAdjacent++; // bottom-left
  if (checkAdjacent(input, row, col, +1, 0, isNexOnly) === state) countAdjacent++; // bottom
  if (checkAdjacent(input, row, col, +1, +1, isNexOnly) === state) countAdjacent++; // bottom-right
  return countAdjacent;
}

const fillSeats = (input: string[], toleranceSeats: number, isNextOnly: boolean): string[] => {
  let tempSeats = [...input];
  for (let i = 0; i < input.length; i++) {
    const row = input[i];
    let tempRow = tempSeats[i].split('');
    for (let j = 0; j < row.length; j++) {
      if (row[j] === FLOOR) continue;
      const adjacentOccupied = countAdjacentSeats(input, i, j, OCCUPIED, isNextOnly);
      switch (row[j]) {
        case EMPTY:
          if ( adjacentOccupied === 0) tempRow[j] = OCCUPIED;
          break;
        case OCCUPIED:
          if (adjacentOccupied >= toleranceSeats) tempRow[j] = EMPTY;
          break;
        default:
          break;
      }
    }
    tempSeats[i] = tempRow.join('');
  }
  return tempSeats;
}

export const readInput = (path: string): string[] => {
  let input = Deno.readTextFileSync(path);
  return input.split('\n');
}

export const a = (input: string[]): number => {
  const toleranceSeats = 4;
  const isNextOnly = true;
  let resultsOld = fillSeats(input, toleranceSeats, isNextOnly);
  let resultsNew = fillSeats(resultsOld, toleranceSeats, isNextOnly);
  while (!isSeatsEqual(resultsOld, resultsNew)) {
    resultsOld = [...resultsNew];
    resultsNew = fillSeats(resultsOld, toleranceSeats, isNextOnly);
  }
  return countSeats(resultsNew, OCCUPIED);
}

export const b = (input: string[]): number => {
  const toleranceSeats = 5;
  const isNextOnly = false;
  let resultsOld = fillSeats(input, toleranceSeats, isNextOnly);
  let resultsNew = fillSeats(resultsOld, toleranceSeats, isNextOnly);
  while (!isSeatsEqual(resultsOld, resultsNew)) {
    resultsOld = [...resultsNew];
    resultsNew = fillSeats(resultsOld, toleranceSeats, isNextOnly);
  }
  return countSeats(resultsNew, OCCUPIED);
  return 0;
}
