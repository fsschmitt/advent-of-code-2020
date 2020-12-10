let cache: { [key:string]:number; } = {};

function gen(input: number[], startFrom: number = 1): number { 
  if (!startFrom || startFrom < 1) {
      startFrom = 1;
  }
  if (cache[startFrom]) {
      return cache[startFrom];
  }
  let count = 0;
  for (let i = startFrom; i < input.length -1; ++i) {
    if (input[i + 1] - input[i - 1] <= 3) {
        count = count + 1 + gen(input, i + 2);
    }
    if ((i + 2) < input.length && (input[i + 2] - input[i - 1]) <= 3) {
        count = count + 1 + gen(input, i + 3);
    }
  }
  cache[startFrom] = count;
  return count;
}

const countDiffs = (input: number[]): number[] => {
  const diffs = [0, 0, 0];
  for (let i = 0; i < input.length - 1; i++) {
    const diff = input[i + 1] - input[i];
    diffs[diff - 1]++;
  }
  return diffs;
}

export const readInput = (path: string): number[] => {
  let input = Deno.readTextFileSync(path);
  return input.split('\n').map( n => parseInt(n, 10));
}

export const a = (input: number[]) => {
  input = [...input];
  const deviceJoltage = Math.max(...input) + 3;
  const sortedInput = input.sort((a, b) => a - b);
  sortedInput.unshift(0);
  sortedInput.push(deviceJoltage);
  const count = countDiffs(sortedInput);
  return count[0] * count[2];
}

export const b = (input: number[]) => {
  input = [...input];
  const deviceJoltage = Math.max(...input) + 3;
  const sortedInput = input.sort((a, b) => a - b);
  sortedInput.unshift(0);
  sortedInput.push(deviceJoltage);
  return gen(sortedInput) + 1;
}
