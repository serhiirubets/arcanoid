import { MovableComponent } from './MovableComponent';
import { getRandomNumber } from '../helpers';
import { Platform } from './Platform';
import { BaseComponent } from './BaseComponent';
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

  public bumbBlock(block: Block) {
    this.dy *= -1;
    block.bump();
  }

  public bumbPlatform(platform: Platform) {
    this.dy *= -1;
    const touchX = this.x + this.width / 2;
    this.dx = this.velocity * platform.getTouchOffset(touchX);
  }
}
