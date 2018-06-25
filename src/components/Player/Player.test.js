const Player = require('./Player');
const Ship = require('../Ship/Ship');
const ShipUnit = require('../ShipUnit/ShipUnit');
const { ORIENTATIONS } = require('../../utils/constants');

describe('Player', () => {

  describe('getHealth', () => {
    test('returns player health', () => {
      const fleet = [
        new Ship(3, [0, 0]),
        new Ship(2, [3, 0], ORIENTATIONS.V),
        new Ship(4, [0, 2])
      ];
      const Player1 = new Player('Player 1', fleet, 5);
      expect(Player1.getHealth()).toBe(9);
    });
  });

  describe('receiveAttack', () => {
    test('lowers player health by 1 and logs action result', () => {
      const fleet = [
        new Ship(3, [0, 0])
      ];
      const Player1 = new Player('Player 1', fleet, 5);
      Player1.receiveAttack(0, 0)
      expect(Player1.getHealth()).toBe(2);
    });
  });

});
