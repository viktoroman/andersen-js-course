import Item from '../model/Item';
import Recipe from '../model/Recipe';

// support object
const Utility = (() => {
  const utilityEventMessages = {
    CRAFT_ITEM: 'CRAFT_ITEM',
    CRAFT_RECIPE: 'CRAFT_RECIPE',
    CRAFTTABLE_DROP_ITEM: 'CRAFTTABLE_DROP_ITEM',
    CRAFTTABLE_DROP_RECIPE: 'CRAFTTABLE_DROP_RECIPE',
    INVENTORY_DROP_ITEM: 'INVENTORY_DROP_ITEM',
    INVENTORY_DROP_RECIPE: 'INVENTORY_DROP_RECIPE',
    SELECT_ITEM: 'SELECT_ITEM',
    SELECT_RECIPE: 'SELECT_RECIPE',
    ERROR: 'ERROR',
    INFO: 'INFO',
    MESSAGE: 'MESSAGE',
  };

  // One instance
  const utilityDefaultEntities = {
    item: {
      wood: new Item('Wood', 'Wood'),
      iron: new Item('Iron', 'Iron'),
      glass: new Item('Glass', 'Glass'),
      textile: new Item('Textile', 'Textile'),
    },
    recipe: {
      chair: new Recipe(
        'Chair',
        'Chair',
        new Item('Chair', 'Chair'),
        new Item('Wood', 'Wood'),
        new Item('Iron', 'Iron')
      ),
      table: new Recipe(
        'Table',
        'Table',
        new Item('Table', 'Table'),
        new Item('Wood', 'Wood'),
        new Item('Wood', 'Wood'),
        new Item('Iron', 'Iron')
      ),
    },
  };

  return {
    eventMessages: utilityEventMessages,
    defaultEntities: utilityDefaultEntities,
  };
})();

export default Utility;
