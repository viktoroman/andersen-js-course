/* eslint-disable class-methods-use-this */
import EventEmitter from '../model/EventEmitter';
import Utility from '../utility/Utility';
import Helper from '../lib/Helper';

class CraftSpaceView extends EventEmitter {
  constructor() {
    super();

    this.recipeInventory = document.getElementById('recipe-inventory');
    this.itemInventory = document.getElementById('item-inventory');
    this.recipeCraftTable = document.getElementById('recipe-craft-table');
    this.itemCraftTable = document.getElementById('item-craft-table');

    this.btnCraftItem = document.getElementById('btn-craft-item');
    this.btnCraftRecipe = document.getElementById('btn-craft-recipe');

    this.inputNewRecipeName = document.getElementById('new-recipe-name');
    this.inputNewRecipeDescr = document.getElementById('new-recipe-description');

    this.messageField = document.getElementById('message-log');
    this.descriptionField = document.getElementById('description-info');

    this.init();
  }

  init() {
    // add listeners to containers
    [
      {
        parentElem: this.itemInventory,
        transferDataType: Utility.entityConstants.TYPE_ITEM,
        eventMessage: Utility.eventMessages.INVENTORY_DROP_ITEM,
      },
      {
        parentElem: this.recipeInventory,
        transferDataType: Utility.entityConstants.TYPE_RECIPE,
        eventMessage: Utility.eventMessages.INVENTORY_DROP_RECIPE,
      },
      {
        parentElem: this.itemCraftTable,
        transferDataType: Utility.entityConstants.TYPE_ITEM,
        eventMessage: Utility.eventMessages.CRAFTTABLE_DROP_ITEM,
      },
      {
        parentElem: this.recipeCraftTable,
        transferDataType: Utility.entityConstants.TYPE_RECIPE,
        eventMessage: Utility.eventMessages.CRAFTTABLE_DROP_RECIPE,
      },
    ].forEach(({ parentElem, transferDataType, eventMessage }) => {
      parentElem.addEventListener('dragover', Helper.allowDrop);
      parentElem.addEventListener('drop', ev => {
        const idEntity = ev.dataTransfer.getData(transferDataType);
        Helper.dropEntity(ev, idEntity, parentElem);

        this.emit(eventMessage, idEntity);
      });
    });

    // listener for button create item
    this.btnCraftItem.addEventListener('click', this.handlerCraftNewItem.bind(this));

    // listener for button create recipe
    this.btnCraftRecipe.addEventListener('click', this.handlerCraftNewRecipe.bind(this));
  }

  // !!! HANDLERS
  // craft new item with the help of recipe
  handlerCraftNewItem() {
    this.emit(Utility.eventMessages.CRAFT_ITEM);
  }

  // craft new recipe
  handlerCraftNewRecipe() {
    // get all information about a new crafting recipe
    const info = {
      name: this.inputNewRecipeName.value.trim(),
      description: this.inputNewRecipeDescr.value.trim(),
    };

    if (!(Boolean(info.name) && Boolean(info.description))) {
      this.showMessage(Utility.UIMessages.EMPTY_INPUTS); // UI message
      return;
    }

    this.emit(Utility.eventMessages.CRAFT_RECIPE, info);
  }

  // select entity -> show description
  handlerSelectEntity(ev, eventMessage) {
    this.emit(eventMessage, ev.target.id);
  }

  // !! ======================
  // create and add new Item
  addItem(entityId, entityName) {
    const element = Helper.createEntityElement(
      Helper.getEntityElementProperties(
        entityId,
        entityName,
        Utility.entityConstants.CLASS_ITEM,
        ev => {
          Helper.dragEntity(ev, Utility.entityConstants.TYPE_ITEM);
        },
        ev => {
          this.handlerSelectEntity(ev, Utility.eventMessages.SELECT_ENTITY);
        }
      )
    );

    if (!element) return;
    this.itemInventory.appendChild(element);
  }

  // create and add new Recipe
  addRecipe(entityId, entityName) {
    const element = Helper.createEntityElement(
      Helper.getEntityElementProperties(
        entityId,
        entityName,
        Utility.entityConstants.CLASS_RECIPE,
        ev => {
          Helper.dragEntity(ev, Utility.entityConstants.TYPE_RECIPE);
        },
        ev => {
          this.handlerSelectEntity(ev, Utility.eventMessages.SELECT_ENTITY);
        }
      )
    );

    if (!element) return;
    this.recipeInventory.appendChild(element);
  }

  // delete element with id
  deleteById(id) {
    const entityElement = document.getElementById(id);
    entityElement.parentNode.removeChild(entityElement);
  }

  // get id values of items of inventory container
  getInventoryItemsID() {
    return [...this.itemInventory.querySelectorAll(`.${Utility.entityConstants.CLASS_ITEM}`)].map(
      elem => elem.getAttribute('id')
    );
  }

  // get id values of items of craft table container
  getCraftTableItemsID() {
    return [...this.itemCraftTable.querySelectorAll(`.${Utility.entityConstants.CLASS_ITEM}`)].map(
      elem => elem.getAttribute('id')
    );
  }

  // get id values of recipes of craft table container
  getCraftTableRecipesID() {
    return [
      ...this.recipeCraftTable.querySelectorAll(`.${Utility.entityConstants.CLASS_RECIPE}`),
    ].map(elem => elem.getAttribute('id'));
  }

  // !!! MESSAGES
  // show message (Error, Info)
  showMessage(mess) {
    this.messageField.textContent = `${Helper.timeNow()}| ${mess}\n${
      this.messageField.textContent
    }`;
  }

  // show information (descrioption of entity)
  showEntityInfo(descr) {
    this.descriptionField.textContent = descr;
  }
}

export default CraftSpaceView;
