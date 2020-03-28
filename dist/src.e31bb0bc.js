// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"components/player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Player = /*#__PURE__*/function () {
  function Player(name) {
    _classCallCheck(this, Player);

    this.name = name;
    this.piece = null;
    this.points = 0;
  }

  _createClass(Player, [{
    key: "addPoints",
    value: function addPoints(points) {
      this.points += points;
    }
  }]);

  return Player;
}();

var _default = Player;
exports.default = _default;
},{}],"components/slot.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Slot = /*#__PURE__*/function () {
  function Slot(size) {
    _classCallCheck(this, Slot);

    this.isLocked = false;
    this.color = 'transparent';
    this.el = document.createElement('div');
    this.el.style.width = "".concat(size, "px");
    this.el.style.height = "".concat(size, "px");
    this.el.classList.add('slot');
  }

  _createClass(Slot, [{
    key: "render",
    value: function render(x, y) {
      this.el.style.left = "".concat(x, "px");
      this.el.style.top = "".concat(y, "px");
      this.el.style.backgroundColor = this.color;
    }
  }, {
    key: "fill",
    value: function fill(color) {
      this.color = color;
    }
  }, {
    key: "clear",
    value: function clear(force) {
      if (force || !this.isLocked) {
        this.color = 'transparent';
        this.isLocked = false;
      }
    }
  }, {
    key: "lock",
    value: function lock() {
      this.isLocked = true;
    }
  }]);

  return Slot;
}();

exports.default = Slot;
},{}],"components/board.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slot = _interopRequireDefault(require("./slot.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Board = /*#__PURE__*/function () {
  function Board(width, height, scale) {
    _classCallCheck(this, Board);

    this.width = width;
    this.height = height;
    this.scale = scale;
    this.slots = [];

    for (var y = 0; y < height; y++) {
      var row = [];

      for (var x = 0; x < width; x++) {
        row.push(new _slot.default(scale));
      }

      this.slots.push(row);
    }
  }

  _createClass(Board, [{
    key: "render",
    value: function render(context) {
      context.style.width = "".concat(this.width * this.scale, "px");
      context.style.height = "".concat(this.height * this.scale, "px");
      this.slots.forEach(function (row) {
        return row.forEach(function (cell) {
          context.appendChild(cell.el);
        });
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this = this;

      this.slots.forEach(function (row, y) {
        return row.forEach(function (cell, x) {
          cell.render(x * _this.scale, y * _this.scale);
        });
      });
    }
  }, {
    key: "clear",
    value: function clear() {
      this.slots.forEach(function (row) {
        return row.forEach(function (cell) {
          cell.clear();
        });
      });
    }
  }, {
    key: "placePiece",
    value: function placePiece(piece) {
      var _this2 = this;

      piece.matrix.forEach(function (row, y) {
        return row.forEach(function (cell, x) {
          if (cell === 1) {
            _this2.slots[piece.y + y][piece.x + x].fill(piece.color);
          }
        });
      });
    }
  }, {
    key: "clearPiece",
    value: function clearPiece(piece) {
      var _this3 = this;

      piece.matrix.forEach(function (row, y) {
        return row.forEach(function (cell, x) {
          if (_this3.slots[piece.y + y] !== undefined && _this3.slots[piece.y + y][piece.x + x] !== undefined) {
            _this3.slots[piece.y + y][piece.x + x].clear();
          }
        });
      });
    }
  }, {
    key: "movePiece",
    value: function movePiece(piece, dir) {
      var _ref = [piece.x, piece.y],
          orgX = _ref[0],
          orgY = _ref[1];
      this.clearPiece(piece);
      piece.move(dir, 0);

      if (this.isBlocked(piece)) {
        piece.setPosition(orgX, orgY);
      }

      this.placePiece(piece);
    }
  }, {
    key: "movePieceDown",
    value: function movePieceDown(piece) {
      this.clearPiece(piece);
      piece.move(0, 1);

      if (this.isBlocked(piece)) {
        piece.move(0, -1);
        this.lockPiece(piece);
        return true;
      }

      this.placePiece(piece);
      return false;
    }
  }, {
    key: "dropPiece",
    value: function dropPiece(piece) {
      this.clearPiece(piece);

      while (!this.isBlocked(piece)) {
        piece.move(0, 1);
      }

      piece.move(0, -1);
      this.lockPiece(piece);
    }
  }, {
    key: "rotatePiece",
    value: function rotatePiece(piece, dir) {
      var _ref2 = [piece.x, piece.y],
          orgX = _ref2[0],
          orgY = _ref2[1];
      this.clearPiece(piece);
      piece.rotate(dir);
      var offset = 1;

      while (this.isBlocked(piece)) {
        piece.move(offset, orgY);
        offset = -(offset + (offset > 0 ? 1 : -1));

        if (offset > piece.width) {
          piece.rotate(-dir);
          piece.setPosition(orgX, orgY);
          this.placePiece(piece);
          return;
        }
      }

      this.placePiece(piece);
    }
  }, {
    key: "lockPiece",
    value: function lockPiece(piece) {
      var _this4 = this;

      piece.matrix.forEach(function (row, y) {
        return row.forEach(function (cell, x) {
          if (cell === 1) {
            _this4.slots[piece.y + y][piece.x + x].fill('var(--color-frozen)');

            _this4.slots[piece.y + y][piece.x + x].lock();
          }
        });
      });
    }
  }, {
    key: "isBlocked",
    value: function isBlocked(piece) {
      for (var y = 0; y < piece.height; y++) {
        for (var x = 0; x < piece.width; x++) {
          if (piece.matrix[y][x] === 1) {
            if (piece.x + x < 0 || piece.x + x >= this.width || piece.y + y >= this.height) {
              return true;
            }

            if (this.slots[piece.y + y] && this.slots[piece.y + y][piece.x + x] && this.slots[piece.y + y][piece.x + x].isLocked) {
              return true;
            }
          }
        }
      }

      return false;
    }
  }, {
    key: "collectRows",
    value: function collectRows() {
      var count = 0;

      for (var y = this.slots.length - 1; y > 0; y--) {
        // for (let x = 0; x < this.slots[y].length; x++) {
        //   if (!this.slots[y][x].isLocked) {
        //     continue outer;
        //   }
        // }
        if (!this.slots[y].some(function (cell) {
          return !cell.isLocked;
        })) {
          var row = this.slots.splice(y, 1)[0];
          row.forEach(function (cell) {
            cell.clear(true);
          });
          this.slots.unshift(row);
          count++;
          y++;
        }
      }

      return count;
    }
  }]);

  return Board;
}();

var _default = Board;
exports.default = _default;
},{"./slot.js":"components/slot.js"}],"components/piece.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomPiece = exports.createPiece = exports.pieces = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pieces = Object.create(null);
exports.pieces = pieces;
pieces.T = {
  color: 'mediumpurple',
  matrix: [[0, 1, 0], [1, 1, 1], [0, 0, 0]]
};
pieces.O = {
  color: 'yellow',
  matrix: [[1, 1], [1, 1]]
};
pieces.L = {
  color: 'orange',
  matrix: [[0, 1, 0], [0, 1, 0], [0, 1, 1]]
};
pieces.J = {
  color: 'blue',
  matrix: [[0, 1, 0], [0, 1, 0], [1, 1, 0]]
};
pieces.I = {
  color: 'cyan',
  matrix: [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]
};
pieces.S = {
  color: 'lime',
  matrix: [[0, 1, 1], [1, 1, 0], [0, 0, 0]]
};
pieces.Z = {
  color: 'red',
  matrix: [[1, 1, 0], [0, 1, 1], [0, 0, 0]]
};

var Piece = /*#__PURE__*/function () {
  function Piece(type) {
    _classCallCheck(this, Piece);

    this.color = "var(--color-".concat(type, ")");
    this.matrix = pieces[type].matrix;
    this.x = 0;
    this.y = 0;
  }

  _createClass(Piece, [{
    key: "setPosition",
    value: function setPosition(x, y) {
      this.x = x;
      this.y = y;
    }
  }, {
    key: "move",
    value: function move(deltaX, deltaY) {
      this.x += deltaX;
      this.y += deltaY;
    }
  }, {
    key: "rotate",
    value: function rotate(dir) {
      var matrix = this.matrix;

      for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < y; ++x) {
          var _ref = [matrix[y][x], matrix[x][y]];
          matrix[x][y] = _ref[0];
          matrix[y][x] = _ref[1];
        }
      }

      if (dir > 0) {
        matrix.forEach(function (row) {
          return row.reverse();
        });
      } else {
        matrix.reverse();
      }
    }
  }, {
    key: "height",
    get: function get() {
      return this.matrix.length;
    }
  }, {
    key: "width",
    get: function get() {
      return this.matrix[0].length;
    }
  }]);

  return Piece;
}();

var createPiece = function createPiece(type) {
  return new Piece(type);
};

exports.createPiece = createPiece;
var pieceTypes = Object.keys(pieces);

var getRandomPieceType = function getRandomPieceType() {
  return pieceTypes[Math.floor(Math.random() * pieceTypes.length)];
};

var getRandomPiece = function getRandomPiece() {
  return createPiece(getRandomPieceType());
};

exports.getRandomPiece = getRandomPiece;
},{}],"components/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculatePoints = exports.directions = void 0;
var dir = Object.create(null);
exports.directions = dir;
dir.LEFT = -1;
dir.RIGHT = 1;

var calculatePoints = function calculatePoints(rowCount) {
  var result = 0;

  for (var i = rowCount; i > 0; i--) {
    result += i * 10;
  }

  return result;
};

exports.calculatePoints = calculatePoints;
},{}],"tools/keyboardListener.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var KeyboardListener = /*#__PURE__*/function () {
  function KeyboardListener() {
    var _this = this;

    var listeners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    _classCallCheck(this, KeyboardListener);

    this.context = context;
    this.active = false;
    this.handlers = Object.create(null);
    this.keyHandler = this.handleKey.bind(this);
    this.toggle(true);
    listeners.forEach(function (_ref) {
      var key = _ref.key,
          handler = _ref.handler;

      _this.addListener(key, handler);
    });
  }

  _createClass(KeyboardListener, [{
    key: "addListener",
    value: function addListener(triggerKey, handler) {
      var _this2 = this;

      var keys = Array.isArray(triggerKey) ? triggerKey : [triggerKey];
      keys.forEach(function (key) {
        if (_this2.hasHandlerFor(key)) {
          _this2.handlers[key].push(handler);
        } else {
          _this2.handlers[key] = [handler];
        }
      });
    }
  }, {
    key: "handleKey",
    value: function handleKey(evt) {
      var key = evt.key;

      if (this.handlers[key]) {
        this.handlers[key].forEach(function (handler) {
          return handler.call();
        });
      }
    }
  }, {
    key: "toggle",
    value: function toggle() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !this.active;
      this.active = state;

      if (this.active) {
        this.context.addEventListener('keydown', this.keyHandler);
      } else {
        this.context.removeEventListener('keydown', this.keyHandler);
      }
    }
  }, {
    key: "hasHandlerFor",
    value: function hasHandlerFor(key) {
      return Object.prototype.hasOwnProperty.call(this.handlers, key);
    }
  }]);

  return KeyboardListener;
}();

exports.default = KeyboardListener;
},{}],"game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _player = _interopRequireDefault(require("./components/player.js"));

var _board = _interopRequireDefault(require("./components/board.js"));

var _piece = require("./components/piece.js");

var _helpers = require("./components/helpers.js");

var _keyboardListener = _interopRequireDefault(require("./tools/keyboardListener.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game = /*#__PURE__*/function () {
  function Game() {
    _classCallCheck(this, Game);

    this.settings = {
      boardWidth: 10,
      boardHeight: 20,
      scale: 40,
      interval: 750,
      difficultyAdjustment: 10,
      levelThreshold: 1
    };
    this.board = new _board.default(this.settings.boardWidth, this.settings.boardHeight, this.settings.scale);
    this.state = {
      isRunning: false,
      lastTickCount: 0,
      level: 1,
      totalClearedRows: 0,
      dropCounter: 0,
      dropInterval: this.settings.interval
    };
    this.scoreBoard = document.getElementById('ScoreBoard');
    this.scene = document.getElementById('GameBoard');
    this.nextWindow = document.getElementById('NextDisplay');
    this.nextPieceContainer = new _board.default(5, 5, this.settings.scale);
    this.nextPiece = null;
    this.prepareNewPiece();
    this.player = new _player.default('Player 1');
    this.movementKeyHandler = new _keyboardListener.default([{
      key: ['ArrowUp', 'e', 'E'],
      handler: this.rotatePiece.bind(this, _helpers.directions.RIGHT)
    }, {
      key: ['q', 'Q'],
      handler: this.rotatePiece.bind(this, _helpers.directions.RIGHT)
    }, {
      key: ['ArrowLeft', 'a', 'A'],
      handler: this.movePiece.bind(this, _helpers.directions.LEFT)
    }, {
      key: ['ArrowRight', 'd', 'D'],
      handler: this.movePiece.bind(this, _helpers.directions.RIGHT)
    }, {
      key: ['ArrowDown', 's', 'S'],
      handler: this.movePieceDown.bind(this)
    }, {
      key: ' ',
      handler: this.dropPiece.bind(this)
    }]);
    this.gameKeyHandler = new _keyboardListener.default([{
      key: 'Escape',
      handler: this.togglePause.bind(this)
    }]);
  }

  _createClass(Game, [{
    key: "start",
    value: function start() {
      this.board.render(this.scene);
      this.drawNextDisplay();
      this.resetPlayerPiece();
      this.toggleGameLoop(true);
    }
  }, {
    key: "togglePause",
    value: function togglePause() {
      this.toggleGameLoop();
      this.scene.classList.toggle('paused', !this.state.isRunning);
    }
  }, {
    key: "prepareNewPiece",
    value: function prepareNewPiece() {
      this.nextPiece = (0, _piece.getRandomPiece)();
      this.nextPiece.setPosition(Math.floor((5 - this.nextPiece.width) / 2), Math.floor((5 - this.nextPiece.height) / 2));
      this.nextPieceContainer.clear();
      this.nextPieceContainer.placePiece(this.nextPiece);
      this.nextPieceContainer.draw();
    }
  }, {
    key: "loop",
    value: function loop() {
      var ticks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (!this.state.isRunning) return false;
      var timePassed = ticks - this.state.lastTickCount;
      this.state.lastTickCount = ticks;
      this.state.dropCounter += timePassed;

      if (this.state.dropCounter > this.state.dropInterval) {
        this.movePieceDown();
        this.state.dropCounter = 0;
      }

      this.board.draw();
      requestAnimationFrame(this.loop.bind(this));
    }
  }, {
    key: "toggleGameLoop",
    value: function toggleGameLoop() {
      var runIt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !this.state.isRunning;
      this.state.isRunning = runIt;

      if (this.state.isRunning) {
        this.loop();
        this.movementKeyHandler.toggle(true);
      } else {
        this.movementKeyHandler.toggle(false);
      }
    }
  }, {
    key: "updateScoreBoard",
    value: function updateScoreBoard(points) {
      this.scoreBoard.textContent = points;
    }
  }, {
    key: "resetPlayerPiece",
    value: function resetPlayerPiece() {
      this.player.piece = this.nextPiece;
      this.prepareNewPiece();
      this.player.piece.setPosition(Math.floor((this.settings.boardWidth - this.player.piece.width) / 2), 0);
      this.board.placePiece(this.player.piece);

      if (this.board.isBlocked(this.player.piece)) {
        this.toggleGameLoop(false);
      }

      this.board.draw();
    }
  }, {
    key: "handleBottomCollision",
    value: function handleBottomCollision() {
      var clearedRowCount = this.board.collectRows();

      if (clearedRowCount > 0) {
        this.state.totalClearedRows += clearedRowCount;
        this.player.addPoints((0, _helpers.calculatePoints)(clearedRowCount));
        this.updateScoreBoard(this.player.points);
        var levelSkip = Math.floor(clearedRowCount / this.settings.levelThreshold);

        if (levelSkip > 0) {
          this.state.level += levelSkip;
          this.state.dropInterval -= this.settings.difficultyAdjustment * levelSkip;
        }
      }

      this.resetPlayerPiece();
    }
  }, {
    key: "rotatePiece",
    value: function rotatePiece(dir) {
      this.board.rotatePiece(this.player.piece, dir);
    }
  }, {
    key: "movePiece",
    value: function movePiece(dir) {
      this.board.movePiece(this.player.piece, dir);
    }
  }, {
    key: "movePieceDown",
    value: function movePieceDown() {
      if (this.board.movePieceDown(this.player.piece)) {
        this.handleBottomCollision();
      }
    }
  }, {
    key: "dropPiece",
    value: function dropPiece() {
      this.board.dropPiece(this.player.piece);
      this.handleBottomCollision();
    }
  }, {
    key: "drawNextDisplay",
    value: function drawNextDisplay() {
      this.nextWindow.style.width = "".concat(5 * this.settings.scale, "px");
      this.nextWindow.style.height = "".concat(5 * this.settings.scale, "px");
      this.nextPieceContainer.render(this.nextWindow);
      this.nextPieceContainer.draw();
    }
  }]);

  return Game;
}();

exports.default = Game;
},{"./components/player.js":"components/player.js","./components/board.js":"components/board.js","./components/piece.js":"components/piece.js","./components/helpers.js":"components/helpers.js","./tools/keyboardListener.js":"tools/keyboardListener.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _game = _interopRequireDefault(require("./game.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = new _game.default();
game.start();
},{"./game.js":"game.js"}],"C:/Users/Kim/AppData/Roaming/nvm/v13.11.0/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59721" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/Kim/AppData/Roaming/nvm/v13.11.0/node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map