const Board = require('../Board/Board');

class Player {
  constructor(name, fleet, boardSize) {
    this.name = name;
    this.fleet = fleet;
    this.board = new Board(boardSize, fleet);
  }

  getHealth() {
    return this.fleet.reduce((acc, ship) => acc + ship.getHealth(), 0);
  }

  logBoard(format) {
    this.board.logBoard(format);
  }

  receiveAttack(x, y) {
    this.board.receiveAttack(x, y);
  }
}

module.exports = Player;
