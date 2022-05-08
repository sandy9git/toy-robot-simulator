import { left, move, place, report, right } from "../robot/robotServices";
import { Face, Robot } from "../robot/robotTypes";
import { Surface } from "../robot/surfaceTypes";

export enum Command {
  PLACE,
  MOVE,
  LEFT,
  RIGHT,
  REPORT,
}

export class RobotApp {
  private surface: Surface;
  private robot: Robot;
  constructor(surface: Surface) {
    this.surface = surface;
  }
  public runCommand(
    command: Command,
    x?: number,
    y?: number,
    face?: Face
  ): void {
    switch (command) {
      case Command.PLACE:
        if (x === undefined || y === undefined || face === undefined) {
          throw new Error(
            "x, y and face must be provioded when running place command"
          );
        } else {
          this.robot = place(x, y, face, this.surface);
        }
        break;
      case Command.MOVE:
        this.robot = move(this.robot, this.surface);
        break;
      case Command.LEFT:
        this.robot = left(this.robot);
        break;
      case Command.RIGHT:
        this.robot = right(this.robot);
        break;
      case Command.REPORT:
        console.log(report(this.robot));
      default:
        break;
    }
  }
}
