import { Platform } from './Platform';
import { getCenterXCoord, loadAudio, loadPicture } from '../helpers';
import { Ball } from './Ball';
import { Blocks } from './Blocks';
import { config } from '../config';
import { Key } from '../../types';

import backgroundImage from '../../assets/img/background.png';
import ballImage from '../../assets/img/ball.png';
import platformImage from '../../assets/img/platform.png';
import blockImage from '../../assets/img/block.png';

import bump from '../../assets/sounds/bump.mp3';

const sprites: Record<string, string> = {
  backgroundImage,
  ballImage,
  platformImage,
  blockImage,
};

const sounds: Record<string, string> = {
  bump,
}

export class Game {
  private ctx: CanvasRenderingContext2D;
  private sprites: Record<string, HTMLImageElement> = {};
  private sounds: Record<string, HTMLAudioElement> = {};
  private ball: Ball = new Ball(this);
  private platform: Platform = new Platform(config.platform.width, config.platform.height, this.ball);
  private blocks: Blocks = new Blocks(config.block.rows, config.block.cols);
  private preloadedAssets!: Promise<void>[];
  private isRunning = true;
  private score = 0;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  public start() {
    this.preload();
    this.setEvents();
    this.run();
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

  private setUpAssets() {
    Object.keys(sprites).forEach((key: string) => {
      this.sprites[key] = new Image();
      this.sprites[key].src = sprites[key];
    });

    Object.keys(sounds).forEach((key: string) => {
      this.sounds[key] = new Audio(sounds[key]);
    });
  }

  private preloadImageAssets(): Promise<void>[] {
    return Object.keys(sprites).map((key) => loadPicture(this.sprites[key], sprites[key]));
  }

  private preloadAudioAssets(): Promise<void>[] {
    return Object.keys(sounds).map((key) => loadAudio(this.sounds[key]));
  }

  private preloadAssets(): void {
    this.preloadedAssets = [...this.preloadImageAssets(), ...this.preloadAudioAssets()];
  }

  private preload(): void {
    this.setUpAssets();
    this.blocks.create();
    this.platform.setCoords(getCenterXCoord(this.canvas.width, this.sprites.platformImage.width), 300);
    this.ball.setCoords(getCenterXCoord(this.canvas.width, 20), 280);
    this.preloadAssets();
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
      this.ball.width,
      this.ball.height,
      this.ball.x,
      this.ball.y,
      this.ball.width,
      this.ball.height
    );
  }

  private renderBlocks() {
    this.blocks.blocks.forEach((block) => {
      if (block.active) {
        this.ctx.drawImage(this.sprites.blockImage, block.x, block.y);
      }
    });
  }

  /**
   * Clear all canvas before render new assets
   */
  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private render(): void {
    this.clearCanvas();

    Promise.all(this.preloadedAssets).then(() => {
      this.renderBackground();
      this.renderPlatform();
      this.renderBall();
      this.renderBlocks();
    });
  }

  private collideBlocks() {
    for (const block of this.blocks.blocks) {
      if (block.active && this.ball.collide(block)) {
        this.ball.bumpBlock(block);
        this.addScore();
        this.bumpPlay();
      }
    }
  }

  private collidePlatform() {
    if (this.ball.collide(this.platform)) {
      this.ball.bumpPlatform(this.platform);
      this.bumpPlay();
    }
  }

  public bumpPlay() {
    this.sounds.bump.play();
  }

  private updateState() {
    this.collideBlocks();
    this.collidePlatform();
    this.ball.collideCanvasSides();
    this.platform.collideCanvasSides();
    this.platform.move();
    this.ball.move();
  }

  private stop() {
    this.isRunning = false;
  }

  private run(): void {
    if (this.isRunning) {
      window.requestAnimationFrame(() => {
        this.updateState();
        this.render();
        this.run();
      });
    }
  }

  public end(message: string) {
    this.stop();
    alert(message);
    window.location.reload();
  }

  private addScore() {
    this.score++;

    if (this.score >= this.blocks.blocks.length) {
      this.end('Successfully finish');
    }
  }
}
