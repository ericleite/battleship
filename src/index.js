// Libs
const Game = require('./components/Game/Game');
const {
  askForGameSettings,
  askForPlayerSettings
} = require('./utils/prompt');
const { buildFleet } = require('./utils/game');

async function startGame() {
  console.log('Welcome to Battleship!');

  // Get user-defined game config
  const { settings } = await askForGameSettings();

  // Initialize game
  const Game1 = new Game(settings.size);

  // Build player 1 fleet
  const { player1 } = await askForPlayerSettings('player1');
  const player1Fleet = buildFleet(player1);
  Game1.addPlayer(player1.name, player1Fleet);
  Game1.logBoard(player1.name);

  if (settings.opponent === 'human') {
    // Build player 2 fleet if human was selected
    const { player2 } = await askForPlayerSettings('player2');
    const player2Fleet = buildFleet(player2);
    Game1.addPlayer(player2.name, player2Fleet);
    Game1.logBoard(player2.name);
  } else {
    // Build computer fleet if human was selected
  }

  // TODO: Build attack interface
}

startGame();
