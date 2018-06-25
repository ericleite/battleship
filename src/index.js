// Libs
const prompt = require('prompt');
const Game = require('./components/Game/Game');

// Initialize new game
const Battleship = new Game();

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
