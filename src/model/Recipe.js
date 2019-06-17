import Entity from './Entity';

class Recipe extends Entity {
  constructor(name, description, craftedItem, ...components) {
    super(Recipe.getType(), name, description);

    this.craftedItem = craftedItem;
    this.components = components;
    this.componentsMetadata = Recipe.toMetadataView(...components);
    this.componentsDescription = [...this.componentsMetadata.keys()]
      .reduce((arr, key) => {
        arr.push(`${key}: ${this.componentsMetadata.get(key)} units`);
        return arr;
      }, [])
      .join('; ');
  }

  static getType() {
    return 'recipe';
  }

  getCraftedItem() {
    return this.craftedItem.clone();
  }

  getComponents() {
    return this.components.map(entity => entity.clone());
  }

  getComponentsDescription() {
    return this.componentsDescription;
  }

  getInformation() {
    return `${this.getType()}: ${this.getName()}. Components: ${this.getComponentsDescription()}. Description: ${this.getDescription()}.`;
  }

  static toMetadataView(...items) {
    return items.reduce(
      (result, { name: itemName }) => result.set(itemName, (result.get(itemName) || 0) + 1),
      new Map()
    );
  }

  match(...items) {
    const comparisonResult = items.reduce(
      (result, { name: itemName }) => result.set(itemName, (result.get(itemName) || 0) - 1),
      new Map(this.componentsMetadata)
    );

    // missing items aren't exist, extra items aren't exist
    return [...comparisonResult.values()].every(value => value === 0);
  }

  clone() {
    return new Recipe(this.name, this.description, this.craftedItem, ...this.components);
  }

  craft(...items) {
    if (!this.match(...items)) {
      return undefined;
    }
    return this.craftedItem.clone();
  }
}

export default Recipe;
