const Game = require('./Game');
const Ship = require('../Ship/Ship');
const { ORIENTATIONS } = require('../../utils/constants');

describe('Game', () => {
  test('with 2 players', () => {
    const player1Fleet = [
      new Ship(2, [0, 0]),
    ];
    const player2Fleet = [
      new Ship(3, [0, 1]),
      new Ship(2, [4, 2], ORIENTATIONS.V)
    ];
    const Game1 = new Game(5);
    Game1.addPlayer('Alice', player1Fleet);
    Game1.addPlayer('Bob', player2Fleet);
    Game1.attack('Alice', 0, 1); // Miss
    Game1.attack('Alice', 0, 1); // Already Taken
    Game1.attack('Alice', 0, 0); // Hit
    Game1.attack('Alice', 0, 0); // Already Taken
    Game1.attack('Alice', 1, 0); // Sunk // Win
  });
});
