import EventEmitter from '../model/EventEmitter';
import GLOBAL from '../../lib/GLOBAL';
import Helper from '../../lib/Helper';

/* eslint-disable class-methods-use-this */
class UserView extends EventEmitter {
  constructor() {
    super();
    this.userTable = document.getElementById('user-tbody');
    this.form = document.getElementById('form-user');
    this.btnTEST = document.getElementById('btn-test');

    this.init();
  }

  init() {
    this.addInitListeners();
  }

  addInitListeners() {
    this.form.addEventListener('submit', ev => {
      ev.preventDefault();
    });

    this.btnTEST.addEventListener('click', ev => {
      this.addUserTEST(ev);
    });
  }

  addUserTEST() {
    console.log('TEST click!');
  }

  // refresh table
  refresh() {
    this.emit(GLOBAL.EVENT_MESS.GET_ALL);
  }

  // remove all records
  removeUsers() {
    Helper.removeChildren(this.userTable);
  }

  addUser(user) {
    const element = Helper.getDefaultUserRecord(user, () => {
      console.log('Delete');
    }); // !!! Add listener
    this.userTable.appendChild(element);
  }
}

export default UserView;
