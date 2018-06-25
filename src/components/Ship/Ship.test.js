const Ship = require('./Ship');
const ShipUnit = require('../ShipUnit/ShipUnit');

function createCruiser() {
  const cruiserUnits = [
    new ShipUnit(0, 0),
    new ShipUnit(0, 1),
    new ShipUnit(0, 2)
  ];
  return new Ship(cruiserUnits);
}

function createCruiserWithNonSequentialXUnits() {
  const cruiserUnits = [
    new ShipUnit(0, 1),
    new ShipUnit(2, 1),
    new ShipUnit(3, 1)
  ];
  return new Ship(cruiserUnits);
}

function createCruiserWithNonSequentialYUnits() {
  const cruiserUnits = [
    new ShipUnit(1, 0),
    new ShipUnit(1, 2),
    new ShipUnit(1, 3)
  ];
  return new Ship(cruiserUnits);
}

function createDiagonalCruiser() {
  const cruiserUnits = [
    new ShipUnit(0, 0),
    new ShipUnit(1, 1),
    new ShipUnit(2, 2)
  ];
  return new Ship(cruiserUnits);
}

function createRandomCruiser() {
  const cruiserUnits = [
    new ShipUnit(0, 0),
    new ShipUnit(1, 5),
    new ShipUnit(4, 3)
  ];
  return new Ship(cruiserUnits);
}

test('initializes correctly', () => {
  expect(createCruiser).not.toThrow();
  expect(createCruiserWithNonSequentialXUnits).toThrow();
  expect(createCruiserWithNonSequentialYUnits).toThrow();
  expect(createDiagonalCruiser).toThrow();
  expect(createRandomCruiser).toThrow();
});

test('getHealth returns total ship health', () => {
  const Cruiser = createCruiser();
  expect(Cruiser.getHealth()).toBe(3);
});

test('getUnits returns all ship units', () => {
  const Cruiser = createCruiser();
  expect(Cruiser.getUnits().length).toBe(3);
});
