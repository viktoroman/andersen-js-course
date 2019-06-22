import EventEmitter from '../model/EventEmitter';
import EntityStorage from '../model/EntityStorage';
import Utility from '../utility/Utility';
import Helper from '../lib/Helper';
import CraftSpaceView from '../view/CraftSpaceView';
import Item from '../model/Item';
import Recipe from '../model/Recipe';

class CraftSpaceController extends EventEmitter {
  constructor() {
    super();
    this.inventoryStorage = new EntityStorage();
    this.craftTableStorage = new EntityStorage();
    this.craftSpaceView = new CraftSpaceView();

    this.onViewEvents();
  }

  onViewEvents() {
    // CATCH MESSAGE
    // drop item on craft table
    this.craftSpaceView.on(
      Utility.eventMessages.CRAFTTABLE_DROP_ITEM,
      this.dropItemCraftTable.bind(this)
    );

    // drop item on inventory
    this.craftSpaceView.on(
      Utility.eventMessages.INVENTORY_DROP_ITEM,
      this.dropItemInventory.bind(this)
    );

    // drop recipe on craft table
    this.craftSpaceView.on(
      Utility.eventMessages.CRAFTTABLE_DROP_RECIPE,
      this.dropRecipeCraftTable.bind(this)
    );

    // drop recipe on inventory
    this.craftSpaceView.on(
      Utility.eventMessages.INVENTORY_DROP_RECIPE,
      this.dropRecipeInventory.bind(this)
    );

    // Catch item crafting
    this.craftSpaceView.on(Utility.eventMessages.CRAFT_ITEM, this.craftNewItem.bind(this));

    // Catch recipe crafting
    this.craftSpaceView.on(Utility.eventMessages.CRAFT_RECIPE, this.craftNewRecipe.bind(this));

    // Catch entity select (click on element)
    this.craftSpaceView.on(Utility.eventMessages.SELECT_ENTITY, this.selectEntity.bind(this));
  }

  initDefaultEntities() {
    [...Utility.defaultEntities.item, ...Utility.defaultEntities.recipe].forEach(entity =>
      this.addToInventoryNewEntity(entity.clone())
    );
  }

  // add to inventory (view)
  addToInventory(entity) {
    const { type: entityType, id: entityId, name: entityName } = entity;
    if (entityType === Item.TYPE) {
      this.craftSpaceView.addItem(entityId, entityName);
    } else if (entityType === Recipe.TYPE) {
      this.craftSpaceView.addRecipe(entityId, entityName);
    }
  }

  // !! HELPER METHODS
  // add to inventory storage
  addToInventoryStorage(entity) {
    this.inventoryStorage.add(entity);
  }

  // delete from inventory (view)
  deleteFromInventory({ id: entityId }) {
    this.craftSpaceView.deleteById(entityId);
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
  deleteFromCraftTable({ id: entityId }) {
    this.craftSpaceView.deleteById(entityId);
  }

  // delete from craft table storage
  deleteFromCraftTableStorage(entity) {
    this.craftTableStorage.delete(entity);
  }

  // check has storage same entity
  hasInventoryStorage(entity) {
    return this.inventoryStorage.hasSameEntity(entity);
  }

  // check has storage same entity
  hasCraftTableStorage(entity) {
    return this.craftTableStorage.hasSameEntity(entity);
  }

  // get recipe from craft table slot
  getRecipeFromCraftTableStorage() {
    return this.craftTableStorage.getAll().find(entity => entity.getType() === Recipe.TYPE);
  }

  // get items from craft table slot
  getItemsFromCraftTableStorage() {
    return this.craftTableStorage.getAll().filter(entity => entity.getType() === Item.TYPE);
  }

  // put in inventory new entity
  addToInventoryNewEntity(entity) {
    if (this.hasInventoryStorage(entity)) return false;
    this.addToInventoryStorage(entity);
    this.addToInventory(entity);
    return true;
  }

  // !!! MESSAGE TO VIEW
  // Just message
  showMessage(mess) {
    this.craftSpaceView.showMessage(mess);
  }

  // Info
  showEntityInfo(mess) {
    this.craftSpaceView.showEntityInfo(mess);
  }

  // !!! ON LISTENERS
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

    // old recipe..
    const oldRecipe = this.getRecipeFromCraftTableStorage();
    // ..must go back to inventory
    if (oldRecipe) {
      this.deleteFromCraftTableStorage(oldRecipe);
      this.addToInventoryStorage(oldRecipe);
      this.deleteFromCraftTable(oldRecipe);
      this.addToInventory(oldRecipe);
    }

    // delete from inventory -> add to craft table
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

  // select entity -> show description
  selectEntity(entityId) {
    const entity =
      this.inventoryStorage.findById(Number(entityId)) ||
      this.craftTableStorage.findById(Number(entityId));
    this.showEntityInfo(entity.getInformation());
  }

  // try to create new item with the help of recipe
  craftNewItem() {
    const recipe = this.getRecipeFromCraftTableStorage();
    // there is recipe in craft slot
    if (!recipe) {
      this.showMessage(Utility.UIMessages.RECIPE_MISSING);
      return;
    }

    // does crafted item already exist
    const craftedItem = recipe.getCraftedItem();
    if (this.hasInventoryStorage(craftedItem)) {
      this.showMessage(Utility.UIMessages.ITEM_ALREADY_EXISTS);
      return;
    }

    // There are items in craft slot
    const items = this.getItemsFromCraftTableStorage();
    if (!(items && items.length > 0)) {
      this.showMessage(Utility.UIMessages.ITEMS_MISSING);
      return;
    }

    // match recipe checking
    const matchResult = recipe.match(...items);
    if (matchResult !== Recipe.MATCHING.MATCH) {
      this.showMessage(Utility.UIMessages.RECIPE_WRONG);
      return;
    }

    // create new recipe
    this.addToInventoryNewEntity(recipe.getCraftedItem());
    this.showMessage(Utility.UIMessages.ITEM_CRAFTED);
  }

  // try to craft new recipe
  craftNewRecipe(info) {
    const items = this.getItemsFromCraftTableStorage();
    if (!(items && items.length > 0)) {
      this.showMessage(Utility.UIMessages.ITEMS_MISSING);
      return;
    }

    // check existeed recipe (not only in inventory)
    const newRecipe = new Recipe(
      new Item(Helper.nameFormat(info.name), info.description),
      ...items
    );
    if (this.hasInventoryStorage(newRecipe) || this.hasCraftTableStorage(newRecipe)) {
      this.showMessage(Utility.UIMessages.RECIPE_ALREADY_EXISTS);
      return;
    }

    // craft new recipe
    this.addToInventoryNewEntity(newRecipe);
    this.showMessage(Utility.UIMessages.RECIPE_CRAFTED);
  }
}

export default CraftSpaceController;
