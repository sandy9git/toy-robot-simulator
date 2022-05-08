export class Coordinates {
  constructor(
    public minX: number,
    public minY: number,
    public maxX: number,
    public maxY: number
  ) {}
}

export class Surface {
  constructor(public name: string, public coordinates: Coordinates) {}
}
