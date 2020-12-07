interface Bag {
  name: string,
  amount?: number,
  contains?: Bag[],
}

const getBagInfo = (line: string) => {
  // Bag name
  const nameRes = /([\w ]+) bags contain/.exec(line);
  const name = nameRes ? nameRes[1] : "";
  if (line.includes('no other bags')) {
    return { name };
  }

  // Bags contained
  const containedRes = /contain ([ ,\w]+)./.exec(line);
  const contained = containedRes ? containedRes[1].split(/, ?/) : null;
  const bagsContained: Bag[] = new Array<Bag>();
  if (contained) {
    contained.forEach(b => {
      const bagRes = (/(\d+) ([ \w]+) bags?/).exec(b);
      if (bagRes) {
        const num = Number.parseInt(bagRes[1]);
        bagsContained.push({ amount: num, name: bagRes[2] });
      }
    });
  }
  return {
    name,
    contains: bagsContained
  }
}

const hasBag = (info: Map<string, Bag>, target: string, bag?: Bag): boolean => {
  if (!bag) return false;
  if (!bag.contains) return false;
  for (let i = 0; i < bag.contains.length; i++) {
    if (bag.contains[i].name === target) return true;
    if (hasBag(info, target, info.get(bag.contains[i].name))) return true;
  }
  return false;
}

const countInnerBags = (info: Map<string, Bag>, bag?: Bag): number => {
  if (!bag) return 0;
  if (!bag.contains) return 0;
  let totalInnerBags = 0;
  for (let i = 0; i < bag.contains.length; i++) {
    const multiplier = bag.contains[i].amount || 1;
    const innerBag = countInnerBags(info, info.get(bag.contains[i].name));
    totalInnerBags += multiplier + (multiplier * innerBag);
  }
  return totalInnerBags;
}

export const readInput = (path: string): Map<string, Bag> => {
  let input = Deno.readTextFileSync(path).split('\n');
  const bagData: Map<string, Bag> = new Map(); 
  input.forEach(line => {
    const bag = getBagInfo(line);
    bagData.set(bag.name, bag);
  });
  return bagData;
}

export const a = (input: Map<string, Bag>): number => {
  const targetBag = 'shiny gold';
  let total = 0;
  input.forEach((value, key, map) => {
    if (hasBag(map, targetBag, value)) total++;
  });
  return total;
}

export const b = (input: Map<string, Bag>): number => {
  const targetBag = 'shiny gold';
  return countInnerBags(input, input.get(targetBag));
}
