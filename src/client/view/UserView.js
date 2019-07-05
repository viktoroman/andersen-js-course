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
    this.btnTEST = document.getElementById('btnTest');

    this.alertContainer = document.getElementById('alertContainer');

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
      if (!this.form.checkValidity()) {
        return;
      }
      this.handlerAddUser();
    });

    this.btnUpdate.addEventListener('click', () => {
      if (!this.form.checkValidity()) {
        return;
      }
      this.handlerUpdateUser();
    });

    this.btnTEST.addEventListener('click', () => {
      this.showAlert('TEST Alert!!!');
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

  handlerDeleteUser(id) {
    this.emit(GLOBAL.EVENT_MESS.DELETE_USER, id);
  }

  // !!! METHODS
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
  addUser(fields) {
    const element = Helper.getDefaultUserRecord(
      fields,
      this.handlerDeleteUser.bind(this, fields.id)
    );
    element.addEventListener('mousedown', () => {
      this.handlerSelectRecord(element);
    });
    this.userTable.appendChild(element);
  }

  // replace current record
  replaceCurrentUser(fields) {
    // !!! to other method
    const element = Helper.getDefaultUserRecord(fields, () => {
      console.log('Delete'); // !!! Add listener on del button
    });
    element.addEventListener('mousedown', () => {
      this.handlerSelectRecord(element);
    });

    const replacedRecord = this.currentSelectedRecord;
    this.selectRecord(element);
    this.userTable.replaceChild(this.currentSelectedRecord, replacedRecord);
  }

  // remove element by ID
  removeUserRecord(id) {
    const elem = document.getElementById(id);
    elem.parentElement.removeChild(elem);
  }

  // alert
  showAlert(message) {
    const elem = Helper.createAlertBox(message);
    this.alertContainer.appendChild(elem);
    setTimeout(() => {
      elem.parentElement.removeChild(elem);
    }, 3000);
  }
}

export default UserView;
