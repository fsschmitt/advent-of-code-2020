export const readInput = (path: string): string[] => {
  return Deno.readTextFileSync(path).split('\n');
}

// Example A
export const a = (input: string[]) => {
  const numbers = input.map( n => parseInt(n, 10));
  return numbers.reduce((acc, curr) => acc + curr);
}

// Example B
export const b = (input: string[]) => {
  const numbers = input.map( n => parseInt(n, 10));
  return numbers.reduce((acc, curr) => acc * curr);
}
