import { describe, it, expect } from 'vitest';
import { Gameboard } from '../modules/gameboard';
import { Player } from '../modules/player';

describe('Player object', () => {
  it('has a gameboard', () => {
    expect(new Player()).toHaveProperty('gameboard');
    expect(new Player().gameboard).toBeInstanceOf(Gameboard);
  });
  it('can be a computer player', () => {
    expect(new Player()).toHaveProperty('isComputer');
    expect(typeof new Player().isComputer).toBe('boolean');
  });
  it('is a human player by default', () => {
    expect(new Player().isComputer).toBe(false);
  });
  it('can be constructed as a computer player', () => {
    expect(new Player(false)).toHaveProperty('isComputer', false);
    expect(new Player(true)).toHaveProperty('isComputer', true);
  });
  it('has a play function', () => {
    expect(new Player()).toHaveProperty('play');
    expect(new Player().play).toEqual(expect.any(Function));
  });
  it.skip('can be computer controlled', () => {});
});
