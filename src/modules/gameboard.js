export class Gameboard {
  ships;

  constructor() {
    this.ships = [];
  }

  place(ship) {
    this.ships.push(ship);
  }
}
