import EventEmitter from './EventEmitter';

class Entity extends EventEmitter {
  constructor(type, name) {
    super();
    this.id = Math.round(Date.now() * 1000 + Math.random() * 1000);
    this.type = type;
    this.name = name;
  }

  getId() {
    return this.id;
  }

  getType() {
    return this.type || 'unknown';
  }

  getName() {
    return this.name || 'unknown';
  }
}

export default Entity;
