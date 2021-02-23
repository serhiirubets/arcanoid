import { Block } from './Block';
export declare class Blocks {
    private row;
    private cols;
    blocks: Block[];
    constructor(row: number, cols: number);
    create(): void;
}
