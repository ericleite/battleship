class Board {
  constructor(size, ships = []) {
    this.size = size;
    this.grid = this.createGrid(size, ships);
  }

  /**
   * Creates an N by N grid filled with ShipUnits and null values.
   * @param {Number} size - Size of the grid.
   * @param {Array} ships - Ships containing units to place.
   */
  createGrid(size, ships) {
    if (isNaN(size) || size < 1) {
      throw new Error('size must be numerical and greater than 0');
    }

    // Initialize 2D grid
    const grid = Array.from({ length: size }, arr => Array(size).fill(null));

    // Fill grid with ship units
    ships.forEach(ship => {
      const units = ship.getUnits();
      units.forEach(unit => {
        grid[unit.y][unit.x] = unit;
      });
    });

    return grid;
  }
}

module.exports = Board;
