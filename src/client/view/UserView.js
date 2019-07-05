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

    this.currentSelectedRecord = null;

    this.btnAdd = document.getElementById('btnAddUser');
    this.btnUpdate = document.getElementById('btnUpdateUser');

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
      this.handlerAddUser();
    });

    this.btnUpdate.addEventListener('click', () => {
      this.handlerUpdateUser();
    });
  }

  // !!! handles
  // select record
  handlerSelectRecord(element) {
    // handlerSelectRecord(ev) {
    // const elementID = ev.target.id;
    if (!element) {
      return;
    }
    this.selectRecord(element);

    // const fields = Helper.getFieldValues(element);
    this.emit(GLOBAL.EVENT_MESS.SELECT_RECORD, element);
  }

  // add user handler
  handlerAddUser() {
    // !!! fields getting - to other method
    const fields = {
      firstName: this.formUserFN.value.trim(),
      lastName: this.formUserLN.value.trim(),
      position: this.formUserPosition.value.trim(),
    };

    this.emit(GLOBAL.EVENT_MESS.ADD_USER, fields);
  }

  // update current selected user
  handlerUpdateUser() {
    // const fields = {
    //   id: this.selectRecord.id,
    //   dateChange: new Date(),
    // };

    // // !!! fields getting - to other method
    // const formfields = {
    //   firstName: this.formUserFN.value.trim(),
    //   lastName: this.formUserLN.value.trim(),
    //   position: this.formUserPosition.value.trim(),
    // };

    // Object.assign(fields, formfields);

    const fields = {
      firstName: this.formUserFN.value.trim(),
      lastName: this.formUserLN.value.trim(),
      position: this.formUserPosition.value.trim(),
    };
    this.emit(GLOBAL.EVENT_MESS.UPDATE_USER, fields);
  }

  // select record
  selectRecord(elem) {
    const CLASS_SELECTED = 'selected'; // !!! to GLOBAL

    if (this.currentSelectedRecord) {
      this.currentSelectedRecord.classList.remove(CLASS_SELECTED);
    }
    this.currentSelectedRecord = elem;
    this.currentSelectedRecord.classList.add(CLASS_SELECTED);
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
      console.log('Delete'); // !!! Add listener on del button
    });
    element.addEventListener('mousedown', () => {
      this.handlerSelectRecord(element);
    });
    this.userTable.appendChild(element);
  }

  // replace current record
  replaceCurrentUser(user) {
    // !!! to other method
    const element = Helper.getDefaultUserRecord(user, () => {
      console.log('Delete'); // !!! Add listener on del button
    });
    element.addEventListener('mousedown', () => {
      this.handlerSelectRecord(element);
    });

    const replacedRecord = this.currentSelectedRecord;
    this.selectRecord(element);
    this.userTable.replaceChild(this.currentSelectedRecord, replacedRecord);
  }
}

export default UserView;
