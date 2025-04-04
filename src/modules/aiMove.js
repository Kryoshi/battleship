import { Coordinates2D } from './coordinate';

export const aiAttack = (width, height) => {
  const row = Math.floor(Math.random() * height);
  const col = Math.floor(Math.random() * width);
  return new Coordinates2D(row, col);
};
