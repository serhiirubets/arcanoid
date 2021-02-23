import { MovableComponent } from './MovableComponent';
import { getRandomNumber } from '../helpers';
import { Platform } from './Platform';
import { BaseComponent } from './BaseComponent';
import { Block } from './Block';
import { config } from '../config';
import { Game } from './Game';

export class Ball extends MovableComponent {
  public velocity = 3;
  public dy = 0;
  public dx = 0;

  constructor(private game: Game) {
    super(config.ball.width, config.ball.height)
  }

  public start(): void {
    this.dy = -this.velocity;
    this.dx = getRandomNumber(-this.velocity, this.velocity);
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

  public collide(element: BaseComponent): boolean {
    const x = this.x + this.dx;
    const y = this.y + this.dy;
    if (
      // right side ball
      x + this.width > element.x &&
      // left side ball
      x < element.x + element.width &&
      // bottom side ball
      y + this.height > element.y &&
      // top side ball
      y < element.y + element.height
    ) {
      return true
    }

    return false;
  }

  public bumpBlock(block: Block) {
    this.dy *= -1;
    block.bump();
  }

  public bumpPlatform(platform: Platform) {
    if (platform.dx) {
      this.x += platform.dx;
    }
    if (this.dy > 0) {
      this.dy = -this.velocity;
      const touchX = this.x + this.width / 2;
      this.dx = this.velocity * platform.getTouchOffset(touchX);
    }
  }

  public collideCanvasSides() {
    const x = this.x + this.dx;
    const y = this.y + this.dy;

    const ballLeftSide = x;
    const ballRightSide = ballLeftSide + this.width;
    const ballTopSide = y;
    const ballBottomSide = ballTopSide + this.height;

    const canvasLeftSide = 0;
    const canvasRightSide = config.game.width;
    const canvasTopSide = 0;
    const canvasBottomSide = config.game.height;

    if (ballLeftSide < canvasLeftSide)  {
      this.x = 0;
      this.dx = this.velocity;
      this.game.bumpPlay();
    } else if (ballRightSide > canvasRightSide) {
      this.x = canvasRightSide - this.width;
      this.dx = -this.velocity;
      this.game.bumpPlay();
    } else if (ballTopSide < canvasTopSide) {
      this.dy = this.velocity;
      this.y = 0;
      this.game.bumpPlay();
    } else if (ballBottomSide > canvasBottomSide) {
      this.game.bumpPlay();
      this.game.end('Game is finished');
    }
  }
}
