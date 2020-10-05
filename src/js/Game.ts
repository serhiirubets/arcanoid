import backgroundImage from '../assets/img/background.png';
import ballImage from '../assets/img/ball.png';
import platformImage from '../assets/img/platform.png';
import { loadPicture } from './loadPicture';

const sprites: Record<string, string> = {
  backgroundImage,
  ballImage,
  platformImage,
};

export class Game {
  private ctx: CanvasRenderingContext2D;
  private sprites: Record<string, HTMLImageElement> = {};

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
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
      this.ctx.drawImage(this.sprites.backgroundImage, 0, 0);
      this.ctx.drawImage(this.sprites.ballImage, 0, 0);
      this.ctx.drawImage(this.sprites.platformImage, 0, 0);
    });
  }

  private run(): void {
    window.requestAnimationFrame(() => {
      this.render();
    });
  }
}
