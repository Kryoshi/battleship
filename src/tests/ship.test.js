import { describe, it, expect } from 'vitest';
import { Ship } from '../modules/ship';

describe('Ship object', () => {
  it('has length', () => {
    const length = 5;
    expect(new Ship(length)).toHaveProperty('length', 5);
  });

  it('has hitpoints', () => {
    const length = 5;
    expect(new Ship(length)).toHaveProperty('hitPoints', 5);
  });

  it('can be hit', () => {
    const length = 5;
    const ship = new Ship(length);
    expect(ship.hit).toBeDefined();
    ship.hit();
    expect(ship).toHaveProperty('hitPoints', 4);
    ship.hit();
    expect(ship).toHaveProperty('hitPoints', 3);
  });

  it('cannot have negative hitpoints', () => {
    const l = 2;
    const ship = new Ship(l);
    for (let i = 0; i < l + 1; ++i) ship.hit();
    expect(ship).toHaveProperty('hitPoints', 0);
  });

  it('can be sunk', () => {
    const l = 2;
    const ship = new Ship(l);
    expect(ship).toHaveProperty('isSunk', false);
    for (let i = 0; i < l; ++i) ship.hit();
    expect(ship).toHaveProperty('isSunk', true);

    ship.hit();
    expect(ship).toHaveProperty('isSunk', true);
  });
});
