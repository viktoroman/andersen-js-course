import Entity from './Entity';

class Item extends Entity {
  constructor(name, description) {
    const TYPE = 'item';

    super(TYPE, name, description);
  }

  getInformation() {
    return `${this.getType()}: ${this.getName()}. Description: ${this.getDescription()}.`;
  }

  clone() {
    return new Item(this.name, this.description);
  }
}

export default Item;
