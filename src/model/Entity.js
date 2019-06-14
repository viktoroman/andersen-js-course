import EventEmitter from './EventEmitter';

class Entity extends EventEmitter {
  constructor(type, name, description) {
    super();
    this.id = Math.round(Date.now() * 1000 + Math.random() * 1000);
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
