interface Password {
  minOccurence: number;
  maxOccurence: number;
  targetChar: string;
  value: string;
}

// 2-8 d: pddzddkdvqgxndd
const parsePassword = (input: string): Password => {
  const line: string[] = input.split(' ');
  const occurences: string[] = line[0].split('-');
  return {
    minOccurence: Number.parseInt(occurences[0]),
    maxOccurence: Number.parseInt(occurences[1]),
    targetChar: line[1][0],
    value: line[2]
  }
}

export const a = (input: string[]) => {
  let validPwd = 0;
  for (let i = 0; i < input.length; i++) {
    const pwd: Password = parsePassword(input[i]);
    const occurences = pwd.value.split(pwd.targetChar).length - 1;
    if (occurences >= pwd.minOccurence && occurences <= pwd.maxOccurence)
      validPwd++;
  }
  return validPwd;
}

export const b = (input: string[]) => {
  let validPwd = 0;
  for (let i = 0; i < input.length; i++) {
    const pwd: Password = parsePassword(input[i]);
    const firstCheck: boolean = pwd.value[pwd.minOccurence - 1] === pwd.targetChar;
    const secondCheck: boolean = pwd.value[pwd.maxOccurence - 1] === pwd.targetChar;
    if (firstCheck !== secondCheck)
      validPwd++;
  }
  return validPwd;
}
