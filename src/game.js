import Player from './components/player.js';
import Board from './components/board.js';
import { getRandomPiece } from './components/piece.js';
import { directions, calculatePoints } from './components/helpers.js';
import KeyboardListener from './tools/keyboardListener.js';

export default class Game {
  constructor() {
    this.settings = {
      boardWidth: 10,
      boardHeight: 20,
      scale: 40,
      interval: 750,
      difficultyAdjustment: 10,
      levelThreshold: 1,
    };

    this.board = new Board(
      this.settings.boardWidth,
      this.settings.boardHeight,
      this.settings.scale
    );

    this.state = {
      isRunning: false,
      lastTickCount: 0,
      level: 1,
      totalClearedRows: 0,
      dropCounter: 0,
      dropInterval: this.settings.interval,
    };

    this.scoreBoard = document.getElementById('ScoreBoard');
    this.scene = document.getElementById('GameBoard');
    this.nextWindow = document.getElementById('NextDisplay');

    this.nextPieceContainer = new Board(5, 5, this.settings.scale);
    this.nextPiece = null;
    this.prepareNewPiece();

    this.player = new Player('Player 1');

    this.movementKeyHandler = new KeyboardListener([
      {
        key: ['ArrowUp', 'e', 'E'],
        handler: this.rotatePiece.bind(this, directions.RIGHT),
      },
      {
        key: ['q', 'Q'],
        handler: this.rotatePiece.bind(this, directions.RIGHT),
      },
      {
        key: ['ArrowLeft', 'a', 'A'],
        handler: this.movePiece.bind(this, directions.LEFT),
      },
      {
        key: ['ArrowRight', 'd', 'D'],
        handler: this.movePiece.bind(this, directions.RIGHT),
      },
      { key: ['ArrowDown', 's', 'S'], handler: this.movePieceDown.bind(this) },
      { key: ' ', handler: this.dropPiece.bind(this) },
    ]);
    this.gameKeyHandler = new KeyboardListener([
      { key: 'Escape', handler: this.togglePause.bind(this) },
    ]);
  }

  start() {
    this.board.render(this.scene);
    this.drawNextDisplay();
    this.resetPlayerPiece();
    this.toggleGameLoop(true);
  }

  togglePause() {
    this.toggleGameLoop();
    this.scene.classList.toggle('paused', !this.state.isRunning);
  }

  prepareNewPiece() {
    this.nextPiece = getRandomPiece();
    this.nextPiece.setPosition(
      Math.floor((5 - this.nextPiece.width) / 2),
      Math.floor((5 - this.nextPiece.height) / 2)
    );
    this.nextPieceContainer.clear();
    this.nextPieceContainer.placePiece(this.nextPiece);
    this.nextPieceContainer.draw();
  }

  loop(ticks = 0) {
    if (!this.state.isRunning) return false;

    let timePassed = ticks - this.state.lastTickCount;
    this.state.lastTickCount = ticks;
    this.state.dropCounter += timePassed;
    if (this.state.dropCounter > this.state.dropInterval) {
      this.movePieceDown();
      this.state.dropCounter = 0;
    }
    this.board.draw();
    requestAnimationFrame(this.loop.bind(this));
  }

  toggleGameLoop(runIt = !this.state.isRunning) {
    this.state.isRunning = runIt;
    if (this.state.isRunning) {
      this.loop();
      this.movementKeyHandler.toggle(true);
    } else {
      this.movementKeyHandler.toggle(false);
    }
  }

  updateScoreBoard(points) {
    this.scoreBoard.textContent = points;
  }

  resetPlayerPiece() {
    this.player.piece = this.nextPiece;
    this.prepareNewPiece();
    this.player.piece.setPosition(
      Math.floor((this.settings.boardWidth - this.player.piece.width) / 2),
      0
    );
    this.board.placePiece(this.player.piece);
    if (this.board.isBlocked(this.player.piece)) {
      this.toggleGameLoop(false);
    }
    this.board.draw();
  }

  handleBottomCollision() {
    const clearedRowCount = this.board.collectRows();
    if (clearedRowCount > 0) {
      this.state.totalClearedRows += clearedRowCount;
      this.player.addPoints(calculatePoints(clearedRowCount));
      this.updateScoreBoard(this.player.points);
      const levelSkip = Math.floor(
        clearedRowCount / this.settings.levelThreshold
      );
      if (levelSkip > 0) {
        this.state.level += levelSkip;
        this.state.dropInterval -=
          this.settings.difficultyAdjustment * levelSkip;
      }
    }
    this.resetPlayerPiece();
  }

  rotatePiece(dir) {
    this.board.rotatePiece(this.player.piece, dir);
  }

  movePiece(dir) {
    this.board.movePiece(this.player.piece, dir);
  }

  movePieceDown() {
    if (this.board.movePieceDown(this.player.piece)) {
      this.handleBottomCollision();
    }
  }

  dropPiece() {
    this.board.dropPiece(this.player.piece);
    this.handleBottomCollision();
  }

  drawNextDisplay() {
    this.nextWindow.style.width = `${5 * this.settings.scale}px`;
    this.nextWindow.style.height = `${5 * this.settings.scale}px`;

    this.nextPieceContainer.render(this.nextWindow);
    this.nextPieceContainer.draw();
  }
}
