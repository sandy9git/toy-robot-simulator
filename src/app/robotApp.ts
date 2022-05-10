import { left, move, place, report, right } from "../robot/robotServices";
import { Face, Robot } from "../robot/robotTypes";
import { Surface } from "../robot/surfaceTypes";

export enum CommandName {
  PLACE,
  MOVE,
  LEFT,
  RIGHT,
  REPORT,
}

export type PlaceCommand = {
    command: CommandName.PLACE,
    x: number,
    y: number,
    face: Face,
}

export type MoveCommand = {
  command: CommandName.MOVE,
}

export type LeftCommand = {
  command: CommandName.LEFT,
}

export type RightCommand = {
  command: CommandName.RIGHT,
}

export type ReportCommand = {
  command: CommandName.REPORT,
}

export type Command =
  | PlaceCommand
  | MoveCommand
  | LeftCommand
  | RightCommand
  | ReportCommand

export class RobotApp {
  private surface: Surface;
  private robot: Robot;
  constructor(surface: Surface) {
    this.surface = surface;
  }
  public runCommand(
    command: Command
  ): void {
    switch (command.command) {
      case CommandName.PLACE:
        this.robot = place(command.x, command.y, command.face, this.surface);
        break;
      case CommandName.MOVE:
        this.robot = move(this.robot, this.surface);
        break;
      case CommandName.LEFT:
        this.robot = left(this.robot);
        break;
      case CommandName.RIGHT:
        this.robot = right(this.robot);
        break;
      case CommandName.REPORT:
        console.log(report(this.robot));
      default:
        break;
    }
  }
}
