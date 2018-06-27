// Libs
const _ = require('lodash');
const Unit = require('../Unit/Unit');
const ShipUnit = require('../ShipUnit/ShipUnit');
const { ORIENTATIONS } = require('../../utils/constants');

class Board {
  constructor(size, fleet = []) {
    this.grid = this.createGrid(size, fleet);
  }

  // Public Methods
  // --------------

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
    const grid = [];
    for (let i = 0; i < size; i++) {
      grid[i] = [];
      for (let j = 0; j < size; j++) {
        grid[i][j] = new Unit();
      }
    }
    // Place fleet
    fleet.forEach(ship => this.placeShip(ship, grid));
    return grid;
  }

  /**
   * Gets the X and Y bounds of the board.
   */
  getBounds() {
    if (!this.hasValidGrid()) {
      throw new Error('board is not valid');
    }
    return {
      x: this.grid[0].length,
      y: this.grid.length
    }
  }

  /**
   * Checks if the grid is formatted correctly.
   */
  hasValidGrid() {
    return (
      _.isArray(this.grid) &&
      _.isArray(this.grid[0]) &&
      _.size(this.grid) === _.size(this.grid[0])
    );
  }

  /**
   * Logs texual representation of a grid.
   * @param {String} format - Format of grid text.
   */
  logBoard(format) {
    this._convertGridToText(this.grid, format).forEach(grid => {
      console.log(grid);
    });
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
      throw new Error(`ship ${axis} coordinate must be between 1 and ${upperBound + 1}`);
    }

    for (let i = 0; i < ship.size; i++) {
      let xOffset = ship[axis] + i;
      let yOffset = ship.y;
      if (ship.orientation === ORIENTATIONS.V) {
        xOffset = ship.x;
        yOffset = ship[axis] + i;
      }
      if (grid[yOffset][xOffset].constructor.name === 'ShipUnit') {
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

  // Private Methods
  // ---------------

  /**
   * Converts a Unit class into a textual representation.
   * @param {Class} unit - Unit class.
   * @param {String} format - Format of text output. One of ["attacks", "placement"].
   * @returns {String} - The text representation of this unit.
   */
  _convertUnitToText(unit, format = 'attacks') {
    switch (format) {
      case 'attacks':
        if (unit.attacks === 0) {
          return '-';
        } else {
          if (unit.constructor.name === 'Unit') {
            return 'O';
          } else {
            return 'X';
          }
        }
        break;
      case 'placement':
        if (unit.constructor.name === 'Unit') {
          return '-';
        } else {
          return '~';
        }
        break;
    }
  }

  /**
   * Converts a 2D grid into a textual representation of the grid.
   * @param {Array[Array]} grid - 2D grid array to convert to text.
   * @param {String} format - Format of grid text.
   * @returns {Array[Array]} - 2D grid array with text instead of Units.
   */
  _convertGridToText(grid, format) {
    return grid.map(
      row => row.map(
        unit => this._convertUnitToText(unit, format)
      ).join(' ')
    );
  }
}

module.exports = Board;
