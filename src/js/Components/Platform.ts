import { MovableComponent } from './MovableComponent';
import { Ball } from './Ball';
import { Key } from '../../types';

export class Platform extends MovableComponent {
  private ball: Ball | null;

  constructor(ball: Ball) {
    super();
    this.ball = ball;
  }

  public start(key: Key.arrowRight | Key.arrowLeft): void {
    if (key === Key.arrowLeft) {
      this.dx = -this.velocity;
    } else {
      this.dx = this.velocity;
    }
  }

  public move(): void {
    if (this.dx) {
      this.x += this.dx;
      if (this.ball) {
        this.ball.x += this.dx;
      }
    }
  }

  public fire(): void {
    if (this.ball) {
      this.ball.jump();
      this.ball = null;
    }
  }

  public stop(): void {
    this.dx = 0;
  }
}
