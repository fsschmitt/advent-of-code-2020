const countOccurrences = (arr: string[], val: string) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

export const readInput = (path: string): string[] => {
  let input = Deno.readTextFileSync(path);
  return input.split('\n\n');
}

export const a = (input: string[]): number => {
  let finalScore: number = 0;
  input.forEach(group => {
    const groupAnswers = group.split('\n').join('').split('');
    const uniqueGroupAnswers = [...new Set(groupAnswers)];
    finalScore += uniqueGroupAnswers.length;
  })
  return finalScore;
}

export const b = (input: string[]): number => {
  let finalScore: number = 0;
  input.forEach(group => {
    const groupArr = group.split('\n');
    const groupSize = groupArr.length;
    const groupAnswers = groupArr.join('').split('');
    const totalGroupAnswers = groupAnswers.filter(element => countOccurrences(groupAnswers, element) === groupSize);
    finalScore += [...new Set(totalGroupAnswers)].length;
  })
  return finalScore;
}
