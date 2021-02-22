export const getCenterXCoord = (canvasWidth: number, elementWidth: number): number => {
  return canvasWidth / 2 - elementWidth / 2;
};

export const getRandomNumber = (min = 0, max = 0): number => {
  const random = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(random);
}
