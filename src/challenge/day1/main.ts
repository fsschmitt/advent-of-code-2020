export const a = (input: string[]) => {
  const numbers = input.map( n => parseInt(n, 10));
  for (let i = 0; i < numbers.length; i++) {
    const ni = numbers[i];
    for (let j = i + 1; j < numbers.length; j++) {
      const nj = numbers[j];
      if (ni + nj === 2020) {
        return ni * nj;
      }
    }
  }
  return 0;
}

export const b = (input: string[]) => {
  const numbers = input.map( n => parseInt(n, 10));
  for (let i = 0; i < numbers.length; i++) {
    const ni = numbers[i];
    for (let j = i + 1; j < numbers.length; j++) {
      const nj = numbers[j];
      for (let k = j + 1; k < numbers.length; k++) {
        const nk = numbers[k];
        if (ni + nj + nk === 2020) {
          return ni * nj * nk;
        }
      }
    }
  }
  return 0;
}
