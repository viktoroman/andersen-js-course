import UserView from '../view/UserView';
import GLOBAL from '../../lib/GLOBAL';
import UserService from '../service/UserService';
import User from '../model/User';
import Helper from '../../lib/Helper';
// import User from '../model/User';

class UserController {
  constructor() {
    this.userView = new UserView();
    // this.currentUser = new User({ id: 0 }); // "empty" object

    this.onUserViewEmitter();

    // refresh
    this.userView.refresh();
  }

  onUserViewEmitter() {
    // refresh
    this.userView.on(GLOBAL.EVENT_MESS.GET_ALL, () => {
      this.refreshUser();
    });

    // add
    this.userView.on(GLOBAL.EVENT_MESS.ADD_USER, userFields => {
      const user = new User(userFields);
      user.dateChange = new Date();
      this.addUser(user);
    });

    // update
    this.userView.on(GLOBAL.EVENT_MESS.UPDATE_USER, userFields => {
      this.updateUser(userFields);
    });

    // delete
    this.userView.on(GLOBAL.EVENT_MESS.DELETE_USER, userId => {
      this.deleteUser(userId);
    });

    // select (mousedown) record
    this.userView.on(GLOBAL.EVENT_MESS.SELECT_RECORD, elementRecord => {
      // this.currentUser = new User(userFields);
      this.fillForm(new User(Helper.getValuesRecord(elementRecord)));
    });
  }

  // refresh user list
  refreshUser() {
    // get all users
    UserService.getAll()
      .then(users => {
        this.userView.removeUsers();
        users.forEach(user => {
          this.userView.addUser(user);
        });
      })
      .catch(err => console.log(err));
  }

  // add new user
  addUser(user) {
    UserService.insert(user)
      .then(insData => {
        this.userView.addUser(insData);
      })
      .catch(err => console.log(err));
  }

  // update user
  updateUser(user) {
    if (!this.userView.currentSelectedRecord) {
      console.log('Choose element!!');
      return;
    }
    const updatedUser = new User(Helper.getValuesRecord(this.userView.currentSelectedRecord));
    updatedUser.updateFields(user);
    updatedUser.dateChange = new Date().toISOString();
    UserService.update(updatedUser)
      .then(() => {
        this.userView.replaceCurrentUser(updatedUser);
      })
      .catch(err => console.log(err));
  }

  // delete user
  deleteUser(userId) {
    if (!userId) {
      console.log('Cannot remove!!');
      return;
    }
    UserService.deleteById(userId)
      .then(() => {
        this.userView.removeUserRecord(userId);
        this.clearForm();
      })
      .catch(err => console.log(err));
  }

  // fill form inputs
  fillForm(user) {
    this.userView.formUserFN.value = user.firstName;
    this.userView.formUserLN.value = user.lastName;
    this.userView.formUserPosition.value = user.position;
  }

  // clear form
  clearForm() {
    [this.userView.formUserFN, this.userView.formUserLN, this.userView.formUserPosition].forEach(
      e => {
        const elem = e;
        elem.value = '';
      }
    );
  }
}

export default UserController;
