import { Block } from './Block';
import { config } from '../config';

export class Blocks {
  public blocks: Block[] = [];
  constructor(private row: number, private cols: number) {
  }

  create() {
    const { width, height, startX, startY } = config.block;
    for (let row = 0; row < this.row; row++) {
      for (let col = 0; col < this.cols; col++) {
        const block = new Block(width, height);
        const x = (width + config.block.gap) * col + startX;
        const y = (height + config.block.gap) * row + startY;
        block.setCoords(x, y);
        this.blocks.push(block);
      }
    }
  }
}
