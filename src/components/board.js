class Slot {
  constructor(size) {
    this.isLocked = false;
    this.color = 'transparent';
    this.el = document.createElement('div');

    this.el.style.width = size + 'px';
    this.el.style.height = size + 'px';
    this.el.classList.add('slot');
  }

  render(x, y) {
    this.el.style.left = x + 'px';
    this.el.style.top = y + 'px';
    this.el.style.backgroundColor = this.color;
  }

  fill(color) {
    this.color = color;
  }

  clear(force) {
    if (force || !this.isLocked) {
      this.color = 'transparent';
      this.isLocked = false;
    }
  }

  lock() {
    this.isLocked = true;
  }
}

class Board {
  constructor(width, height, scale) {
    this.width = width;
    this.height = height;
    this.scale = scale;
    this.slots = [];
    for (let y = 0; y < height; y++) {
      let row = new Array();
      for (let x = 0; x < width; x++) {
        row.push(new Slot(scale));
      }
      this.slots.push(row);
    }
  }

  render(context) {
    this.slots.forEach(row =>
      row.forEach(cell => {
        context.appendChild(cell.el);
      })
    );
  }

  draw() {
    this.slots.forEach((row, y) =>
      row.forEach((cell, x) => {
        cell.render(x * this.scale, y * this.scale);
      })
    );
  }

  clear() {
    this.slots.forEach(row =>
      row.forEach(cell => {
        cell.clear();
      })
    );
  }

  placePiece(piece) {
    piece.matrix.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell === 1) {
          this.slots[piece.y + y][piece.x + x].fill(piece.color);
        }
      })
    );
  }

  clearPiece(piece) {
    piece.matrix.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (
          this.slots[piece.y + y] !== undefined &&
          this.slots[piece.y + y][piece.x + x] !== undefined
        ) {
          this.slots[piece.y + y][piece.x + x].clear();
        }
      })
    );
  }

  movePiece(piece, dir) {
    const [orgX, orgY] = [piece.x, piece.y];
    this.clearPiece(piece);
    piece.move(dir, 0);
    if (this.isBlocked(piece)) {
      piece.setPosition(orgX, orgY);
    }
    this.placePiece(piece);
  }

  dropPiece(piece) {
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

  rotatePiece(piece, dir) {
    const [orgX, orgY] = [piece.x, piece.y];
    this.clearPiece(piece);
    piece.rotate(dir);

    let offset = 1;
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

  lockPiece(piece) {
    piece.matrix.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell === 1) {
          this.slots[piece.y + y][piece.x + x].fill('var(--color-frozen)');
          this.slots[piece.y + y][piece.x + x].lock();
        }
      })
    );
  }

  isBlocked(piece) {
    for (let y = 0; y < piece.height; y++) {
      for (let x = 0; x < piece.width; x++) {
        if (piece.matrix[y][x] === 1) {
          if (
            piece.x + x < 0 ||
            piece.x + x >= this.width ||
            piece.y + y >= this.height
          ) {
            return true;
          }
          if (
            this.slots[piece.y + y] &&
            this.slots[piece.y + y][piece.x + x] &&
            this.slots[piece.y + y][piece.x + x].isLocked
          ) {
            return true;
          }
        }
      }
    }

    return false;
  }

  collectRows() {
    let count = 0;
    outer: for (let y = this.slots.length - 1; y > 0; y--) {
      for (let x = 0; x < this.slots[y].length; x++) {
        if (!this.slots[y][x].isLocked) {
          continue outer;
        }
      }
      let row = this.slots.splice(y, 1)[0];
      row.forEach(cell => {
        cell.clear(true);
      });
      this.slots.unshift(row);
      count++;
      y++;
    }
    return count;
  }
}

export default Board;
