export class Coordinates2D {
  #row;
  #col;

  constructor(row, col) {
    if (!this.#isValid(row) && !this.#isValid(col)) {
      throw new Error(`Invalid Coordinate: Row: ${row} & Col: ${col}`);
    }
    if (!this.#isValid(row)) {
      throw new Error(`Invalid Coordinate: Row: ${row}`);
    }
    if (!this.#isValid(col)) {
      throw new Error(`Invalid Coordinate: Col: ${col}`);
    }
    this.#row = row;
    this.#col = col;
  }

  get row() {
    return this.#row;
  }

  get col() {
    return this.#col;
  }

  #isValid(coord) {
    return typeof coord === 'number' && Number.isInteger(coord) && coord >= 0;
  }
}
