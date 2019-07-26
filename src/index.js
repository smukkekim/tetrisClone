import KeyboardListener from './tools/keyboardListener.js';
import { getRandomPiece } from './components/piece.js';
import Player from './components/player.js';
import Board from './components/board.js';

const dir = Object.create(null);
dir.LEFT = -1;
dir.RIGHT = 1;

const movementKeyHandler = new KeyboardListener();
movementKeyHandler.addListener(['ArrowUp', 'e', 'E'], rotatePieceRight);
movementKeyHandler.addListener('ArrowLeft', movePieceLeft);
movementKeyHandler.addListener('ArrowRight', movePieceRight);
movementKeyHandler.addListener('ArrowDown', dropPiece);
movementKeyHandler.addListener(['q', 'Q'], rotatePieceLeft);

const gameKeyHandler = new KeyboardListener();
gameKeyHandler.addListener(' ', togglePause);

const game = Object.create(null);
game.isRunning = false;
game.boardWidth = 10;
game.boardHeight = 20;
game.scale = 40;
game.scoreBoard = document.getElementById('ScoreBoard');
game.scene = document.getElementById('GameBoard');
game.nextWindow = document.getElementById('NextDisplay');
game.board = new Board(game.boardWidth, game.boardHeight, game.scale);
game.nextPieceContainer = new Board(5, 5, game.scale);
prepareNewPiece();
game.player = new Player('Player 1');
game.dropCounter = 0;
game.dropInterval = 750;
game.difficultyAdjustment = 10;
game.levelThreshold = 1;
game.lastTickCount = 0;
game.level = 1;
game.totalClearedRows = 0;

function rotatePieceRight() {
  game.board.rotatePiece(game.player.piece, dir.RIGHT);
}

function rotatePieceLeft() {
  game.board.rotatePiece(game.player.piece, dir.LEFT);
}

function movePieceRight() {
  game.board.movePiece(game.player.piece, dir.RIGHT);
}

function movePieceLeft() {
  game.board.movePiece(game.player.piece, dir.LEFT);
}

function dropPiece() {
  if (game.board.dropPiece(game.player.piece)) {
    const clearedRowCount = game.board.collectRows();
    if (clearedRowCount > 0) {
      game.totalClearedRows += clearedRowCount;
      game.player.addPoints(calculatePoints(clearedRowCount));
      updateScoreBoard(game.player.points);
      const levelSkip = Math.floor(clearedRowCount / game.levelThreshold);
      if (levelSkip > 0) {
        game.level += levelSkip;
        game.dropInterval -= game.difficultyAdjustment * levelSkip;
      }
    }
    resetPlayerPiece();
  }
}

function togglePause() {
  toggleGameLoop();
  console.log(game.isRunning);
  game.scene.classList.toggle('paused', !game.isRunning);
}

function toggleGameLoop(state) {
  if (typeof state !== 'boolean') {
    state = !game.isRunning;
  }
  game.isRunning = state;
  if (game.isRunning) {
    loop();
    movementKeyHandler.toggle(true);
  } else {
    movementKeyHandler.toggle(false);
  }
}

function resetPlayerPiece() {
  game.player.piece = game.nextPiece;
  prepareNewPiece();
  game.player.piece.setPosition(
    Math.floor((game.boardWidth - game.player.piece.width) / 2),
    0
  );
  game.board.placePiece(game.player.piece);
  if (game.board.isBlocked(game.player.piece)) {
    toggleGameLoop(false);
  }
  game.board.draw();
}

function prepareNewPiece() {
  game.nextPiece = getRandomPiece();
  game.nextPiece.setPosition(
    Math.floor((5 - game.nextPiece.width) / 2),
    Math.floor((5 - game.nextPiece.height) / 2)
  );
  game.nextPieceContainer.clear();
  game.nextPieceContainer.placePiece(game.nextPiece);
  game.nextPieceContainer.draw();
}

function drawBoard() {
  game.scene.style.width = game.boardWidth * game.scale + 'px';
  game.scene.style.height = game.boardHeight * game.scale + 'px';

  game.board.render(game.scene);
}

function drawNextDisplay() {
  game.nextWindow.style.width = 5 * game.scale + 'px';
  game.nextWindow.style.height = 5 * game.scale + 'px';

  game.nextPieceContainer.render(game.nextWindow);
  game.nextPieceContainer.draw();
}

function updateScoreBoard(points) {
  game.scoreBoard.textContent = points;
}

function loop(ticks = 0) {
  if (!game.isRunning) return false;

  let timePassed = ticks - game.lastTickCount;
  game.lastTickCount = ticks;
  game.dropCounter += timePassed;
  if (game.dropCounter > game.dropInterval) {
    dropPiece();
    game.dropCounter = 0;
  }
  game.board.draw();
  requestAnimationFrame(loop);
}

function calculatePoints(rowCount) {
  let result = 0;
  for (let i = rowCount; i > 0; i--) {
    result += i * 10;
    console.log(result);
  }
  return result;
}

function startGame() {
  drawBoard();
  drawNextDisplay();
  resetPlayerPiece();
  toggleGameLoop(true);
}

startGame();
