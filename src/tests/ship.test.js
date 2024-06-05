import { describe, it, expect } from 'vitest';
import { Ship } from '../modules/ship';

describe('Ship object', () => {
  it('has length', () => {
    const length = 5;
    expect(new Ship(length)).toHaveProperty('length', length);
  });

  it('has hitpoints', () => {
    const length = 5;
    expect(new Ship(length)).toHaveProperty('hitPoints', length);
  });

  it('can be hit', () => {
    const length = 5;
    const ship = new Ship(length);
    expect(ship.hit).toBeDefined();
    ship.hit();
    expect(ship).toHaveProperty('hitPoints', length - 1);
    ship.hit();
    expect(ship).toHaveProperty('hitPoints', length - 2);
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

    //When hit for max hitpoints
    for (let i = 0; i < l; ++i) ship.hit();
    expect(ship).toHaveProperty('isSunk', true);

    //When hit beyond max hitpoints
    ship.hit();
    expect(ship).toHaveProperty('isSunk', true);
  });
});
