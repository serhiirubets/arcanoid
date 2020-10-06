import { Platform } from './Platform';
import backgroundImage from '../../assets/img/background.png';
import ballImage from '../../assets/img/ball.png';
import platformImage from '../../assets/img/platform.png';
import { loadPicture } from '../loadPicture';
import { getCenterXCoord } from '../helpers';
import { Ball } from './Ball';
import { BaseComponent } from './BaseComponent';

const sprites: Record<string, string> = {
  backgroundImage,
  ballImage,
  platformImage,
};

export class Game {
  private ctx: CanvasRenderingContext2D;
  private sprites: Record<string, HTMLImageElement> = {};
  private platform: BaseComponent;
  private ball: Ball;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.platform = new Platform();
    this.ball = new Ball();
  }

  public start() {
    this.preload();
    this.run();
  }

  private preload(): void {
    Object.keys(sprites).forEach((key: string) => {
      this.sprites[key] = new Image();
      this.sprites[key].src = sprites[key];
    });
  }

  private render(): void {
    const promises = Object.keys(sprites).map((key) => loadPicture(this.sprites[key], sprites[key]));

    Promise.all(promises).then(() => {
      this.platform.setCoords(getCenterXCoord(this.canvas.width, this.sprites.platformImage.width), 300);
      this.ball.setCoords(getCenterXCoord(this.canvas.width, 20), 280);

      this.ctx.drawImage(this.sprites.backgroundImage, 0, 0);
      this.ctx.drawImage(
        this.sprites.ballImage,
        0,
        0,
        this.ball.frameWidth,
        this.ball.frameHeight,
        this.ball.x,
        this.ball.y,
        this.ball.frameWidth,
        this.ball.frameHeight
      );
      this.ctx.drawImage(this.sprites.platformImage, this.platform.x, this.platform.y);
    });
  }

  private run(): void {
    window.requestAnimationFrame(() => {
      this.render();
    });
  }
}
