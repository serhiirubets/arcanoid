import { MovableComponent } from './MovableComponent';
import { Platform } from './Platform';
import { BaseComponent } from './BaseComponent';
import { Block } from './Block';
import { Game } from './Game';
export declare class Ball extends MovableComponent {
    private game;
    velocity: number;
    dy: number;
    dx: number;
    frame: number;
    private timer?;
    constructor(game: Game);
    private animate;
    start(): void;
    move(): void;
    stop(): void;
    collide(element: BaseComponent): boolean;
    bumpBlock(block: Block): void;
    bumpPlatform(platform: Platform): void;
    collideCanvasSides(): void;
}
