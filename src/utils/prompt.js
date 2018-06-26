// Libs
const _ = require('lodash');
const inquirer = require('inquirer');
const { SHIPS, ORIENTATIONS } = require('./constants');

// Helper functions
function createQuestionForShipPlacement(key, ship) {
  return {
    type: 'input',
    name: `${key}.${ship}`,
    message: `Place your ${ship} ship (e.g. "0,0,H" where the first number is the X-coordinate, the second number is the Y-coordinate, and the third letter is the orientation - use "H" for horizontal and "V" for vertical)`,
    filter: filterPlacementInput,
    validate: validatePlacementInput
  };
}

function filterPlacementInput(value) {
  const splitValue = _.split(value, ',');
  return {
    x: parseFloat(splitValue[0]),
    y: parseFloat(splitValue[1]),
    orientation: String(splitValue[2]).trim()
  };
}

function validatePlacementInput(value) {
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
  askForGameSettings: function() {
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
  },
  askForPlayerSettings: function(key) {
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
      ship => createQuestionForShipPlacement(key, SHIPS[ship])
    ));
    return inquirer.prompt(questions);
  }
}
