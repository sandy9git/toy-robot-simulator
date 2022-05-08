export enum Face {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

export class Position {
  constructor(public x: number, public y: number) {}
}

export class Robot {
  constructor(public position: Position, public face: Face) {}
}
