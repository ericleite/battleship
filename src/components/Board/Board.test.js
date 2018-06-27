const Board = require('./Board');
const Ship = require('../Ship/Ship');
const Unit = require('../Unit/Unit');
const { ORIENTATIONS } = require('../../utils/constants');

describe('Board', () => {
  describe('constructor', () => {
    test('initializes as expected', () => {
      const Ship1 = new Ship(3, [0, 0], ORIENTATIONS.V);
      const ship1Units = Ship1.getUnits();
      const Ship2 = new Ship(3, [1, 1]);
      const ship2Units = Ship2.getUnits();
      const Board1 = new Board(4, [Ship1, Ship2]);
      expect(Board1.grid).toEqual([
        [ship1Units[0], new Unit(), new Unit(), new Unit()],
        [ship1Units[1], ship2Units[0], ship2Units[1], ship2Units[2]],
        [ship1Units[2], new Unit(), new Unit(), new Unit()],
        [new Unit(), new Unit(), new Unit(), new Unit()]
      ]);
    });
  });

  describe('placeShip', () => {
    test('does not throw when ship is on the boundary', () => {
      const Ship1 = new Ship(4, [0, 0]);
      const Board1 = new Board(4);
      const Ship2 = new Ship(4, [0, 0], ORIENTATIONS.V);
      const Board2 = new Board(4);
      expect(() => { Board1.placeShip(Ship1, Board1.grid); }).not.toThrow();
      expect(() => { Board2.placeShip(Ship2, Board2.grid); }).not.toThrow();
    });

    test('throws when ship is out of bounds', () => {
      const Ship1 = new Ship(4, [0, 0]);
      const Board1 = new Board(3);
      const Ship2 = new Ship(4, [0, 0], ORIENTATIONS.V);
      const Board2 = new Board(3);
      expect(() => { Board1.placeShip(Ship1, Board1.grid); }).toThrow();
      expect(() => { Board2.placeShip(Ship2, Board2.grid); }).toThrow();
    });

    test('throws when ship overlaps with another', () => {
      const Ship1 = new Ship(3, [0, 0]);
      const Ship2 = new Ship(2, [2, 0], ORIENTATIONS.V);
      const Board1 = new Board(4);
      expect(() => { Board1.placeShip(Ship1, Board1.grid); }).not.toThrow();
      expect(() => { Board1.placeShip(Ship2, Board2.grid); }).toThrow();
    });
  });

  describe('_convertGridToText', () => {
    const Board1 = new Board(3, [new Ship(2, [0, 0]), new Ship(2, [2, 1], ORIENTATIONS.V)]);
    Board1.receiveAttack(0, 0);
    Board1.receiveAttack(1, 1);
    Board1.receiveAttack(2, 2);

    test('"attacks" format', () => {
      const testGrid = Board1._convertGridToText(Board1.grid, 'attacks');
      const expectedGrid = [
        'X - -',
        '- O -',
        '- - X'
      ];
      expect(testGrid).toEqual(expectedGrid);
    });

    test('"placement" format', () => {
      const testGrid = Board1._convertGridToText(Board1.grid, 'placement');
      const expectedGrid = [
        '~ ~ -',
        '- - ~',
        '- - ~'
      ];
      expect(testGrid).toEqual(expectedGrid);
    });
  });

})
