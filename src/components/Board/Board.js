class Board {
  constructor(size, ships = []) {
    if (isNaN(size) || size < 1) {
      throw new Error('size must be numerical and greater than 0');
    }
    this.size = size;

    // Initialize 2D grid
    const grid = Array.from({ length: size }, arr => Array(size).fill(null));

    // Fill grid with ship units
    ships.forEach(ship => {
      const units = ship.getUnits();
      units.forEach(unit => {
        grid[unit.y][unit.x] = unit;
      });
    });
    this.grid = grid;
  }
}

module.exports = Board;
