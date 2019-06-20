import Item from '../model/Item';
import Recipe from '../model/Recipe';

// support object
const Utility = (() => {
  // messages for event handlers
  const utilityEventMessages = {
    CRAFT_ITEM: 'CRAFT_ITEM',
    CRAFT_RECIPE: 'CRAFT_RECIPE',
    CRAFTTABLE_DROP_ITEM: 'CRAFTTABLE_DROP_ITEM',
    CRAFTTABLE_DROP_RECIPE: 'CRAFTTABLE_DROP_RECIPE',
    INVENTORY_DROP_ITEM: 'INVENTORY_DROP_ITEM',
    INVENTORY_DROP_RECIPE: 'INVENTORY_DROP_RECIPE',
    SELECT_ENTITY: 'SELECT_ENTITY',
  };

  // UI messages
  const utilityUIMessages = {
    EMPTY_INPUTS: 'Fill all inputs!!',
    RECIPE_MISSING: 'Recipe is missing!!',
    ITEMS_MISSING: 'Items are missing!!',
    ITEM_ALREADY_EXISTS: 'This item is already there!!',
    RECIPE_ALREADY_EXISTS: 'This recipe is already there!!',
    RECIPE_WRONG: 'Recipe is wrong!!',
    ITEM_CRAFTED: 'New item is created!!',
    RECIPE_CRAFTED: 'New recipe is created!!',
  };

  // set of
  const utilityDefaultEntities = {
    item: [
      new Item('Wood', 'Wood'),
      new Item('Iron', 'Iron'),
      new Item('Glass', 'Glass'),
      new Item('Textile', 'Textile'),
    ],
    recipe: [
      new Recipe(new Item('Chair', 'Chair'), new Item('Wood', 'Wood'), new Item('Iron', 'Iron')),
      new Recipe(
        new Item('Table', 'Table'),
        new Item('Wood', 'Wood'),
        new Item('Wood', 'Wood'),
        new Item('Iron', 'Iron')
      ),
    ],
  };

  return {
    eventMessages: utilityEventMessages,
    defaultEntities: utilityDefaultEntities,
    UIMessages: utilityUIMessages,
    timeNow: () => {
      const d = new Date();
      const addZero = v => (v < 10 ? '0' : '') + v;

      const h = addZero(d.getHours());
      const m = addZero(d.getMinutes());
      const s = addZero(d.getSeconds());
      return `${h}:${m}:${s}`;
    },
  };
})();

export default Utility;
