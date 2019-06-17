import Entity from './Entity';

class Item extends Entity {
  constructor(name, description) {
    super(Item.getType(), name, description);
  }

  static getType() {
    return 'item';
  }

  getInformation() {
    return `${this.getType()}: ${this.getName()}. Description: ${this.getDescription()}.`;
  }

  clone() {
    return new Item(this.name, this.description);
  }
}

export default Item;
