import EventEmitter from '../model/EventEmitter';
import GLOBAL from '../../lib/GLOBAL';
import Helper from '../../lib/Helper';

/* eslint-disable class-methods-use-this */
class UserView extends EventEmitter {
  constructor() {
    super();
    this.userTable = document.getElementById('userTbody');
    this.form = document.getElementById('formUser');
    this.formUserFN = document.getElementById('firstName');
    this.formUserLN = document.getElementById('lastName');
    this.formUserPosition = document.getElementById('position');

    this.btnAdd = document.getElementById('btnAddUser');

    this.init();
  }

  init() {
    this.addInitListeners();
  }

  addInitListeners() {
    this.form.addEventListener('submit', ev => {
      ev.preventDefault();
    });

    this.btnAdd.addEventListener('click', () => {
      this.handleAddUser();
    });
  }

  // !!! handles
  handlerSelectRecord(element) {
    // handlerSelectRecord(ev) {
    // const elementID = ev.target.id;
    if (!element) {
      return;
    }

    const fields = Helper.getFieldValues(element);
    this.emit(GLOBAL.EVENT_MESS.SELECT_RECORD, fields);
  }

  handleAddUser() {
    const fields = {
      firstName: this.formUserFN.value.trim(),
      lastName: this.formUserLN.value.trim(),
      position: this.formUserPosition.value.trim(),
    };

    this.emit(GLOBAL.EVENT_MESS.ADD_USER, fields);
  }

  // refresh table
  refresh() {
    this.emit(GLOBAL.EVENT_MESS.GET_ALL);
  }

  // remove all records
  removeUsers() {
    Helper.removeChildren(this.userTable);
  }

  // add user record on page
  addUser(user) {
    const element = Helper.getDefaultUserRecord(user, () => {
      console.log('Delete'); // !!! Add listener
    });
    element.addEventListener('mousedown', () => {
      this.handlerSelectRecord(element);
    });
    this.userTable.appendChild(element);
  }
}

export default UserView;
