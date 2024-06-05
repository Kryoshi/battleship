import { describe, it, expect } from 'vitest';
import { Gameboard } from '../modules/gameboard';
import { Ship } from '../modules/ship';

describe('Gameboard object', () => {
  it('has a ships property', () => {
    expect(new Gameboard()).toHaveProperty('ships');
  });
  it('has a place function', () => {
    expect(new Gameboard().place).toEqual(expect.any(Function));
  });
  describe('can place a ship', () => {
    it('contains ship after placement', () => {
      const gameboard = new Gameboard();
      const length = 5;
      const ship = new Ship(length);

      //gameboard.place(ship, coordinates, direction);

      expect(gameboard.ships).toContain(ship);
    });
    it('only places with coordinates specified');
    it('only places with direction specified');
    it('only places ships');
  });
});
