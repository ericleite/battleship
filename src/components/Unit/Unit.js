const { MESSAGES } = require('../../utils/constants');

class Unit {
  constructor() {
    this.attacks = 0;
    this.status = '';
  }

  logStatus() {
    if (this.status.length) {
      console.log(MESSAGES[this.status]);
    }
  }

  receiveAttack() {
    this.attacks++;
    this.updateStatus();
    this.logStatus();
  }

  updateStatus() {
    if (this.attacks === 1) {
      this.status = 'MISS';
    } else if (this.attacks > 1) {
      this.status = 'TAKEN';
    }
  }
}

Unit.constructor.name = 'Unit';

module.exports = Unit;
