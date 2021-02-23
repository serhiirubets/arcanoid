import { MovableComponent } from './MovableComponent';
import { Ball } from './Ball';
import { Key } from '../../types';
export declare class Platform extends MovableComponent {
    private ball;
    constructor(ball: Ball);
    start(key: Key.arrowRight | Key.arrowLeft): void;
    move(): void;
    fire(): void;
    stop(): void;
    getTouchOffset(touchX: number): number;
    collideCanvasSides(): void;
}
