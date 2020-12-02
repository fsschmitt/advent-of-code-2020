import { readInput } from './utils/file.ts'

const resolveAll = async () => {
  for await (const dirEntry of Deno.readDir("./src/challenge")) {
    resolveDay(dirEntry.name);
  }
}

const resolveDay = async (dirName: string) => {
  let input = await readInput(`./src/challenge/${dirName}/input.txt`);
  import(`./challenge/${dirName}/main.ts`).then(source => {
    // Execute Challenge A
    const a0 = performance.now();
    const resultA = source.a(input);
    const a1 = performance.now();
    console.log(`[${dirName.toUpperCase()}] Result A: ${resultA}, took ${(a1 - a0).toFixed(2)}ms.`);

    // Execute Challenge A
    const b0 = performance.now();
    const resultB = source.b(input);
    const b1 = performance.now();
    console.log(`[${dirName.toUpperCase()}] Result B: ${resultB}, took ${(b1 - b0).toFixed(2)}ms.`);
  });
}

const run = () => {
  const { args } = Deno;
  if (args.length !== 0) {
    resolveDay(`day${args[0]}`);
    return;
  }

  resolveAll();
}

run();
