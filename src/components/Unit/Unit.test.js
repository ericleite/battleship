const Unit = require('./Unit');
const { MESSAGES } = require('../../utils/constants');

describe('Unit', () => {

  test('initializes correctly', () => {
    const TestUnit = new Unit();
    expect(TestUnit.attacks).toBe(0);
    expect(TestUnit.status).toBe('');
  });

  test('unit receives attack', () => {
    const TestUnit = new Unit();
    TestUnit.receiveAttack();
    expect(TestUnit.attacks).toBe(1);
    expect(TestUnit.status).toBe('MISS');
    TestUnit.receiveAttack();
    expect(TestUnit.status).toBe('TAKEN');
  });

});
