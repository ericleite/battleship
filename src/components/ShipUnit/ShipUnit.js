const Unit = require('../Unit/Unit');

class ShipUnit extends Unit {
  constructor(ship, health = 1) {
    super();
    this.health = health;
    this.ship = ship;
  }

  getHealth() {
    return this.health;
  }

  receiveAttack(damage = 1) {
    super.receiveAttack();
    let reducedHealth = this.health - damage;
    if (reducedHealth < 0) {
      reducedHealth = 0;
    }
    this.health = reducedHealth;
    if (this.ship) {
      this.ship.updateStatus();
      this.ship.logStatus();
    }
  }

  updateStatus() {
    if (this.attacks === 1) {
      this.status = 'HIT';
    } else if (this.attacks > 1) {
      this.status = 'TAKEN';
    }
  }
}

ShipUnit.constructor.name = 'ShipUnit';

module.exports = ShipUnit;
