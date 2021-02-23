export declare class Game {
    private canvas;
    private ctx;
    private sprites;
    private sounds;
    private ball;
    private platform;
    private blocks;
    private preloadedAssets;
    private isRunning;
    private score;
    constructor(canvas: HTMLCanvasElement);
    private setFonts;
    start(): void;
    private onWindowKeydown;
    private onWindowKeyup;
    private setEvents;
    private setUpAssets;
    private preloadImageAssets;
    private preloadAudioAssets;
    private preloadAssets;
    private preload;
    private renderPlatform;
    private renderBackground;
    private renderBall;
    private renderBlocks;
    /**
     * Clear all canvas before render new assets
     */
    private clearCanvas;
    private render;
    private collideBlocks;
    private collidePlatform;
    bumpPlay(): void;
    private updateState;
    private stop;
    private run;
    end(message: string): void;
    private addScore;
    private renderScoreText;
}
