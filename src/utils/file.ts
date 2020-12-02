export const readInputFromFile = async (path: string): Promise<number[]> => {
  const text = await Deno.readTextFile(path);
  return text.split('\n').map( n => parseInt(n, 10));
}
