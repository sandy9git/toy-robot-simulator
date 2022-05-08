import { place, move, left, right, report } from "./robotServices";
import { Face, Position, Robot } from "./robotTypes";
import { Coordinates, Surface } from "./surfaceTypes";

describe("When robot is placed", () => {
  let surface = new Surface("table", new Coordinates(0, 0, 5, 5));
  describe("and it's placed at valid position", () => {
    it("should return robot at the new position", () => {
      let placedRobot = place(0, 0, Face.NORTH, surface);

      expect(placedRobot.face).toBe(Face.NORTH);
      expect(placedRobot.position).toStrictEqual(new Position(0, 0));
    });
  });
  describe("and it's placed at invalid position", () => {
    it("should throw an error", () => {
      expect(() => {
        place(6, 0, Face.NORTH, surface);
      }).toThrowError("invalid placement");
    });
  });
});

describe("When robot is moved", () => {
  let surface = new Surface("table", new Coordinates(0, 0, 5, 5));
  describe("and it's facing north", () => {
    it("should move one unit towards north", () => {
      let robot = new Robot(new Position(0, 0), Face.NORTH);

      let movedRobot = move(robot, surface);

      expect(movedRobot.face).toBe(Face.NORTH);
      expect(movedRobot.position).toStrictEqual(new Position(0, 1));
    });
  });
  describe("and it's facing south", () => {
    it("should move one unit towards south", () => {
      let robot = new Robot(new Position(0, 4), Face.SOUTH);

      let movedRobot = move(robot, surface);

      expect(movedRobot.face).toBe(Face.SOUTH);
      expect(movedRobot.position).toStrictEqual(new Position(0, 3));
    });
  });
  describe("and it's facing east", () => {
    it("should move one unit towards east", () => {
      let robot = new Robot(new Position(0, 0), Face.EAST);

      let movedRobot = move(robot, surface);

      expect(movedRobot.face).toBe(Face.EAST);
      expect(movedRobot.position).toStrictEqual(new Position(1, 0));
    });
  });
  describe("and it's facing west", () => {
    it("should move one unit towards west", () => {
      let robot = new Robot(new Position(4, 0), Face.WEST);

      let movedRobot = move(robot, surface);

      expect(movedRobot.face).toBe(Face.WEST);
      expect(movedRobot.position).toStrictEqual(new Position(3, 0));
    });
  });
  describe("and it's moved beyond the surface", () => {
    it("should not move to new postion", () => {
      let robot = new Robot(new Position(5, 5), Face.NORTH);

      let movedRobot = move(robot, surface);

      expect(movedRobot.position).toStrictEqual(new Position(5, 5));
    });
  });
});

describe("When robot is turned left", () => {
  describe("and it's facing north", () => {
    it("should face west", () => {
      let robot = new Robot(new Position(0, 0), Face.NORTH);

      let turnedRobot = left(robot);

      expect(turnedRobot.face).toBe(Face.WEST);
    });
  });
  describe("and it's facing south", () => {
    it("should face east", () => {
      let robot = new Robot(new Position(0, 0), Face.SOUTH);

      let turnedRobot = left(robot);

      expect(turnedRobot.face).toBe(Face.EAST);
    });
  });
  describe("and it's facing east", () => {
    it("should face north", () => {
      let robot = new Robot(new Position(0, 0), Face.EAST);

      let turnedRobot = left(robot);

      expect(turnedRobot.face).toBe(Face.NORTH);
    });
  });
  describe("and it's facing west", () => {
    it("should face south", () => {
      let robot = new Robot(new Position(0, 0), Face.WEST);

      let turnedRobot = left(robot);

      expect(turnedRobot.face).toBe(Face.SOUTH);
    });
  });
});

describe("When robot is turned right", () => {
  describe("and it's facing north", () => {
    it("should face east", () => {
      let robot = new Robot(new Position(0, 0), Face.NORTH);

      let turnedRobot = right(robot);

      expect(turnedRobot.face).toBe(Face.EAST);
    });
  });
  describe("and it's facing south", () => {
    it("should face west", () => {
      let robot = new Robot(new Position(0, 0), Face.SOUTH);

      let turnedRobot = right(robot);

      expect(turnedRobot.face).toBe(Face.WEST);
    });
  });
  describe("and it's facing east", () => {
    it("should face south", () => {
      let robot = new Robot(new Position(0, 0), Face.EAST);

      let turnedRobot = right(robot);

      expect(turnedRobot.face).toBe(Face.SOUTH);
    });
  });
  describe("and it's facing west", () => {
    it("should face north", () => {
      let robot = new Robot(new Position(0, 0), Face.WEST);

      let turnedRobot = right(robot);

      expect(turnedRobot.face).toBe(Face.NORTH);
    });
  });
});

describe("When report is called", () => {
  it("should return report", () => {
    let surface = new Surface("table", new Coordinates(0, 0, 5, 5));
    let robot = place(2, 3, Face.NORTH, surface);

    let reportOutput = report(robot);

    expect(reportOutput).toBe("Output: 2,3,NORTH");
  });
});
