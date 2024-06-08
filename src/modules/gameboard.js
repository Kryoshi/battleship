//import { Ship } from './ship';
import { orientations } from '../modules/constants';
import { Coordinates2D } from './coordinate';

export class Gameboard {
  #width;
  #height;
  #ships;
  #grid;

  constructor(width = 10, height) {
    this.#width = width;
    this.#height = height ? height : width;
    this.#ships = [];
    this.#grid = [];
    for (let row = 0; row < this.#height; ++row) {
      this.#grid[row] = [];
      for (let col = 0; col < this.#width; ++col) {
        this.#grid[row][col] = null;
      }
    }
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  place(ship, coords, orientation = orientations.row) {
    const horizontalGrowth = orientation === orientations.row ? 1 : 0;
    const verticalGrowth = orientation === orientations.col ? 1 : 0;
    const gridCoords = [];
    for (let i = 0; i < ship.length; ++i) {
      const row = coords.row + verticalGrowth * i;
      const col = coords.col + horizontalGrowth * i;
      if (!Array.isArray(this.#grid[row]) || this.#grid[row][col] !== null) {
        return false;
      }
      gridCoords.push(new Coordinates2D(row, col));
    }

    for (const coords of gridCoords) {
      this.#grid[coords.row][coords.col] = ship;
    }
    for (const placedShip of this.#ships) {
      if (placedShip === ship) return false;
    }

    this.#ships.push(ship);
    return true;
  }

  attack() {
    this.#ships[0].hit();
    return true;
  }
}
