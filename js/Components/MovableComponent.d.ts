import { BaseComponent } from './BaseComponent';
export declare abstract class MovableComponent extends BaseComponent {
    velocity: number;
    dx: number;
    abstract stop(): void;
    abstract move(): void;
    abstract collideCanvasSides(): void;
}
