const ShipUnit = require('./ShipUnit');

describe('ShipUnit', () => {

  test('initializes correctly', () => {
    const TestUnit = new ShipUnit();
    expect(TestUnit.health).toBe(1);
  });

  test('unit receives attack', () => {
    const TestUnit = new ShipUnit();
    TestUnit.receiveAttack();
    expect(TestUnit.health).toBe(0);
    expect(TestUnit.status).toBe('HIT');
    TestUnit.receiveAttack();
    expect(TestUnit.health).toBe(0);
    expect(TestUnit.status).toBe('TAKEN');
  });

});
