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
  const utilityDefaultEntityDescription = {
    itemName: 'Item description',
  };

  return {
    eventMessages: utilityEventMessages,
    defaultEntityDescription: utilityDefaultEntityDescription,
  };
})();

export default Utility;
