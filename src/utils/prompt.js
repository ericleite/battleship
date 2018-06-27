// Libs
const _ = require('lodash');
const inquirer = require('inquirer');
const { COMPUTER, SHIPS, ORIENTATIONS } = require('./constants');

// Helpers
function _createQuestionForShipPlacement(player, ship) {
  return {
    type: 'input',
    name: `${player}.${ship}`,
    message: `Place your ${ship} (e.g. "1,1,H" where the first number is the X-coordinate, the second number is the Y-coordinate, and the third letter is the orientation - use "H" for horizontal and "V" for vertical)`,
    filter: _filterPlacementInput,
    validate: _validatePlacementInput
  };
}

function _filterCoordinateInput(value) {
  const splitValue = _.split(value, ',');
  return {
    x: parseFloat(splitValue[0]) - 1,
    y: parseFloat(splitValue[1]) - 1
  };
}

function _filterPlacementInput(value) {
  const splitValue = _.split(value, ',');
  return {
    x: parseFloat(splitValue[0]) - 1,
    y: parseFloat(splitValue[1]) - 1,
    orientation: String(splitValue[2]).trim()
  };
}

function _validateCoordinateInput(player) {
  const boardBounds = player.getBoardBounds();
  return function(value) {
    if (isNaN(value.x) || isNaN(value.y)) {
      return 'Enter a number'
    }
    if (value.x < 0 || value.x > boardBounds.x) {
      return `X-coordinate must be between 1 and ${boardBounds.x}`;
    }
    if (value.y < 0 || value.y > boardBounds.y) {
      return `Y-coordinate must be between 1 and ${boardBounds.y}`;
    }
    return true;
  }
}

function _validatePlacementInput(value) {
  if (_.size(value) !== 3) {
    return 'Value must be formatted like "1,1,H"';
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
        if (value < 5 || value > 1000) {
          return 'Size must be between 5 and 1000';
        }
        return true;
      }
    }
  ]);
}

function askForPlayerSettings(key) {
  let questions = [];
  questions.push(
    {
      type: 'input',
      name: `${key}.name`,
      message: 'Enter your name',
      default: key,
      filter: String
    }
  );
  questions = questions.concat(Object.keys(SHIPS).map(
    ship => _createQuestionForShipPlacement(key, SHIPS[ship])
  ));
  return inquirer.prompt(questions);
}

function askForPlayerAttack(player) {
  let questions = [];
  questions.push(
    {
      type: 'input',
      name: 'attack',
      message: `${player.name}, enter coordinates of your attack (e.g. "1,1" where the first number is the X-coordinate and the second number is the Y-coordinate)`,
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
    let attack;
    if (attacker.name === COMPUTER) {
      attack = getRandomCoordinates(opponent);
    } else {
      const settings = await askForPlayerAttack(attacker);
      attack = settings.attack;
    }
    game.attack(opponent.name, attack.x, attack.y);
    game.logBoard(opponent.name);
    currentPlayerIndex = nextPlayerIndex;
  }
}

module.exports = {
  askForGameSettings,
  askForPlayerSettings,
  askForPlayerAttack,
  runAttackSequence
};

// Circular dependencies
const { getRandomCoordinates } = require('./game');
