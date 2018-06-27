// Libs
const _ = require('lodash');

// Utils
const { COMPUTER, ORIENTATIONS, SHIPS, SHIP_SIZE_BY_TYPE } = require('./constants');

// Components
const Ship = require('../components/Ship/Ship');

// Exports
async function addPlayer(game, playerKey = COMPUTER) {
  let playerSchema;
  if (playerKey === COMPUTER) {
    playerSchema = {
      name: COMPUTER
    };
    _.each(
      _.values(SHIPS),
      (ship, i) => playerSchema[ship] = {
        x: 0,
        y: i,
        orientation: ORIENTATIONS.H
      }
    );
  } else {
    const settings = await askForPlayerSettings(playerKey);
    playerSchema = settings[playerKey];
  }
  const fleet = buildFleet(playerSchema);
  game.addPlayer(playerSchema.name, fleet);
  // console.log(`${playerSchema.name}, your board now looks like this (tildes are ship units):`);
  // game.logBoard(playerSchema.name, 'placement');
}

function buildFleet(playerSchema) {
  const ships = _.pick(playerSchema, _.values(SHIPS))
  return _.map(
    ships,
    ({ x, y, orientation }, type) => new Ship(SHIP_SIZE_BY_TYPE[type], [x, y], ORIENTATIONS[orientation])
  );
}

function getRandomCoordinates(player) {
  const boardBounds = player.getBoardBounds();
  return {
    x: _.random(0, boardBounds.x - 1),
    y: _.random(0, boardBounds.y - 1)
  };
}

module.exports = {
  addPlayer,
  buildFleet,
  getRandomCoordinates
};

// Circular dependencies
const { askForPlayerSettings } = require('./prompt');
