import * as process from "process";
import { createInterface, ReadLineOptions } from "readline";
import { Command, RobotApp } from "../app/robotApp";
import { Face } from "../robot/robotTypes";
import { Coordinates, Surface } from "../robot/surfaceTypes";

const surface = new Surface("Table", new Coordinates(0, 0, 5, 5));
const robotApp = new RobotApp(surface);

const readLineOptions: ReadLineOptions = {
  input: process.stdin,
  output: process.stdout,
  terminal: false,
};
const readLine = createInterface(readLineOptions);

process.stdout.write(
  "Please run any of the following commands to operate the Toy Robot: PLACE, LEFT, RIGHT, MOVE, REPORT.\n"
);
readLine.prompt(true);

readLine.on("line", (line: string) => {
  if (line.includes("PLACE")) {
    let placeFormatMessage =
      "PLACE command should have following format PLACE X,Y,FACE for example PLACE 0,0,NORTH";
    let args = line.split(" ");
    if (args.length < 2) {
      process.stdout.write(placeFormatMessage);
      readLine.prompt(true);
      return;
    }
    let placeAgrs = args[1].split(",");
    if (placeAgrs.length < 3) {
      process.stdout.write(placeFormatMessage);
      readLine.prompt(true);
      return;
    }
    let x = parseInt(placeAgrs[0]);
    let y = parseInt(placeAgrs[1]);
    let face: Face = (<any>Face)[placeAgrs[2]];
    try {
      robotApp.runCommand(Command.PLACE, x, y, face);
    } catch (error) {
      console.log(error);
    }
  } else {
    let command: Command = (<any>Command)[line.trim()];
    robotApp.runCommand(command);
  }
  readLine.prompt(true);
});
