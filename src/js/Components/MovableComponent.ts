import { BaseComponent } from './BaseComponent';

export abstract class MovableComponent extends BaseComponent {
  public velocity = 6;
  public dx = 0;

  abstract stop(): void;
  abstract move(): void;
  // abstract start(): void;
  abstract collideCanvasSides(): void;
}
