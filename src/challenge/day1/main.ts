export const a = (input: number[]) => {
  for (let i = 0; i < input.length; i++) {
    const ni = input[i];
    for (let j = i + 1; j < input.length; j++) {
      const nj = input[j];
      if (ni + nj === 2020) {
        return ni * nj;
      }
    }
  }
  return 0;
}

export const b = (input: number[]) => {
  for (let i = 0; i < input.length; i++) {
    const ni = input[i];
    for (let j = i + 1; j < input.length; j++) {
      const nj = input[j];
      for (let k = j + 1; k < input.length; k++) {
        const nk = input[k];
        if (ni + nj + nk === 2020) {
          return ni * nj * nk;
        }
      }
    }
  }
  return 0;
}
