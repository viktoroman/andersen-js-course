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
    SELECT_ENTITY: 'SELECT_ENTITY',
    ERROR: 'ERROR',
    INFO: 'INFO',
    MESSAGE: 'MESSAGE',
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
      new Recipe(
        'Chair',
        'Chair',
        new Item('Chair', 'Chair'),
        new Item('Wood', 'Wood'),
        new Item('Iron', 'Iron')
      ),
      new Recipe(
        'Table',
        'Table',
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
