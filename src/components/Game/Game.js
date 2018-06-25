const Board = require('./Board');

class Game {
  constructor(size, players = []) {
    this.players = players;
    this.boards = {};

    // Create boards for each player
    players.forEach(player => {
      this.boards[player.id] = new Board(size, player.ships);
    });
  }
}

module.exports = Game;
