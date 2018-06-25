const ShipUnit = require('./ShipUnit');

test('initializes correctly', () => {
  const TestUnit = new ShipUnit(0, 1);
  expect(TestUnit.x).toBe(0);
  expect(TestUnit.y).toBe(1);
  expect(TestUnit.state.health).toBe(1);
});

test('destroy unit', () => {
  const TestUnit = new ShipUnit(0, 0);
  TestUnit.damage();
  expect(TestUnit.state.health).toBe(0);
});
