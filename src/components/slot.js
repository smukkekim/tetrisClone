export default class Slot {
  constructor(size) {
    this.isLocked = false;
    this.color = 'transparent';
    this.el = document.createElement('div');

    this.el.style.width = `${size}px`;
    this.el.style.height = `${size}px`;
    this.el.classList.add('slot');
  }

  render(x, y) {
    this.el.style.left = `${x}px`;
    this.el.style.top = `${y}px`;
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
