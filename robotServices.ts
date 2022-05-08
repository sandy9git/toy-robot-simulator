import { Face, Position, Robot } from "./robotTypes";
import { Coordinates, Surface } from "./surfaceTypes";

const validatePosition = (
  x: number,
  y: number,
  coordinates: Coordinates
): boolean => {
  return (
    x >= coordinates.minX &&
    x <= coordinates.maxX &&
    y >= coordinates.minY &&
    y <= coordinates.maxY
  );
};

const place = (x: number, y: number, face: Face, surface: Surface): Robot => {
  if (!validatePosition(x, y, surface.coordinates)) {
    throw new Error("invalid placement");
  }
  let position = new Position(x, y);
  return new Robot(position, face);
};

const move = (robot: Robot, surface: Surface): Robot => {
  if (robot === undefined) {
    return robot;
  }
  let newPosition: Position;
  switch (robot.face) {
    case Face.NORTH:
      newPosition = new Position(robot.position.x, robot.position.y + 1);
      break;
    case Face.SOUTH:
      newPosition = new Position(robot.position.x, robot.position.y - 1);
      break;
    case Face.EAST:
      newPosition = new Position(robot.position.x + 1, robot.position.y);
      break;
    case Face.WEST:
      newPosition = new Position(robot.position.x - 1, robot.position.y);
      break;
  }
  if (!validatePosition(newPosition.x, newPosition.y, surface.coordinates)) {
    console.log(
      `cannot move further, robot is at the edge of the ${surface.name}`
    );
    return robot;
  }
  let movedRobot = new Robot(newPosition, robot.face);
  return movedRobot;
};

const left = (robot: Robot): Robot => {
  if (robot === undefined) {
    return robot;
  }
  let newFace: Face;
  switch (robot.face) {
    case Face.NORTH:
      newFace = Face.WEST;
      break;
    case Face.SOUTH:
      newFace = Face.EAST;
      break;
    case Face.EAST:
      newFace = Face.NORTH;
      break;
    case Face.WEST:
      newFace = Face.SOUTH;
      break;
  }
  let turnedRobot = new Robot(robot.position, newFace);
  return turnedRobot;
};

const right = (robot: Robot): Robot => {
  if (robot === undefined) {
    return robot;
  }
  let newFace: Face;
  switch (robot.face) {
    case Face.NORTH:
      newFace = Face.EAST;
      break;
    case Face.SOUTH:
      newFace = Face.WEST;
      break;
    case Face.EAST:
      newFace = Face.SOUTH;
      break;
    case Face.WEST:
      newFace = Face.NORTH;
      break;
  }
  let turnedRobot = new Robot(robot.position, newFace);
  return turnedRobot;
};

const report = (robot: Robot) => {
  if (robot === undefined) {
    return "Robot is not initalised";
  }
  return `Output: ${robot.position.x},${robot.position.y},${Face[robot.face]}`;
};

export { place, move, left, right, report };
