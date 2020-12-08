interface command {
  instruction: string,
  value: number,
  executed: boolean,
}

const executeLoop = (input: command[]): [boolean, number] => {
  let accumulator = 0;
  let circuitBreaker = false;
  let step = 1;
  for (let i = 0; i < input.length; i += step) {
    if (input[i].executed) {
      circuitBreaker = true;
      break;
    }
    step = 1;
    switch (input[i].instruction) {
      case 'jmp':
        step = input[i].value;
        break;
      case 'acc':
        accumulator += input[i].value;
      default:
        break;
    }
    input[i].executed = true;
  }
  return [circuitBreaker, accumulator];
}

const reverseInstruction = (instruction :string): string => {
  return instruction === 'jmp' ? 'nop' : instruction === 'nop' ? 'jmp' : instruction;
}

const resetExecution = (input: command[]): command[] => {
  input.forEach(el => el.executed = false);
  return input;
}

export const readInput = (path: string): command[] => {
  let input = Deno.readTextFileSync(path).split('\n');
  let allCommands: command[] = new Array<command>();
  input.forEach(line => {
    const val = (/(\w+) ([-|+]?\d+)/).exec(line);
    if (val && val.length > 2 && !Number.isNaN(val[2])) {
      let value = Number.parseInt(val[2]);
      allCommands.push({ instruction: val[1], value, executed: false });
    }
  });
  return allCommands;
}

export const a = (input: command[]): number => {
  let [circuitBreaker, acc] = executeLoop(input);
  return acc;
}

export const b = (input: command[]): number => {
  for (let i = 0; i < input.length; i++) {
    if (input[i].instruction === 'jmp' || input[i].instruction === 'nop') {
      const tempInput = [...resetExecution(input)];
      tempInput[i].instruction = reverseInstruction(input[i].instruction);
      let [circuitBreaker, acc] = executeLoop(tempInput);
      tempInput[i].instruction = reverseInstruction(input[i].instruction);
      if (!circuitBreaker) return acc;
    }
  }
  return 0;
}
