import { BaseComponent } from './BaseComponent';

export abstract class MovableComponent extends BaseComponent {
  public velocity = 6;
  protected dx = 0;

  abstract stop(): void;
  abstract move(): void;
}
