import { describe, it, expect } from 'vitest';
import { Gameboard } from '../modules/gameboard';
import { Coordinates2D as Coords2D } from '../modules/coordinate';
import { orientations } from '../modules/constants';
import { Ship } from '../modules/ship';

describe('Gameboard object', () => {
  describe('dimensions', () => {
    it('has a width', () => {
      expect(new Gameboard().width).toBeDefined();
    });
    it('can be constructed with a width', () => {
      expect(new Gameboard(10)).toHaveProperty('width', 10);
    });
    it('can be constructed with a width and a height', () => {
      expect(new Gameboard(10, 15)).toHaveProperty('width', 10);
      expect(new Gameboard(10, 15)).toHaveProperty('height', 15);
    });
  });
  describe('placing ships', () => {
    it('has a place function', () => {
      expect(new Gameboard()).toHaveProperty('place');
      expect(new Gameboard().place).toEqual(expect.any(Function));
    });
    it('can place a ship given a ship object and legal coordinates', () => {
      const size = 10;

      const gameboard = new Gameboard(size);
      for (let i = 0; i < size; ++i) {
        const ship = new Ship(5);
        const onEachRow = new Coords2D(i, 0);

        expect(gameboard.place(ship, onEachRow)).toBe(true);
      }
    });
    it('can place a ship given a ship object, legal coordinates, and an orientation', () => {
      const size = 10;

      const gameboard1 = new Gameboard(size);
      const gameboard2 = new Gameboard(size);
      for (let i = 0; i < size; ++i) {
        const ship1 = new Ship(5);
        const ship2 = new Ship(5);
        const onEachRow = new Coords2D(i, 0);
        const onEachCol = new Coords2D(0, i);

        expect(gameboard1.place(ship1, onEachRow, orientations.row)).toBe(true);
        expect(gameboard2.place(ship2, onEachCol, orientations.col)).toBe(true);
      }
    });
    it('cannot place a ship if the coordinates are beyond the board', () => {
      const boardWidth = 10;
      const boardHeight = 10;
      const gameboard = new Gameboard(boardWidth, boardHeight);

      const ship = new Ship(5);

      const beyondWidth = new Coords2D(0, boardWidth);
      const beyondHeight = new Coords2D(boardHeight, 0);

      expect(gameboard.place(ship, beyondWidth)).toBe(false);
      expect(gameboard.place(ship, beyondHeight)).toBe(false);
    });
    it('cannot place a ship if its length goes beyond the board', () => {
      const boardWidth = 10;
      const boardHeight = 10;
      const gameboard = new Gameboard(boardHeight, boardHeight);

      const length = 5;
      const ship = new Ship(length);

      for (let i = 1; i < length; ++i) {
        let beyondWidth = new Coords2D(0, boardWidth - length + i);
        expect(gameboard.place(ship, beyondWidth, orientations.row)).toBe(
          false,
        );
        let beyondHeight = new Coords2D(boardHeight - length + i, 0);
        expect(gameboard.place(ship, beyondHeight, orientations.col)).toBe(
          false,
        );
      }
    });
    it('only places unique ships', () => {
      const gameboard = new Gameboard();

      const ship = new Ship(5);
      const legalCoords1 = new Coords2D(0, 0);
      const legalCoords2 = new Coords2D(1, 0);

      expect(gameboard.place(ship, legalCoords1)).toBe(true);
      expect(gameboard.place(ship, legalCoords2)).toBe(false);
    });
    it('cannot place two ships at the same coordinates', () => {
      const gameboard = new Gameboard();

      const ship1 = new Ship(5);
      const ship2 = new Ship(5);
      const coords = new Coords2D(0, 0);

      expect(gameboard.place(ship1, coords)).toBe(true);
      expect(gameboard.place(ship2, coords)).toBe(false);
    });
    describe('cannot place two ships at overlapping coordinates', () => {
      it('placed horizontally', () => {
        const size = 10;

        const gameboard = new Gameboard(size);
        for (let row = 0; row < size; ++row) {
          const ship1 = new Ship(5);
          const col = 0;
          const onEachRow = new Coords2D(row, col);

          expect(gameboard.place(ship1, onEachRow, orientations.row)).toBe(
            true,
          );

          for (let i = 0; i < ship1.length; ++i) {
            const ship2 = new Ship(5);
            const overlappingCoords = new Coords2D(row, col + i);
            expect(
              gameboard.place(ship2, overlappingCoords, orientations.row),
            ).toBe(false);
          }
        }
      });
      it('placed vertically', () => {
        const size = 10;

        const gameboard = new Gameboard(size);
        for (let col = 0; col < size; ++col) {
          const ship1 = new Ship(5);
          const row = 0;
          const onEachCol = new Coords2D(row, col);

          expect(gameboard.place(ship1, onEachCol, orientations.col)).toBe(
            true,
          );

          for (let i = 0; i < ship1.length; ++i) {
            const ship2 = new Ship(5);
            const overlappingCoords = new Coords2D(row + i, col);
            expect(
              gameboard.place(ship2, overlappingCoords, orientations.col),
            ).toBe(false);
          }
        }
      });
      it('placed in perpendicular', () => {
        const size = 10;

        for (let row = 0; row < size; ++row) {
          const gameboard = new Gameboard(size);
          const ship1 = new Ship(5);
          const col = 0;
          const onEachRow = new Coords2D(row, col);

          expect(gameboard.place(ship1, onEachRow, orientations.row)).toBe(
            true,
          );

          for (let i = 0; i < ship1.length; ++i) {
            const ship2 = new Ship(5);
            for (let j = 0; j < ship2.length; ++j) {
              const clampedRow = row - j > 0 ? row - j : row;
              const overlappingCoords = new Coords2D(clampedRow, col + i);
              expect(
                gameboard.place(ship2, overlappingCoords, orientations.col),
              ).toBe(false);
            }
          }
        }
        for (let col = 0; col < size; ++col) {
          const gameboard = new Gameboard(size);
          const ship1 = new Ship(5);
          const row = 0;
          const onEachCol = new Coords2D(row, col);

          expect(gameboard.place(ship1, onEachCol, orientations.col)).toBe(
            true,
          );

          for (let i = 0; i < ship1.length; ++i) {
            const ship2 = new Ship(5);
            for (let j = 0; j < ship2.length; ++j) {
              const clampedCol = col - j > 0 ? col - j : col;
              const overlappingCoords = new Coords2D(row + i, clampedCol);
              expect(
                gameboard.place(ship2, overlappingCoords, orientations.row),
              ).toBe(false);
            }
          }
        }
      });
    });
    it('can place ships at different coordinates', () => {
      const size = 10;

      const gameboard1 = new Gameboard(size);
      const gameboard2 = new Gameboard(size);
      for (let i = 0; i < size; ++i) {
        const ship1 = new Ship(5);
        const ship2 = new Ship(5);
        const onEachRow = new Coords2D(i, 0);
        const onEachCol = new Coords2D(0, i);

        expect(gameboard1.place(ship1, onEachRow, orientations.row)).toBe(true);
        expect(gameboard2.place(ship2, onEachCol, orientations.col)).toBe(true);
      }
    });
  });

  it('has a function to receive attacks', () => {
    expect(new Gameboard()).toHaveProperty('attack');
    expect(new Gameboard().attack).toEqual(expect.any(Function));
  });
  it('can trigger a hit on a ship given the coordinate it was placed at', () => {
    const size = 10;
    const length = 5;

    const gameboard = new Gameboard(size);
    for (let i = 0; i < size; ++i) {
      const ship = new Ship(length);
      const coords = new Coords2D(i, 0);

      expect(ship.hitPoints).toBe(length);

      gameboard.place(ship, coords);
      expect(gameboard.attack(coords)).toBe(true);

      expect(ship.hitPoints).toBe(length - 1);
    }
  });
});
