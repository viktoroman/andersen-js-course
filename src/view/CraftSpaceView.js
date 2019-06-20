/* eslint-disable class-methods-use-this */
import EventEmitter from '../model/EventEmitter';
import Utility from '../utility/Utility';

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

    this.CONSTANTS = {
      CLASS_ITEM: 'item',
      CLASS_RECIPE: 'recipe',
      TYPE_ITEM: 'item',
      TYPE_RECIPE: 'recipe',
    };

    this.init();
  }

  init() {
    // add listeners to containers
    [
      {
        elem: this.itemInventory,
        transferDataType: this.CONSTANTS.TYPE_ITEM,
        eventMessage: Utility.eventMessages.INVENTORY_DROP_ITEM,
      },
      {
        elem: this.recipeInventory,
        transferDataType: this.CONSTANTS.TYPE_RECIPE,
        eventMessage: Utility.eventMessages.INVENTORY_DROP_RECIPE,
      },
      {
        elem: this.itemCraftTable,
        transferDataType: this.CONSTANTS.TYPE_ITEM,
        eventMessage: Utility.eventMessages.CRAFTTABLE_DROP_ITEM,
      },
      {
        elem: this.recipeCraftTable,
        transferDataType: this.CONSTANTS.TYPE_RECIPE,
        eventMessage: Utility.eventMessages.CRAFTTABLE_DROP_RECIPE,
      },
    ].forEach(({ elem, transferDataType, eventMessage }) => {
      elem.addEventListener('dragover', this.handlerAllowDrop);
      elem.addEventListener('drop', ev => {
        this.handlerDropEntity(ev, elem, transferDataType, eventMessage);
      });
    });

    // listener for button create item
    this.btnCraftItem.addEventListener('click', this.handlerCraftNewItem.bind(this));

    // listener for button create recipe
    this.btnCraftRecipe.addEventListener('click', this.handlerCraftNewRecipe.bind(this));
  }

  // !!! HANDLERS
  // allow drop into container
  handlerAllowDrop(ev) {
    ev.preventDefault();
  }

  // keep id of draggable element during dragging
  handlerDragEntity(ev, transferDataType) {
    ev.dataTransfer.setData(transferDataType, ev.target.id);
  }

  // append draggable element into container at the moment of dropping element
  handlerDropEntity(ev, parent, transferDataType, eventMessage) {
    ev.preventDefault();

    const id = ev.dataTransfer.getData(transferDataType);
    const item = document.getElementById(id);
    if (!(item && parent)) return;
    parent.appendChild(item);

    this.emit(eventMessage, id);
  }

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
  addItem({ id: entityId, name: entityName }) {
    const element = this.createElement({
      tag: 'div',
      attributes: {
        id: entityId,
        class: this.CONSTANTS.CLASS_ITEM,
        draggable: true,
      },
      textContent: entityName,
      handles: {
        dragstart: ev => {
          this.handlerDragEntity(ev, this.CONSTANTS.TYPE_ITEM);
        },
        mousedown: ev => {
          this.handlerSelectEntity(ev, Utility.eventMessages.SELECT_ENTITY);
        },
      },
    });

    if (!element) return;
    this.appendEntity(this.itemInventory, element);
  }

  // create and add new Recipe
  addRecipe({ id: entityId, name: entityName }) {
    const element = this.createElement({
      tag: 'div',
      attributes: {
        id: entityId,
        class: this.CONSTANTS.CLASS_RECIPE,
        draggable: true,
      },
      textContent: entityName,
      handles: {
        dragstart: ev => {
          this.handlerDragEntity(ev, this.CONSTANTS.TYPE_RECIPE);
        },
        mousedown: ev => {
          this.handlerSelectEntity(ev, Utility.eventMessages.SELECT_ENTITY);
        },
      },
    });

    if (!element) return;
    this.appendEntity(this.recipeInventory, element);
  }

  // delete Element-entity
  deleteEntity({ id: entityId }) {
    const elem = document.getElementById(entityId);
    elem.parentNode.removeChild(elem);
  }

  deleteItem(item) {
    this.deleteEntity(item);
  }

  deleteRecipe(recipe) {
    this.deleteEntity(recipe);
  }

  // delete element with id
  deleteById(id) {
    const entityElement = document.getElementById(id);
    entityElement.parentNode.removeChild(entityElement);
  }

  // create new html-element with the help of properties
  createElement(props) {
    if (!(props && props.tag)) return undefined;
    const element = document.createElement(props.tag);
    element.textContent = props.textContent;

    Object.keys(props.attributes).forEach(attrName =>
      element.setAttribute(attrName, props.attributes[attrName])
    );

    Object.keys(props.handles).forEach(handleName =>
      element.addEventListener(handleName, props.handles[handleName])
    );

    return element;
  }

  // append element to parent element
  appendEntity(parent, child) {
    parent.appendChild(child);
  }

  // get id values of items of inventory container
  getInventoryItemsID() {
    return [...this.itemInventory.querySelectorAll(`.${this.CONSTANTS.CLASS_ITEM}`)].map(elem =>
      elem.getAttribute('id')
    );
  }

  // get id values of items of craft table container
  getCraftTableItemsID() {
    return [...this.itemCraftTable.querySelectorAll(`.${this.CONSTANTS.CLASS_ITEM}`)].map(elem =>
      elem.getAttribute('id')
    );
  }

  // get id values of recipes of craft table container
  getCraftTableRecipesID() {
    return [...this.recipeCraftTable.querySelectorAll(`.${this.CONSTANTS.CLASS_RECIPE}`)].map(
      elem => elem.getAttribute('id')
    );
  }

  // !!! MESSAGES
  // show message (Error, Info)
  showMessage(mess) {
    this.messageField.textContent = `${Utility.timeNow()}| ${mess}`;
  }

  // show information (descrioption of entity)
  showEntityInfo(descr) {
    this.descriptionField.textContent = descr;
  }
}

export default CraftSpaceView;
