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
    this.inputNewItemName = document.getElementById('new-item-name');
    this.inputNewItemDescr = document.getElementById('new-item-description');

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

    // !!! listener for button create item
    // !!! listener for button create recipe
  }

  // handler
  // allow drop into container
  handlerAllowDrop(ev) {
    ev.preventDefault();
  }

  // handler
  // keep id of draggable element during dragging
  handlerDragEntity(ev, transferDataType) {
    ev.dataTransfer.setData(transferDataType, ev.target.id);
  }

  // handler
  // append draggable element into container at the moment of dropping element
  handlerDropEntity(ev, parent, transferDataType, eventMessage) {
    ev.preventDefault();

    const id = ev.dataTransfer.getData(transferDataType);
    const item = document.getElementById(id);
    if (!(item && parent)) return;
    parent.appendChild(item);

    this.emit(eventMessage, id);
  }

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

  // delete element with id
  deleteById(id) {
    const entityElement = document.getElementById(id);
    entityElement.parentNode.removeChild(entityElement);
  }
}

export default CraftSpaceView;
