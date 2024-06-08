//import { Ship } from './ship';
import { orientations } from '../modules/constants';

export class Gameboard {
  #width;
  #height;
  #ships;

  constructor(width = 10, height) {
    this.#width = width;
    this.#height = height ? height : width;
    this.#ships = [];
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  place(ship, coords, orientation = orientations.row) {
    if (
      coords.row >= this.#height ||
      coords.col >= this.#width ||
      (orientation === orientations.row &&
        coords.col + ship.length > this.#width) ||
      (orientation === orientations.col &&
        coords.row + ship.length > this.#height)
    ) {
      return false;
    }
    for (const placedShip of this.#ships) {
      if (
        placedShip.ship === ship ||
        (placedShip.coords.row === coords.row &&
          placedShip.coords.col === coords.col)
      ) {
        return false;
      }
    }

    this.#ships.push({ ship, coords });
    return true;
  }

  /*   attack() {
    this.#ships[0].hit();
    return true;
  } */
}
