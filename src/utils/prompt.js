// Libs
const _ = require('lodash');
const inquirer = require('inquirer');
const { SHIPS, ORIENTATIONS } = require('./constants');

function askForGameSettings() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'settings.opponent',
      message: 'Who would you like to play against: human or computer?',
      default: 'human',
      choices: ['human', 'computer']
    },
    {
      type: 'input',
      name: 'settings.size',
      message: 'Enter size of battleship board',
      default: 10,
      filter: Number,
      validate: value => {
        if (isNaN(value)) {
          return 'Enter a number'
        }
        if (value < 1 || value > 1000) {
          return 'Size must be greater than 0 and less than 1000';
        }
        return true;
      }
    }
  ]);
}

function askForPlayerSettings(player) {
  let questions = [];
  questions.push(
    {
      type: 'input',
      name: `${player}.name`,
      message: 'Enter your name',
      default: player,
      filter: String
    }
  );
  questions = questions.concat(Object.keys(SHIPS).map(
    ship => _createQuestionForShipPlacement(player, SHIPS[ship])
  ));
  return inquirer.prompt(questions);
}

function askForPlayerAttack(player) {
  let questions = [];
  questions.push(
    {
      type: 'input',
      name: 'attack',
      message: `${player.name}, enter coordinates of your attack (e.g. "0,0" where the first number is the X-coordinate and the second number is the Y-coordinate)`,
      filter: _filterCoordinateInput,
      validate: _validateCoordinateInput(player)
    }
  );
  return inquirer.prompt(questions);
}

async function runAttackSequence(game) {
  let currentPlayerIndex = 0;
  while (!game.isOver) {
    const nextPlayerIndex = (currentPlayerIndex + 1) % game.players.length;
    const attacker = game.players[currentPlayerIndex];
    const opponent = game.players[nextPlayerIndex];
    const { attack } = await askForPlayerAttack(attacker);
    game.attack(opponent.name, attack.x, attack.y);
    game.logBoard(opponent.name);
    currentPlayerIndex = nextPlayerIndex;
  }
}

// Helper functions
function _createQuestionForShipPlacement(player, ship) {
  return {
    type: 'input',
    name: `${player}.${ship}`,
    message: `Place your ${ship} (e.g. "0,0,H" where the first number is the X-coordinate, the second number is the Y-coordinate, and the third letter is the orientation - use "H" for horizontal and "V" for vertical)`,
    filter: _filterPlacementInput,
    validate: _validatePlacementInput
  };
}

function _filterCoordinateInput(value) {
  const splitValue = _.split(value, ',');
  return {
    x: parseFloat(splitValue[0]),
    y: parseFloat(splitValue[1])
  };
}

function _filterPlacementInput(value) {
  const splitValue = _.split(value, ',');
  return {
    x: parseFloat(splitValue[0]),
    y: parseFloat(splitValue[1]),
    orientation: String(splitValue[2]).trim()
  };
}

function _validateCoordinateInput(player) {
  if (!(player && player.board && player.board.grid)) {
    throw new Error('Player does not have a valid board');
  }
  const upperXBound = player.board.grid[0].length;
  const upperYBound = player.board.grid.length;
  return function(value) {
    if (isNaN(value.x) || isNaN(value.y)) {
      return 'Enter a number'
    }
    if (value.x < 0 || value.x > upperXBound) {
      return `X-coordinate must be at least 0 and no more than ${upperXBound}`;
    }
    if (value.y < 0 || value.y > upperYBound) {
      return `Y-coordinate must be at least 0 and no more than ${upperYBound}`;
    }
    return true;
  }
}

function _validatePlacementInput(value) {
  if (_.size(value) !== 3) {
    return 'Value must be formatted like "0,0,H"';
  }
  if (isNaN(value.x)) {
    return 'The X coordinate must be an integer';
  }
  if (isNaN(value.y)) {
    return 'The Y coordinate must be an integer';
  }
  const availableOrientations = Object.keys(ORIENTATIONS);
  if (!availableOrientations.includes(value.orientation)) {
    return `The orientation must be one of ${availableOrientations.map(o => `"${o}"`).join(' or ')}`;
  }
  return true;
}

// Exports
module.exports = {
  askForGameSettings,
  askForPlayerSettings,
  askForPlayerAttack,
  runAttackSequence
}
