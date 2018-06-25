const Unit = require('../Unit/Unit');
const ShipUnit = require('../ShipUnit/ShipUnit');
const { ORIENTATIONS } = require('../../utils/constants');

class Board {
  constructor(size, fleet = []) {
    this.grid = this.createGrid(size, fleet);
  }

  /**
   * Creates an N by N grid filled with Units.
   * @param {Number} size - Size of the grid.
   * @param {Array} fleet - Fleet of ships to place.
   */
  createGrid(size, fleet) {
    if (isNaN(size) || size < 1) {
      throw new Error('size must be numerical and greater than 0');
    }
    // Initialize 2D grid
    const grid = Array.from({ length: size }, arr => Array(size).fill(new Unit()));
    // Place fleet
    fleet.forEach(ship => this.placeShip(ship, grid));
    return grid;
  }

  /**
   * Adds a ship to a grid.
   * @param {Object} ship - Ship class.
   * @param {Array[Array]} grid - 2D grid to add to.
   */
  placeShip(ship, grid) {
    const units = ship.getUnits();
    let axis = 'x';
    let upperBound = grid[0].length - ship.size;

    if (ship.orientation === ORIENTATIONS.V) {
      axis = 'y';
      upperBound = grid.length - ship.size;
    }

    if (ship[axis] < 0 || ship[axis] > upperBound) {
      throw new Error(`ship ${axis} coordinate must be between 0 and ${upperBound}`);
    }

    for (let i = 0; i < ship.size; i++) {
      let xOffset = ship[axis] + i;
      let yOffset = ship.y;
      if (ship.orientation === ORIENTATIONS.V) {
        xOffset = ship.x;
        yOffset = ship[axis] + i;
      }
      if (grid[yOffset][xOffset].name === 'ShipUnit') {
        throw new Error(`ship overlaps with existing ship at [${xOffset}, ${yOffset}]`);
      }
      grid[yOffset][xOffset] = units[i];
    }
  }

  /**
   * Receives attack on a grid unit.
   * @param {Number} x - X-coordinate of attack.
   * @param {Number} y - Y-coordinate of attack.
   */
  receiveAttack(x, y) {
    this.grid[y][x].receiveAttack();
  }
}

module.exports = Board;
