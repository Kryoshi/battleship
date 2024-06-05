import { describe, it, expect } from 'vitest';
import { Coordinate2D } from '../modules/coordinate';

describe('2D coordinate object', () => {
  it('has a row property', () => {
    expect(new Coordinate2D(0, 0)).toHaveProperty('row');
  });
  it('has a column property', () => {
    expect(new Coordinate2D(0, 0)).toHaveProperty('column');
  });
  it('throws error if missing arguments', () => {
    expect(() => new Coordinate2D()).toThrowError();
    expect(() => new Coordinate2D(0)).toThrowError();
  });
  it('throws error with non number arguments', () => {
    expect(() => new Coordinate2D('0', 0)).toThrowError();
    expect(() => new Coordinate2D(0, '0')).toThrowError();
    expect(() => new Coordinate2D(undefined, null)).toThrowError();
    expect(() => new Coordinate2D({}, [])).toThrowError();
  });
  it('throws error with NaN arguments', () => {
    expect(() => new Coordinate2D(0, NaN)).toThrowError();
    expect(() => new Coordinate2D(NaN, 0)).toThrowError();
  });
  it('throws error with non integer arguments', () => {
    expect(() => new Coordinate2D(0, 1.4)).toThrowError();
    expect(() => new Coordinate2D(1.134, 0)).toThrowError();
  });
  it('throws error with negative arguments', () => {
    expect(() => new Coordinate2D(0, -1)).toThrowError();
    expect(() => new Coordinate2D(-1, 0)).toThrowError();
  });
});
