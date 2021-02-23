import { BaseComponent } from './BaseComponent';

export class Block extends BaseComponent {
  active = true;

  bump() {
    this.active = false;
  }
}
