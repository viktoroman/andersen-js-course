import EventEmitter from '../model/EventEmitter';
// import Item from '../model/Item';
// import Recipe from '../model/Recipe';
import EntityStorage from '../model/EntityStorage';
import Utility from '../utility/Utility';
import CraftSpaceView from '../view/CraftSpaceView';
import Item from '../model/Item';
import Recipe from '../model/Recipe';

class CraftSpaceController extends EventEmitter {
  constructor() {
    super();
    this.inventoryStorage = new EntityStorage();
    this.craftTableStorage = new EntityStorage();
    this.craftSpaceView = new CraftSpaceView();

    this.entityCategories = {
      [`${Item.getType()}`]: {
        addToInventory: (...args) => {
          this.craftSpaceView.addItem(...args);
        },
      },

      [`${Recipe.getType()}`]: {
        addToInventory: (...args) => {
          this.craftSpaceView.addRecipe(...args);
        },
      },
    };

    // CATCH MESSAGE
    this.craftSpaceView.on(
      Utility.eventMessages.CRAFTTABLE_DROP_ITEM,
      this.dropItemCraftTable.bind(this)
    );

    this.craftSpaceView.on(
      Utility.eventMessages.INVENTORY_DROP_ITEM,
      this.dropItemInventory.bind(this)
    );

    this.craftSpaceView.on(
      Utility.eventMessages.CRAFTTABLE_DROP_RECIPE,
      this.dropRecipeCraftTable.bind(this)
    );
    // this.craftSpaceView.on(Utility.eventMessages.INVENTORY_DROP_RECIPE);
  }

  initDefaultEntities() {
    [...Utility.defaultEntities.item, ...Utility.defaultEntities.recipe].forEach(entity =>
      this.addToInventoryEntity(entity.clone())
    );
  }

  // put in inventory entity
  addToInventoryEntity(entity) {
    if (this.hasInventoryEntity(entity)) return;
    this.inventoryStorage.add(entity);
    this.entityCategories[entity.getType()].addToInventory(entity);
  }

  hasInventoryEntity(entity) {
    return this.inventoryStorage.hasSameEntity(entity);
  }

  // ON LISTENERS
  // create copy of dragged item and put in inventory
  dropItemCraftTable(entityId) {
    const id = Number(entityId);

    const entityOriginal = this.inventoryStorage.findById(id);
    if (!entityOriginal) return; // if undefined then it was dragging craft table --> craft table

    const itemCopy = entityOriginal.clone();
    this.inventoryStorage.delete(entityOriginal);
    this.craftTableStorage.add(entityOriginal);
    this.addToInventoryEntity(itemCopy);
  }

  // delete element when it come back to inventory from craft table
  dropItemInventory(entityId) {
    const id = Number(entityId);

    if (this.inventoryStorage.findById(id)) return;
    this.craftTableStorage.deleteById(Number(id));
    this.craftSpaceView.deleteById(id);
  }

  // move back to inventory old recipe from slot and add new dragged recipe
  dropRecipeCraftTable(entityId) {
    const id = Number(entityId);

    const entityOriginal = this.inventoryStorage.findById(id);
    if (!entityOriginal) return; // if undefined then it was dragging craft table --> craft table

    // old recipes (still in the slot of the craft table)..
    const oldRecipesId = this.craftSpaceView.getCraftTableRecipesID().reduce((accum, recipeId) => {
      if (Number(recipeId) === id) return accum;
      accum.push(Number(recipeId));
      return accum;
    }, []);

    // ..must go back to inventory
    oldRecipesId.forEach(recipeId => {
      const recipe = this.craftTableStorage.findById(Number(recipeId));
      if (!recipe) return;
      this.craftTableStorage.delete(recipe);
      this.inventoryStorage.add(recipe);
      this.craftSpaceView.deleteRecipe(recipe);
      this.craftSpaceView.addRecipe(recipe);
    });

    this.inventoryStorage.delete(entityOriginal);
    this.craftTableStorage.add(entityOriginal);
  }
}

export default CraftSpaceController;
