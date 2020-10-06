import { Platform } from './Platform';
import backgroundImage from '../../assets/img/background.png';
import ballImage from '../../assets/img/ball.png';
import platformImage from '../../assets/img/platform.png';
import blockImage from '../../assets/img/block.png';
import { loadPicture } from '../loadPicture';
import { getCenterXCoord } from '../helpers';
import { Ball } from './Ball';
import { BaseComponent } from './BaseComponent';
import { Blocks } from './Blocks';
import { config } from '../config';

const sprites: Record<string, string> = {
  backgroundImage,
  ballImage,
  platformImage,
  blockImage,
};

export class Game {
  private ctx: CanvasRenderingContext2D;
  private sprites: Record<string, HTMLImageElement> = {};
  private platform: BaseComponent = new Platform();
  private ball: Ball = new Ball();
  private blocks: Blocks = new Blocks(config.block.rows, config.block.cols);

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

    this.blocks.create();
  }

  private renderPlatform(): void {
    this.platform.setCoords(getCenterXCoord(this.canvas.width, this.sprites.platformImage.width), 300);
    this.ctx.drawImage(this.sprites.platformImage, this.platform.x, this.platform.y);
  }

  private renderBackground(): void {
    this.ctx.drawImage(this.sprites.backgroundImage, 0, 0);
  }

  private renderBall() {
    this.ball.setCoords(getCenterXCoord(this.canvas.width, 20), 280);
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
  }

  private renderBlocks() {
    this.blocks.blocks.forEach((block) => {
      this.ctx.drawImage(this.sprites.blockImage, block.x, block.y);
    });
  }

  private render(): void {
    const promises = Object.keys(sprites).map((key) => loadPicture(this.sprites[key], sprites[key]));

    Promise.all(promises).then(() => {
      this.renderBackground();
      this.renderPlatform();
      this.renderBall();
      this.renderBlocks();
    });
  }

  private run(): void {
    window.requestAnimationFrame(() => {
      this.render();
    });
  }
}
