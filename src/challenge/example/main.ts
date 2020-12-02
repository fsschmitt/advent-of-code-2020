// Example A
export const a = (input: number[]) => {
  return input.reduce((acc, curr) => acc + curr);
}

// Example B
export const b = (input: number[]) => {
  return input.reduce((acc, curr) => acc * curr);
}
