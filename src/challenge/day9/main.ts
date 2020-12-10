const windowSize = 25;

const isValid = (input: number[], targetNumber: number): boolean => {
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i+1; j < input.length; j++) {
      if(input[i] !== input[j]) {
        if(input[i] + input[j] === targetNumber) {
            return true;
        }
      }
    }
  }
  return false;
}

export const readInput = (path: string): number[] => {
  let input = Deno.readTextFileSync(path);
  return input.split('\n').map( n => parseInt(n, 10));
}

export const a = (input: number[]) => {
  for (let i = windowSize; i < input.length; i++) {
    if (!isValid(input.slice(i - windowSize, i), input[i])) {
      return input[i];
    }
  }
  return 0;
}

export const b = (input: number[]) => {
  const encryptNumber = a(input);
  let currentNumbers: number[] = new Array<number>();
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    currentNumbers.push(input[i]);
    sum += input[i];
    if (currentNumbers.length >= 2) {
      while (sum > encryptNumber) {
        sum -= currentNumbers[0];
        currentNumbers.shift();
      }
      if (sum === encryptNumber) {
        return Math.min(...currentNumbers) + Math.max(...currentNumbers);
      }
    }
  }
  return 0;
}
