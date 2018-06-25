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

test('damageUnit reduces unit health', () => {
  function damageUnitWithoutPower() {
    Cruiser.damageUnit();
  }
  const Cruiser = createCruiser();
  Cruiser.damageUnit(3);
  expect(Cruiser._units.length).toBe(2);
  expect(Cruiser._destroyedUnits.length).toBe(1);
  expect(Cruiser._destroyedUnits[0].state.health).toBe(0);
  expect(damageUnitWithoutPower).toThrow();
});

test('getHealth returns total ship health', () => {
  const Cruiser = createCruiser();
  expect(Cruiser.getHealth()).toBe(3);
});

test('getUnits returns all ship units', () => {
  const Cruiser = createCruiser();
  Cruiser.damageUnit(1);
  expect(Cruiser.getUnits().length).toBe(3);
});
