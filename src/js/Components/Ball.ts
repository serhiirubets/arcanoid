import { MovableComponent } from './MovableComponent';

export class Ball extends MovableComponent {
  public readonly frameWidth = 20;
  public readonly frameHeight = 20;
  private dy = 0;

  public jump(): void {
    this.dy = -this.velocity / 2;
  }

  public move() {
    if (this.dy) {
      this.y += this.dy;
    }
  }

  public stop(): void {
    this.dx = 0;
    this.dy = 0;
  }
}
