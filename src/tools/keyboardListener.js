export default class KeyboardListener {
  constructor(listeners = [], context = document) {
    this.context = context;
    this.active = false;
    this.handlers = Object.create(null);
    this.keyHandler = this.handleKey.bind(this);
    this.toggle(true);

    listeners.forEach(({ key, handler }) => {
      this.addListener(key, handler);
    });
  }

  addListener(triggerKey, handler) {
    const keys = Array.isArray(triggerKey) ? triggerKey : [triggerKey];
    keys.forEach(key => {
      if (this.hasHandlerFor(key)) {
        this.handlers[key].push(handler);
      } else {
        this.handlers[key] = [handler];
      }
    });
  }

  handleKey(evt) {
    let { key } = evt;
    if (this.handlers[key]) {
      this.handlers[key].forEach(handler => handler.call());
    }
  }

  toggle(state = !this.active) {
    this.active = state;

    if (this.active) {
      this.context.addEventListener('keydown', this.keyHandler);
    } else {
      this.context.removeEventListener('keydown', this.keyHandler);
    }
  }

  hasHandlerFor(key) {
    return Object.prototype.hasOwnProperty.call(this.handlers, key);
  }
}
