import { Platform } from './Platform';
import backgroundImage from '../../assets/img/background.png';
import ballImage from '../../assets/img/ball.png';
import platformImage from '../../assets/img/platform.png';
import blockImage from '../../assets/img/block.png';
import { loadPicture } from '../loadPicture';
import { getCenterXCoord } from '../helpers';
import { Ball } from './Ball';
import { Blocks } from './Blocks';
import { config } from '../config';
import { Key } from '../../types';

const sprites: Record<string, string> = {
  backgroundImage,
  ballImage,
  platformImage,
  blockImage,
};

export class Game {
  private ctx!: CanvasRenderingContext2D;
  private sprites: Record<string, HTMLImageElement> = {};
  private ball: Ball = new Ball();
  private platform: Platform = new Platform(this.ball);
  private blocks: Blocks = new Blocks(config.block.rows, config.block.cols);

  constructor(private canvas: HTMLCanvasElement) {
    this.init();
  }

  public start() {
    this.preload();
    this.run();
  }

  private init() {
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.setEvents();
  }

  private onWindowKeydown = (e: KeyboardEvent): void => {
    if (e.key === Key.arrowLeft || e.key === Key.arrowRight) {
      this.platform.start(e.key);
      return;
    }

    if (e.key === Key.space) {
      this.platform.fire();
    }
  };

  private onWindowKeyup = (): void => {
    this.platform.stop();
  };

  private setEvents(): void {
    window.addEventListener('keydown', this.onWindowKeydown);
    window.addEventListener('keyup', this.onWindowKeyup);
  }

  private preload(): void {
    Object.keys(sprites).forEach((key: string) => {
      this.sprites[key] = new Image();
      this.sprites[key].src = sprites[key];
    });

    this.blocks.create();
    this.platform.setCoords(getCenterXCoord(this.canvas.width, this.sprites.platformImage.width), 300);
    this.ball.setCoords(getCenterXCoord(this.canvas.width, 20), 280);
  }

  private renderPlatform(): void {
    this.ctx.drawImage(this.sprites.platformImage, this.platform.x, this.platform.y);
  }

  private renderBackground(): void {
    this.ctx.drawImage(this.sprites.backgroundImage, 0, 0);
  }

  private renderBall() {
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

  private updateState() {
    this.platform.move();
    this.ball.move();
  }

  private run(): void {
    window.requestAnimationFrame(() => {
      this.updateState();
      this.render();
      this.run();
    });
  }
}
