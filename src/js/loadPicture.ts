export function loadPicture(picture: HTMLImageElement, src: string): Promise<void> {
  return new Promise<void>((resolve) => {
    picture.src = src;
    picture.addEventListener('load', () => resolve());
  });
}
