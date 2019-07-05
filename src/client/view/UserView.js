import EventEmitter from '../model/EventEmitter';
import GLOBAL from '../../lib/GLOBAL';
import Helper from '../../lib/Helper';

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
  }

  // !!! handles
  // select record
  handlerSelectRecord(element) {
    if (!element) {
      return;
    }
    this.selectRecord(element);
    this.emit(GLOBAL.EVENT_MESS.SELECT_RECORD, element);
  }

  // add user handler
  handlerAddUser() {
    const fields = this.getFormFields();
    this.emit(GLOBAL.EVENT_MESS.ADD_USER, fields);
  }

  // update current selected user
  handlerUpdateUser() {
    const fields = this.getFormFields();
    this.emit(GLOBAL.EVENT_MESS.UPDATE_USER, fields);
  }

  handlerDeleteUser(id) {
    this.emit(GLOBAL.EVENT_MESS.DELETE_USER, id);
  }

  // !!! METHODS
  getFormFields() {
    return {
      firstName: this.formUserFN.value.trim(),
      lastName: this.formUserLN.value.trim(),
      position: this.formUserPosition.value.trim(),
    };
  }

  // select record
  selectRecord(elem) {
    if (this.currentSelectedRecord) {
      this.currentSelectedRecord.classList.remove(GLOBAL.CLASSES.USER_SELECTED);
    }
    this.currentSelectedRecord = elem;
    this.currentSelectedRecord.classList.add(GLOBAL.CLASSES.USER_SELECTED);
  }

  // refresh table
  refresh() {
    this.emit(GLOBAL.EVENT_MESS.GET_ALL);
  }

  // remove all records
  removeUsers() {
    Helper.removeChildren(this.userTable);
  }

  // create user record
  createUserRecord(fields) {
    const element = Helper.getDefaultUserRecord(
      fields,
      this.handlerDeleteUser.bind(this, fields.id)
    );
    element.addEventListener('mousedown', () => {
      this.handlerSelectRecord(element);
    });
    return element;
  }

  // add user record on page
  addUser(fields) {
    const element = this.createUserRecord(fields);
    this.userTable.appendChild(element);
  }

  // replace current record
  replaceCurrentUser(fields) {
    const element = this.createUserRecord(fields);

    const replacedRecord = this.currentSelectedRecord;
    this.selectRecord(element);
    this.userTable.replaceChild(this.currentSelectedRecord, replacedRecord);
  }

  // alert
  showAlert(message) {
    const elem = Helper.createAlertBox(message);
    this.alertContainer.appendChild(elem);
    setTimeout(() => {
      elem.parentElement.removeChild(elem);
    }, 5000);
  }
}

export default UserView;
