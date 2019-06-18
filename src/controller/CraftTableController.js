import EventEmitter from '../model/EventEmitter';
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
        // Inventory
        addToInventory: (...args) => {
          this.craftSpaceView.addItem(...args);
        },
        deleteFromInventory: (...args) => {
          this.craftSpaceView.deleteItem(...args);
        },
        // Craft table
        deleteFromCraftTable: (...args) => {
          this.craftSpaceView.deleteItem(...args);
        },
      },

      [`${Recipe.getType()}`]: {
        addToInventory: (...args) => {
          this.craftSpaceView.addRecipe(...args);
        },
        deleteFromInventory: (...args) => {
          this.craftSpaceView.deleteRecipe(...args);
        },
        // Craft table
        deleteFromCraftTable: (...args) => {
          this.craftSpaceView.deleteRecipe(...args);
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
    this.craftSpaceView.on(
      Utility.eventMessages.INVENTORY_DROP_RECIPE,
      this.dropRecipeInventory.bind(this)
    );
  }

  initDefaultEntities() {
    [...Utility.defaultEntities.item, ...Utility.defaultEntities.recipe].forEach(entity =>
      this.addToInventoryNewEntity(entity.clone())
    );
  }

  // add to inventory (view)
  addToInventory(entity) {
    this.entityCategories[entity.getType()].addToInventory(entity);
  }

  // add to inventory storage
  addToInventoryStorage(entity) {
    this.inventoryStorage.add(entity);
  }

  // delete from inventory (view)
  deleteFromInventory(entity) {
    this.entityCategories[entity.getType()].deleteFromInventory(entity);
  }

  // delete from inventory storage
  deleteFromInventoryStorage(entity) {
    this.inventoryStorage.delete(entity);
  }

  // add to craft table storage
  addToCraftTableStorage(entity) {
    this.craftTableStorage.add(entity);
  }

  // delete from craft table (view)
  deleteFromCraftTable(entity) {
    this.entityCategories[entity.getType()].deleteFromCraftTable(entity);
  }

  // delete from craft table (view)
  deleteFromCraftTableStorage(entity) {
    this.craftTableStorage.delete(entity);
  }

  hasInventoryStorage(entity) {
    return this.inventoryStorage.hasSameEntity(entity);
  }

  getRecipesFromCraftTableStorage() {
    return this.craftTableStorage.getAll().filter(entity => entity.getType() === Recipe.getType());
  }

  // !!!
  // put in inventory new entity
  addToInventoryNewEntity(entity) {
    if (this.hasInventoryStorage(entity)) return;
    this.addToInventoryStorage(entity);
    this.addToInventory(entity);
  }

  // ON LISTENERS
  // create copy of dragged item and put in inventory
  dropItemCraftTable(entityId) {
    const entityOriginal = this.inventoryStorage.findById(Number(entityId));
    if (!entityOriginal) return; // if undefined then it was dragging craft table --> craft table

    const itemCopy = entityOriginal.clone();
    this.deleteFromInventoryStorage(entityOriginal);
    this.addToCraftTableStorage(entityOriginal);

    this.addToInventoryNewEntity(itemCopy);
  }

  // delete element when it come back to inventory from craft table
  dropItemInventory(entityId) {
    const entity = this.craftTableStorage.findById(Number(entityId));
    if (!entity) return; // if undefined then it was dragging inventory -> inventory

    this.deleteFromCraftTableStorage(entity);
    this.deleteFromInventory(entity); // element already in inventory after dragging
  }

  // move back to inventory old recipe from slot and add new dragged recipe
  dropRecipeCraftTable(entityId) {
    const entityOriginal = this.inventoryStorage.findById(Number(entityId));
    if (!entityOriginal) return; // if undefined then it was dragging craft table --> craft table

    // all old recipes..
    const oldRecipes = this.getRecipesFromCraftTableStorage();
    // ..must go back to inventory
    oldRecipes.forEach(oldRecipe => {
      this.deleteFromCraftTableStorage(oldRecipe);
      this.addToInventoryStorage(oldRecipe);

      this.deleteFromCraftTable(oldRecipe);
      this.addToInventory(oldRecipe);
    });

    this.deleteFromInventoryStorage(entityOriginal);
    this.addToCraftTableStorage(entityOriginal);
  }

  // drop recipe to inventory
  dropRecipeInventory(entityId) {
    const entity = this.craftTableStorage.findById(Number(entityId));
    if (!entity) return; // if undefined then it was dragging inventory --> inventory
    this.deleteFromCraftTableStorage(entity);
    this.addToInventoryStorage(entity);
  }
}

export default CraftSpaceController;
