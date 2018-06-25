const Game = require('./Game');
const Ship = require('../Ship/Ship');
const { ORIENTATIONS } = require('../../utils/constants');

describe('Game', () => {

  describe('with 2 players', () => {
    const player1Fleet = [
      new Ship(2, [0, 0]),
      new Ship(2, [2, 1])
    ];
    const player2Fleet = [
      new Ship(3, [0, 1]),
      new Ship(2, [4, 2], ORIENTATIONS.V)
    ];
    const Game1 = new Game(5);
    Game1.addPlayer('Alice', player1Fleet);
    Game1.addPlayer('Bob', player2Fleet);

    describe('attack', () => {
      test('non-existant player', () => {
        expect(() => { Game1.attack('Cat', 0, 1); }).toThrow();
      });
      test('miss', () => {
        Game1.attack('Alice', 0, 1);
      });
      test('already taken after miss', () => {
        Game1.attack('Alice', 0, 1);
      });
      test('hit', () => {
        Game1.attack('Alice', 0, 0);
      });
      test('already taken after hit', () => {
        Game1.attack('Alice', 0, 0);
      });
      test('sunk', () => {
        Game1.attack('Alice', 1, 0);
      });
      test('win', () => {
        Game1.attack('Alice', 2, 1);
        Game1.attack('Alice', 3, 1);
      });
    });
  });
});
