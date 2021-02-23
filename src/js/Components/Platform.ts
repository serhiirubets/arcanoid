import { MovableComponent } from './MovableComponent';
import { Ball } from './Ball';
import { Key } from '../../types';
import { config } from '../config';

export class Platform extends MovableComponent {
  private ball: Ball | null;

  constructor(ball: Ball) {
    super(config.platform.width, config.platform.height);
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

  public collideCanvasSides() {
    const x = this.x + this.dx;
    const platformLeftSide = x;
    const platformRightSide = platformLeftSide + this.width;
    const canvasLeftSide = 0;
    const canvasRightSide = config.game.width;

    if (platformLeftSide < canvasLeftSide || platformRightSide > canvasRightSide)  {
      this.dx = 0;
    }
  }
}
