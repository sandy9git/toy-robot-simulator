import { Face, Position, Robot } from "./robotTypes";
import { Coordinates, Surface } from "./surfaceTypes";

const validatePosition = (
  position: Position,
  coordinates: Coordinates
): boolean => {
  return (
    position.x >= coordinates.minX &&
    position.x <= coordinates.maxX &&
    position.y >= coordinates.minY &&
    position.y <= coordinates.maxY
  );
};

const place = (x: number, y: number, face: Face, surface: Surface): Robot => {
  let position = new Position(x, y);
  if (!validatePosition(position, surface.coordinates)) {
    throw new Error("invalid placement");
  }
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
  if (!validatePosition(newPosition, surface.coordinates)) {
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
    return "Robot is not initialised";
  }
  return `Output: ${robot.position.x},${robot.position.y},${Face[robot.face]}`;
};

export { place, move, left, right, report };
