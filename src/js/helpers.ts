export const getCenterXCoord = (canvasWidth: number, elementWidth: number): number => {
  return canvasWidth / 2 - elementWidth / 2;
};

export const getRandomNumber = (min = 0, max = 0): number => {
  const random = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(random);
}

export function loadPicture(element: HTMLImageElement, src: string): Promise<void> {
  return new Promise<void>((resolve) => {
    element.src = src;
    element.addEventListener('load', () => resolve());
  });
}

export function loadAudio(element: HTMLAudioElement): Promise<void> {
  return new Promise<void>((resolve) => {
    element.addEventListener('canplaythrough', () => resolve(), { once: true });
  });
}
