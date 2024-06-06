export class Coordinates2D {
  #row;
  #column;

  constructor(row, column) {
    if (!this.#isValid(row) || !this.#isValid(column))
      throw new Error('Invalid Coordinate');
    this.#row = row;
    this.#column = column;
  }

  get row() {
    return this.#row;
  }

  get column() {
    return this.#column;
  }

  #isValid(coord) {
    return typeof coord === 'number' && Number.isInteger(coord) && coord >= 0;
  }
}
