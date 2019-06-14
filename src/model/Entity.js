import EventEmitter from './EventEmitter';

class Entity extends EventEmitter {
  constructor(type, name, description) {
    super();
    this.id = Date.now() + Math.random();
    this.type = type;
    this.name = name;
    this.description = description;
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

  getDescription() {
    return this.description || 'unknown';
  }
}

export default Entity;
