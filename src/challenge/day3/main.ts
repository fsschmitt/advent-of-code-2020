const countTreeInSlope = (input: string[], xincrement: number, yincrement: number): number => {
  let xpos = xincrement;
  let ypos = yincrement;
  let totalTrees = 0;
  for (ypos; ypos < input.length; ypos+=yincrement) {
    if (input[ypos][xpos] === '#') {
      totalTrees++;
    }
    xpos += xincrement;
    xpos = xpos % input[ypos].length;
  }
  return totalTrees;
}

export const readInput = (path: string): string[] => {
  let input = Deno.readTextFileSync(path);
  return input.split('\n');
}

export const a = (input: string[]): number => {
  return countTreeInSlope(input, 3, 1);
}

export const b = (input: string[]): number => {
  const res1 = countTreeInSlope(input, 1, 1);
  const res2 = countTreeInSlope(input, 3, 1);
  const res3 = countTreeInSlope(input, 5, 1);
  const res4 = countTreeInSlope(input, 7, 1);
  const res5 = countTreeInSlope(input, 1, 2);
  return res1 * res2 * res3 * res4 * res5;
}