const maxRows = 127;
const maxCols = 7;

const isUpper = /B|R/g;
const isLower = /F|L/g;

const generateSeatList = (input: string[]): number[] => {
  const seats: number[] = new Array();
  input.forEach(seatLine => {
    seats.push(Number.parseInt(seatLine.replace(isUpper, "1").replace(isLower, "0"), 2));
  });
  seats.sort(function (a, b) { return a - b; });
  return seats;
}

export const readInput = (path: string): string[] => {
  let input = Deno.readTextFileSync(path);
  return input.split('\n');
}

export const a = (input: string[]): number | undefined => {
  return generateSeatList(input).pop();
}

export const b = (input: string[]): number | undefined => {
  let seatList = generateSeatList(input);
  let totalSeats = Array.from({ length: seatList.length + 1 }, (_, i) => i + seatList[0]);
  return totalSeats.filter(el => !seatList.includes(el)).pop();
}