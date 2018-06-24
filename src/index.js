// Libs
const prompt = require('prompt');
const Battleship = require('./components/Battleship/Battleship.js');

// Initialize new game
const Game = new Battleship();

// Schemas for user input
const promptSchema = {
  properties: {
    mode: {
      description: 'Who would you like to play against: human or computer?',
      type: 'string',
      pattern: /^(human|computer)$/,
      message: 'You must enter either "human" or "computer".',
      required: true
    }
  }
};
const userInput = {};
console.log('Welcome to Battleship!');
prompt.start();
prompt.get(promptSchema, function (err, result) {
  console.log(result);
});
