const _ = require('lodash');
const Ship = require('../components/Ship/Ship');
const { ORIENTATIONS, SHIPS, SHIP_SIZE_BY_TYPE } = require('./constants');
const { askForPlayerSettings } = require('./prompt');

async function addPlayer(game, playerKey) {
  let player = {
    name: 'computer'
  };
  if (playerKey) {
    const settings = await askForPlayerSettings(playerKey);
    player = settings[playerKey];
  }
  const fleet = buildFleet(player);
  game.addPlayer(player.name, fleet);
  console.log(`${player.name}, your board now looks like this (tildes are ship units):`);
  game.logBoard(player.name, 'placement');
}

function buildFleet(player) {
  const ships = _.pick(player, _.values(SHIPS))
  return _.map(
    ships,
    ({ x, y, orientation }, type) => new Ship(SHIP_SIZE_BY_TYPE[type], [x, y], ORIENTATIONS[orientation])
  );
}

module.exports = {
  addPlayer,
  buildFleet
};
