const Ship = require('./Ship');

function createCruiser() {
  return new Ship(3);
}

describe('Ship', () => {

  test('initializes', () => {
    expect(createCruiser).not.toThrow();
  });

  test('getHealth returns total ship health', () => {
    const Cruiser = createCruiser();
    expect(Cruiser.getHealth()).toBe(3);
  });

  test('getUnits returns all ship units', () => {
    const Cruiser = createCruiser();
    expect(Cruiser.getUnits().length).toBe(3);
  });

});
