export class BaseComponent {
  public x = 0;
  public y = 0;
  constructor(public width: number, public height: number) {}

  setCoords(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}
