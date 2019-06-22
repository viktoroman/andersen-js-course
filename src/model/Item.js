import Entity from './Entity';

class Item extends Entity {
  constructor(name, description) {
    super(Item.TYPE, name);
    this.description = description;
  }

  static get TYPE() {
    return 'item';
  }

  getDescription() {
    return this.description || 'unknown';
  }

  getInformation() {
    return (str => str.slice(0, 1).toUpperCase() + str.slice(1))(
      `${this.getType()}: ${this.getName()}. Description: ${this.getDescription()}.`
    );
  }

  clone() {
    return new Item(this.name, this.description);
  }
}

export default Item;
