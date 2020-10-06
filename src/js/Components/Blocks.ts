import { BaseComponent } from './BaseComponent';
import { Block } from './Block';
import { config } from '../config';

export class Blocks extends BaseComponent {
  public blocks: Block[] = [];
  constructor(private row: number, private cols: number) {
    super();
  }

  create() {
    for (let row = 0; row < this.row; row++) {
      for (let col = 0; col < this.cols; col++) {
        const block = new Block();
        const x = (config.block.width + config.block.gap) * col + config.block.startX;
        const y = (config.block.height + config.block.gap) * row + config.block.startY;
        block.setCoords(x, y);
        this.blocks.push(block);
      }
    }
  }
}
