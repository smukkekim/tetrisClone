const pieces = Object.create(null);
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

class Piece {
  constructor(type) {
    this.color = 'var(--color-' + type + ')';
    this.matrix = pieces[type].matrix;
    this.x = 0;
    this.y = 0;
  }
  get height() {
    return this.matrix.length;
  }

  get width() {
    return this.matrix[0].length;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  move(deltaX, deltaY) {
    this.x += deltaX;
    this.y += deltaY;
  }

  rotate(dir) {
    let matrix = this.matrix;
    for (let y = 0; y < matrix.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
      }
    }

    if (dir > 0) {
      matrix.forEach(row => row.reverse());
    } else {
      matrix.reverse();
    }
  }
}

const createPiece = type => new Piece(type);

const pieceTypes = Object.keys(pieces);

const getRandomPieceType = () =>
  pieceTypes[Math.floor(Math.random() * pieceTypes.length)];

const getRandomPiece = () => createPiece(getRandomPieceType());

export { pieces, createPiece, getRandomPiece };
