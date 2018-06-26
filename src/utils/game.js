const _ = require('lodash');
const Ship = require('../components/Ship/Ship');
const { ORIENTATIONS, SHIPS, SHIP_SIZE_BY_TYPE } = require('./constants');

module.exports = {
  buildFleet: function(player) {
    const ships = _.pick(player, _.values(SHIPS))
    return _.map(
      ships,
      ({ x, y, orientation }, type) => new Ship(SHIP_SIZE_BY_TYPE[type], [x, y], ORIENTATIONS[orientation])
    );
  }
};
