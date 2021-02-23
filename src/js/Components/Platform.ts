import { MovableComponent } from './MovableComponent';
import { Ball } from './Ball';
import { Key } from '../../types';

export class Platform extends MovableComponent {
  private ball: Ball | null;

  constructor(width: number, height: number, ball: Ball) {
    super(width, height);
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
      this.ball.start();
      this.ball = null;
    }
  }

  public stop(): void {
    this.dx = 0;
  }

  getTouchOffset(touchX: number) {
    const rightSide = this.x + this.width;
    const diff = rightSide - touchX;
    const offset = this.width - diff;

    // this.width - 2 (diff and offset
    // offset - ? ( (offset + 2) / 2 )
    const result = (offset * 2) / this.width; // from 0 to 2, but we need from -1 to 1
    return result - 1; // but we need from -1 to 1. So we make -1
  }
}
