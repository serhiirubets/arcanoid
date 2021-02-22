import { MovableComponent } from './MovableComponent';
import { getRandomNumber } from '../helpers';
import { Block } from './Block';

export class Ball extends MovableComponent {
  private dy = 0;
  protected dx = 0;

  public start(): void {
    const velocity = this.velocity / 2;
    this.dy = -velocity;
    this.dx = getRandomNumber(-velocity, velocity);
  }

  public move() {
    if (this.dx) {
      this.x += this.dx;
    }
    if (this.dy) {
      this.y += this.dy;
    }
  }

  public stop(): void {
    this.dx = 0;
    this.dy = 0;
  }

  public collide(block: Block): boolean {
    const x = this.x + this.dx;
    const y = this.y + this.dy;
    if (
      // right side ball
      x + this.width > block.x &&
      // left side ball
      x < block.x + block.width &&
      // bottom side ball
      y + this.height > block.y &&
      // top side ball
      y < block.y + block.height
    ) {
      return true
    }

    return false;
  }

  public bumbBlock() {
    // block: Block
    // this.dy = -this.dy;
    this.dy *= -1;
  }
}
