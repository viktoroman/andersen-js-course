import Entity from './Entity';

class Recipe extends Entity {
  constructor(name, description, craftedItem, ...components) {
    super(Recipe.TYPE, name, description);

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

  static get TYPE() {
    return 'recipe';
  }

  static get MATCHING() {
    return {
      MATCH: 0b00,
      EXCESS: 0b10,
      MISSING: 0b01,
      EXCESS_AND_MISSING: 0b11,
    };
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
    return (str => str.slice(0, 1).toUpperCase() + str.slice(1))(
      `${this.getType()}: ${this.getName()}. Components: ${this.getComponentsDescription()}. Description: ${this.getDescription()}.`
    );
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
    // return [...comparisonResult.values()].every(value => value === 0);
    const res = Recipe.MATCHING.MATCH;
    return [...comparisonResult.values()].reduce((accum, value) => {
      let mtch = Recipe.MATCHING.MATCH;
      if (value === 0) {
        mtch |= Recipe.MATCHING.MATCH;
      } else if (value > 0) {
        mtch |= Recipe.MATCHING.MISSING;
      } else if (value < 0) {
        mtch |= Recipe.MATCHING.EXCESS;
      }

      return accum | mtch;
    }, res);
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
