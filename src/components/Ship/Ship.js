class Ship {
  constructor(units = [], power = 1) {
    this.validateUnits(units);
    this.units = units;
    this.power = 1;
  }

  getHealth() {
    return this.units.reduce((acc, unit) => {
      return acc + unit.getHealth();
    }, 0);
  }

  getUnits() {
    return this.units;
  }

  /**
   * Validates the arrangement of the given units.
   * X values should be sequential integers with constant y or vice versa.
   * @param {Array} units - Array of ShipUnits to validate.
   */
  validateUnits(units) {
    if (units.length > 1) {
      const unitsSortedByX = [...units].sort((a, b) => a.x - b.x);
      const unitsSortedByY = [...units].sort((a, b) => a.y - b.y);
      const xSpread = unitsSortedByX[unitsSortedByX.length - 1].x - unitsSortedByX[0].x;
      const ySpread = unitsSortedByY[unitsSortedByY.length - 1].y - unitsSortedByY[0].y;
      const xIsSequential = xSpread/(unitsSortedByX.length - 1) === 1;
      const yIsSequential = ySpread/(unitsSortedByY.length - 1) === 1;
      if (!(xIsSequential || yIsSequential)) {
        throw new Error('units must have sequential positions');
      }
      if (!(xSpread === 0 || ySpread === 0)) {
        throw new Error('units must be aligned horizontally or vertically');
      }
    }
  }
}

module.exports = Ship;
