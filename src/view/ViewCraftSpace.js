/* eslint-disable class-methods-use-this */
import EventEmitter from '../model/EventEmitter';
import Utility from '../utility/Utility';

class ViewCraftSpace extends EventEmitter {
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
      elem.addEventListener('dragover', this.allowDrop);
      elem.addEventListener('drop', ev => {
        this.dropItemInventory(ev, transferDataType, eventMessage);
      });
    });

    // listener for button create item !!!
    // listener for button create recipe !!!
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  // drop
  dropItemInventory(ev, transferDataType /* , eventMessage */) {
    ev.preventDefault();
    const item = document.getElementById(ev.dataTransfer.getData(transferDataType));
    if (!item) return;
    ev.target.appendChild(item);
    // ADD emit !!!
  }

  // add item to inventory container
  addItem({ id, name }) {
    this.appendEntity(this.itemInventory, this.createItem(id, name));
  }

  // append element to parent element
  appendEntity(parent, child) {
    parent.appendChild(child);
  }

  // creation of element similar to item object
  createItem(id, name) {
    const element = document.createElement('div');
    element.setAttribute('id', id);
    element.setAttribute('class', this.CONSTANTS.CLASS_ITEM);
    element.setAttribute('draggable', true);
    element.textContent = name;
    element.addEventListener('dragstart', ev => {
      this.dragEntity(ev, this.CONSTANTS.TYPE_ITEM);
    });

    return element;
  }

  dragEntity(ev, transferDataType) {
    ev.dataTransfer.setData(transferDataType, ev.target.id);
  }
}

export default ViewCraftSpace;
