const Player = require('../Player/Player');

class Game {
  constructor(size) {
    this.isOver = false;
    this.players = [];
    this.size = size;
  }

  addPlayer(name, fleet) {
    this.players.push(new Player(name, fleet, this.size));
  }

  attack(name, x, y) {
    const player = this.players.find(p => p.name === name);
    if (!player) {
      throw new Error(`player "${name}" not found`);
    }
    player.receiveAttack(x, y);
    this.updateStatus();
    this.logStatus();
  }

  logBoard(name, format) {
    const player = this.players.find(p => p.name === name);
    player.logBoard(format);
  }

  logStatus() {
    if (this.isOver) {
      console.log(`Game over. ${this.players[0].name} wins!`);
    }
  }

  updateStatus() {
    this.players.sort((a, b) => b.getHealth() - a.getHealth());
    this.players.forEach(player => {
      if (player.getHealth() === 0) {
        this.isOver = true;
      }
    });
  }
}

module.exports = Game;
