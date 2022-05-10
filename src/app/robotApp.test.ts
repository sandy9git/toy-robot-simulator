import { CommandName, RobotApp } from "./robotApp";
import { Face } from "../robot/robotTypes";
import { Coordinates, Surface } from "../robot/surfaceTypes";
import { place, move, left, right, report } from "../robot/robotServices";

jest.mock("../robot/robotServices");

const surface = new Surface("Table", new Coordinates(0, 0, 5, 5));

describe("When robot is placed", () => {
  describe("and all parameters are valid", () => {
    it("should place the robot", () => {
      const robotApp = new RobotApp(surface);

      robotApp.runCommand({ command: CommandName.PLACE, x: 0, y: 0, face: Face.NORTH });

      expect(place).toHaveBeenCalledWith(0, 0, Face.NORTH, surface);
    });
  });
});

describe("When robot is moved", () => {
  it("should move the robot", () => {
    const robotApp = new RobotApp(surface);
    robotApp.runCommand({ command: CommandName.PLACE, x: 0, y: 0, face: Face.NORTH });

    robotApp.runCommand({ command: CommandName.MOVE });

    expect(move).toHaveBeenCalled();
  });
});

describe("When robot is turned left", () => {
  it("should turn the robot left", () => {
    const robotApp = new RobotApp(surface);
    robotApp.runCommand({ command: CommandName.PLACE, x: 0, y: 0, face: Face.NORTH });

    robotApp.runCommand({ command: CommandName.LEFT });

    expect(left).toHaveBeenCalled();
  });
});

describe("When robot is turned right", () => {
  it("should turn the robot right", () => {
    const robotApp = new RobotApp(surface);
    robotApp.runCommand({ command: CommandName.PLACE, x: 0, y: 0, face: Face.NORTH });

    robotApp.runCommand({ command: CommandName.RIGHT });

    expect(right).toHaveBeenCalled();
  });
});

describe("When report command is run", () => {
  it("should log the details to console", () => {
    console.log = jest.fn();
    const robotApp = new RobotApp(surface);
    robotApp.runCommand({ command: CommandName.PLACE, x: 0, y: 0, face: Face.NORTH });

    robotApp.runCommand({ command: CommandName.REPORT });

    expect(report).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalled();
  });
});
