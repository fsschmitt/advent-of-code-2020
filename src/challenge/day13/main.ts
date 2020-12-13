interface BusInfo {
  arrivalScheduled: number,
  busSchedule: BusSchedule[];
}

interface BusSchedule {
  busID: number,
  minuteDepart: number
}

/**
 * https://en.wikipedia.org/wiki/Modular_multiplicative_inverse
 */
const modularMultiplicativeInverse = (a: bigint, modulus: bigint) => {
  const b = BigInt(a % modulus);
  for (let hipothesis = 1n; hipothesis <= modulus; hipothesis++) {
      if ((b * hipothesis) % modulus == 1n) return hipothesis;
  }
  return 1n;
}

/*
 * https://en.wikipedia.org/wiki/Chinese_remainder_theorem
 */
const solveCRT = (remainders: bigint[], modules: bigint[]) => {
    // Multiply all the modulus
    const prod : bigint = modules.reduce((acc: bigint, val) => acc * val, 1n);
    
    return modules.reduce((sum, mod, index) => {
        // Find the modular multiplicative inverse and calculate the sum
    // SUM( remainder * productOfAllModulus/modulus * MMI ) (mod productOfAllModulus) 
        const p = prod / mod;
        return sum + (remainders[index] * modularMultiplicativeInverse(p, mod) * p);
    }, 0n) % prod;
}

const chineseRemainder = (busIDs: number[]): bigint => {
    let p = BigInt(1);
    let prod = BigInt(busIDs.filter(id => id !== 1).reduce((a, b) => a * b));
    let sum = BigInt(0);
    for (let i = 0; i < busIDs.length; i++) {
        p = BigInt(prod) / BigInt(busIDs[i]);
        sum += (BigInt(busIDs[i] - i) * BigInt(modularMultiplicativeInverse(p, BigInt(busIDs[i]))) * BigInt(p));
    }
    if (sum < 0) {
        sum += prod;
    }
    return sum % prod;
}

export const readInput = (path: string): BusInfo => {
  let input = Deno.readTextFileSync(path);
  let info = input.split('\n');
  let busSchedule: BusSchedule[] = new Array<BusSchedule>();
  info[1].split(",").forEach( (el, index) => {
    busSchedule.push({
      busID: Number.parseInt(el),
      minuteDepart: index
    });
  });
  let busInfo: BusInfo = {
    arrivalScheduled: Number.parseInt(info[0]),
    busSchedule
  }
  return busInfo;
}

export const a = (input: BusInfo): number => {
  let busSchedule = input.busSchedule.filter(el => !Number.isNaN(el.busID));
  let minWait = -1;
  let minWaitBus = -1;
  for (let i = 0; i < busSchedule.length; i++) {
    let timeWait = (busSchedule[i].busID * Math.ceil(input.arrivalScheduled / busSchedule[i].busID)) - input.arrivalScheduled;
    if (minWait < 0 || timeWait < minWait) {
      minWait = timeWait;
      minWaitBus = busSchedule[i].busID;
    }
  }
  return minWait * minWaitBus;
}

export const b = (input: BusInfo): bigint => {
  let busSchedule = input.busSchedule.filter(el => !Number.isNaN(el.busID));
  let reminders = new Array<bigint>();
  let modulos = new Array<bigint>();
  busSchedule.forEach(el => {
    reminders.push(BigInt(el.busID - el.minuteDepart));
    modulos.push(BigInt(el.busID));
  });
  return solveCRT(reminders, modulos)
}
