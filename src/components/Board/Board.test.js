const Board = require('./Board');
const Ship = require('../Ship/Ship');
const ShipUnit = require('../ShipUnit/ShipUnit');

function createBoard() {
  const cruiser1Units = [
    new ShipUnit(0, 0),
    new ShipUnit(0, 1)
  ];
  const Cruiser1 = new Ship(cruiser1Units);

  const cruiser2Units = [
    new ShipUnit(2, 1),
    new ShipUnit(3, 1),
    new ShipUnit(4, 1)
  ];
  const Cruiser2 = new Ship(cruiser2Units);

  return new Board([Cruiser1, Cruiser2]);
}

test('initializes correctly', () => {
  const cruiser1Units = [
    new ShipUnit(0, 0),
    new ShipUnit(0, 1)
  ];
  const Cruiser1 = new Ship(cruiser1Units);

  const cruiser2Units = [
    new ShipUnit(1, 1),
    new ShipUnit(2, 1),
    new ShipUnit(3, 1)
  ];
  const Cruiser2 = new Ship(cruiser2Units);

  const Board1 = new Board(4, [Cruiser1, Cruiser2]);

  expect(Board1.grid).toEqual([
    [cruiser1Units[0], null, null, null],
    [cruiser1Units[1], cruiser2Units[0], cruiser2Units[1], cruiser2Units[2]],
    [null, null, null, null],
    [null, null, null, null]
  ]);
});
