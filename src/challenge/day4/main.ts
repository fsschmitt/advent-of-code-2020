function isPassportValid(arg: any, secureValidation: boolean): boolean {
  if (!arg) return false;
  const validByr = arg.byr && (secureValidation ? /^19[2-9][0-9]|200[0-2]$/i.test(arg.byr) : true);
  const validIyr = arg.iyr && (secureValidation ? /^201[0-9]|2020$/i.test(arg.iyr) : true);
  const validEyr = arg.eyr && (secureValidation ? /^202[0-9]|2030$/i.test(arg.eyr) : true);
  const validHgt = arg.hgt && (secureValidation ? /^(1[5-8][0-9]|19[0-3])cm$|^(59|6[0-9]|7[0-6])in$/i.test(arg.hgt) : true);
  const validHcl = arg.hcl && (secureValidation ? /^#[0-9A-F]{6}$/i.test(arg.hcl) : true);
  const validEcl = arg.ecl && (secureValidation ? /^amb|blu|brn|gry|grn|hzl|oth$/i.test(arg.ecl) : true);
  const validPid = arg.pid && (secureValidation ? /^\d{9}$/.test(arg.pid) : true);
  return validByr && validIyr && validEyr && validHgt && validHcl && validEcl && validPid;
}

const passportLoad = (input: string): any => {
  let passport: {[index: string]:any} = {}
  const fields = input.split('\n').join(' ').split(' ');
  fields.forEach(field => {
    const data = field.split(":");
    passport[data[0]] = data[1];
  });
  return passport;
}

export const readInput = (path: string): string[] => {
  let input = Deno.readTextFileSync(path);
  return input.split('\n\n');
}

export const a = (input: string[]): number => {
  let validPassports = 0;
  input.forEach(passport => {
    let passportData = passportLoad(passport);
    if (isPassportValid(passportData, false))
      validPassports++;
  });
  return validPassports;
}

export const b = (input: string[]): number => {
  let validPassports = 0;
  input.forEach(passport => {
    let passportData = passportLoad(passport);
    if (isPassportValid(passportData, true)) {
      validPassports++;
    }
  });
  return validPassports;
}