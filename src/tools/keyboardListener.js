export default class KeyboardListener {
  constructor(context = document) {
    this.context = context;
    this.active = false;
    this.handlers = Object.create(null);
    this.keyHandler = this.handleKey.bind(this);
    this.toggle(true);
  }

  addListener(triggerKey, handler) {
    const keys = Array.isArray(triggerKey) ? triggerKey : [triggerKey];
    keys.forEach(key => {
      if (Object.prototype.hasOwnProperty.call(this.handlers, key)) {
        this.handlers[key].push(handler);
      } else {
        this.handlers[key] = [handler];
      }
    });
  }

  handleKey(evt) {
    var key = evt.key;
    // console.log(key);
    if (this.handlers[key]) {
      this.handlers[key].forEach(handler => handler.call());
    }
  }

  toggle(state) {
    if (typeof state !== 'boolean') state = !this.active;
    this.active = state;

    if (this.active) {
      this.context.addEventListener('keydown', this.keyHandler);
    } else {
      this.context.removeEventListener('keydown', this.keyHandler);
    }
  }
}
