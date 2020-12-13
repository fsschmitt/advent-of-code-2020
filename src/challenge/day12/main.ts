const compass = ["N", "E", "S", "W"];
const directions = ["R", "L"];

const getAction = (line: string): [action: string, val: number] => {
  const res = /([N|S|E|W|L|R|F])([\d]+)/.exec(line);
  if (!res || res.length < 3 || Number.isNaN(res[2]))
    throw "Error while parsing action";
  
  const action: string = res[1];
  const val: number = Number.parseInt(res[2]);
  return [action, val];
}

const getRelativeDirection = (currentDirection: string, changeDirection: string, degrees: number): string => {
  let indexChange = 0;
  let currentIndex = compass.findIndex(el => el === currentDirection);
  switch (changeDirection) {
    case "R":
      indexChange = degrees / 90;
      break;
    case "L":
      indexChange = - (degrees / 90);
      break;
  }
  currentIndex = (currentIndex + indexChange) % compass.length;
  currentIndex = currentIndex < 0 ? compass.length + currentIndex : currentIndex;
  return compass[currentIndex];
}

const rotateWaypoint = (waypoint: number[], turns: number): number[] => {
  if (turns > 0) {
    for (let i = 0; i < turns; i++) {
      let temp: number = waypoint[0];
      waypoint[0] = waypoint[1];
      waypoint[1] = - temp;
    }
  }
  else {
    for (let i = 0; i < Math.abs(turns); i++) {
      let temp: number = waypoint[1];
      waypoint[1] = waypoint[0];
      waypoint[0] = - temp;
    }
  }
  return waypoint;
}

const processAction = (action: string, val: number, position: number[]): number[] => {
    // If action is a direction move;
  switch (action) {
    case "N":
      position[1] += val;
      break;
    case "S":
      position[1] -= val;
      break;
    case "E":
      position[0] += val;
      break;
    case "W":
      position[0] -= val;
      break;
    default:
      break;
  }
  return position;
}

const processMove = (action: string, val: number, position: number[], currentDirection: string): [number[], string] => {
  // If action is Left | Right, then direction is relative to current one;
  if (directions.includes(action)) {
    currentDirection = getRelativeDirection(currentDirection, action, val);
    return [position, currentDirection];
  }

  // If action is forward then direction is the current one;
  if (action === "F") action = currentDirection;

  position = processAction(action, val, position);
  return [position, currentDirection];
}

const processMoveWithWaypoint = (action: string, val: number, position: number[], waypoint: number[]): [number[], number[]] => {
  if (directions.includes(action)) {
    let turns = 0;
    switch (action) {
      case "R":
        turns = val / 90;
        break;
      case "L":
        turns = -val / 90;
        break
      default:
        break;
    }
    waypoint = rotateWaypoint(waypoint, turns);
  }

  if (action === "F") {
    position[0] += waypoint[0] * val;
    position[1] += waypoint[1] * val;
    return [position, waypoint];
  }
  return [position, waypoint];
}

const navigate = (input: string[], currentDirection: string): number => {
  let position = [0, 0];
  for (let i = 0; i < input.length; i++) {
    let [action, val] = getAction(input[i]);
    [position, currentDirection] = processMove(action, val, position, currentDirection);
  }
  return Math.abs(position[0]) + Math.abs(position[1]);
}

const navigateWithWaypoint = (input: string[], waypoint: number[]): number => {
  let position = [0, 0];
  for (let i = 0; i < input.length; i++) {
    let [action, val] = getAction(input[i]);
    if (compass.includes(action)) {
      waypoint = processAction(action, val, waypoint);
      continue;
    }
    [position, waypoint] = processMoveWithWaypoint(action, val, position, waypoint);
  }
  return Math.abs(position[0]) + Math.abs(position[1]);
}

export const readInput = (path: string): string[] => {
  let input = Deno.readTextFileSync(path);
  return input.split('\n');
}

export const a = (input: string[]): number => {
  return navigate(input, "E");
}

export const b = (input: string[]): number => {
  const waypoint = [10, 1];
  return navigateWithWaypoint(input, waypoint);
}
