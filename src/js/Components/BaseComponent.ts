export class BaseComponent {
  public x = 0;
  public y = 0;

  setCoords(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}
