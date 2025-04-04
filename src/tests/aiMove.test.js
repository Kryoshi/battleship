import { describe, it, expect } from 'vitest';
import { aiAttack } from '../modules/aiMove';
import { Coordinates2D } from '../modules/coordinate';

describe('AI Move function', () => {
  it('takes a width and height and returns a 2D coordinate object', () => {
    const width = 10;
    const height = 10;
    expect(aiAttack(width, height)).toBeInstanceOf(Coordinates2D);
  });
  it('generates a coordinate within the board', () => {
    const width = 10;
    const height = 10;
    expect(aiAttack(width, height).row).toBeLessThan(height);
    expect(aiAttack(width, height).col).toBeLessThan(width);
  });
  it('does not generate the same coordinate twice', () => {
    const attack = aiAttack(10, 10);
    const secondAttack = aiAttack(10, 10);
    expect(attack).not.toStrictEqual(secondAttack);
  });
});
