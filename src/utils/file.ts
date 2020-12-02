export const readInput = async (path: string): Promise<string[]> => {
  let input = await Deno.readTextFile(path);
  return input.split('\n');
}
