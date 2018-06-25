class Ship {
  constructor(units = [], power = 1) {
    this._units = units;
    this._destroyedUnits = [];
    this.power = 1;
  }

  getHealth() {
    return this._units.reduce((acc, unit) => {
      return acc + unit.getHealth();
    }, 0);
  }

  getUnits() {
    return [
      ...this._units,
      ...this._destroyedUnits
    ];
  }

  damageUnit(power) {
    if (isNaN(power)) {
      throw new Error('power is needed to damage a unit');
    }
    if (this._units.length < 1) {
      throw new Error('no units left to damage');
      return;
    }
    const unit = this._units.pop();
    unit.damage(power);
    if (unit.state.health === 0) {
      this._destroyedUnits.push(unit);
    }
  }
}

module.exports = Ship;
