const uuidv4 = require('uuid/v4');

class Player {
  constructor(name, ships) {
    this.name = name;
    this.ships = ships;
    this.id = uuidv4();
  }

  getHealth() {
    return this.ships.reduce((acc, ship) => acc + ship.getHealth(), 0);
  }
}

module.exports = Player;
