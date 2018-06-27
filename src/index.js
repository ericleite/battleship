// Libs
const BattleshipGame = require('./components/Game/Game');
const {
  askForGameSettings,
  askForPlayerSettings,
  askForPlayerAttack,
  runAttackSequence
} = require('./utils/prompt');
const { addPlayer } = require('./utils/game');

async function startGame() {
  console.log('Welcome to Battleship!');

  // Get user-defined game config
  const { settings } = await askForGameSettings();

  // Initialize game
  const Game = new BattleshipGame(settings.size);

  // Add players
  await addPlayer(Game, 'player1');
  if (settings.opponent === 'human') {
    await addPlayer(Game, 'player2');
  } else {
    await addPlayer(Game);
  }

  // Run attack sequence
  await runAttackSequence(Game);
}

startGame();
