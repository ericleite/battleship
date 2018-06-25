const Player = require('./Player');
const Ship = require('../Ship/Ship');
const ShipUnit = require('../ShipUnit/ShipUnit');

function createCruiser(startingX) {
  const cruiserUnits = [
    new ShipUnit(startingX, 0),
    new ShipUnit(startingX, 1),
    new ShipUnit(startingX, 2)
  ];
  return new Ship(cruiserUnits);
}

test('getHealth returns player health', () => {
  const ships = [
    createCruiser(0),
    createCruiser(1),
    createCruiser(2)
  ];
  const player1 = new Player('Player 1', ships);
  expect(player1.getHealth()).toBe(9);
});
