export class Ship {
  #length;
  #hitPoints;

  constructor(length) {
    this.#length = length;
    this.#hitPoints = length;
  }

  get length() {
    return this.#length;
  }

  get hitPoints() {
    return this.#hitPoints;
  }

  get isSunk() {
    return !this.#hitPoints;
  }

  hit() {
    if (this.#hitPoints) this.#hitPoints--;
  }
}
