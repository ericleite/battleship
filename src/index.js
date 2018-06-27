// Utils
const { COMPUTER } = require('./utils/constants');
const { addPlayer } = require('./utils/game');
const { askForGameSettings, runAttackSequence } = require('./utils/prompt');

// Components
const BattleshipGame = require('./components/Game/Game');

async function startNewGame() {
  console.log('Welcome to Battleship!');
  try {
    // Initialize game
    const { settings } = await askForGameSettings();
    const Game = new BattleshipGame(settings.size);
    // Add players
    await addPlayer(Game, 'player1');
    if (settings.opponent === COMPUTER) {
      await addPlayer(Game);
    } else {
      await addPlayer(Game, 'player2');
    }
    // Run attack sequence
    await runAttackSequence(Game);
  } catch (e) {
    console.error(e);
  }
}

startNewGame();
