const ShipUnit = require('../ShipUnit/ShipUnit');
const { MESSAGES, ORIENTATIONS } = require('../../utils/constants');

class Ship {
  constructor(
    size,
    coordinates = [0, 0],
    orientation = ORIENTATIONS.H,
    units = []
  ) {
    this._units = units;
    if (units.length === 0) {
      this._units = this.makeUnits(size);
    }
    this.size = size;
    this.orientation = orientation;
    this.x = coordinates[0];
    this.y = coordinates[1];
    this.sunk = false;
  }

  getHealth() {
    return this._units.reduce((acc, unit) => {
      return acc + unit.getHealth();
    }, 0);
  }

  getUnits() {
    return this._units;
  }

  makeUnits(amount) {
    const units = [];
    for (let i = 0; i < amount; i++) {
      units.push(new ShipUnit(this));
    }
    return units;
  }

  logStatus() {
    if (this.sunk) {
      console.log(MESSAGES.SUNK);
    }
  }

  updateStatus() {
    if (this.getHealth() === 0) {
      this.sunk = true;
    }
  }

}

module.exports = Ship;
