const Player = require('../Player/Player');

class Game {
  constructor(size) {
    this.size = size;
    this.players = [];
    this.over = false;
  }

  addPlayer(name, fleet) {
    this.players.push(new Player(name, fleet, this.size));
  }

  attack(name, x, y) {
    const player = this.players.find(p => p.name === name);
    player.receiveAttack(x, y);
    this.updateStatus();
    this.logStatus();
  }

  logStatus() {
    if (this.over) {
      console.log(`Game over. ${this.players[0].name} wins!`);
    }
  }

  updateStatus() {
    this.players.sort((a, b) => b.getHealth() - a.getHealth());
    this.players.forEach(player => {
      if (player.getHealth() === 0) {
        this.over = true;
      }
    });
  }
}

module.exports = Game;
