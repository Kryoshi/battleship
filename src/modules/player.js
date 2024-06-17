import { Gameboard } from './gameboard';
/* import { Ship } from './ship';
import { orientations } from './constants';
import { Coordinates2D as Coords2D } from './coordinate'; */

export class Player {
  gameboard;
  #isComputer;

  constructor(isComputer = false) {
    this.gameboard = new Gameboard();
    this.#isComputer = isComputer;
  }

  get isComputer() {
    return this.#isComputer;
  }

  play() {}
}
