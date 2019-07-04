import UserView from '../view/UserView';
import GLOBAL from '../../lib/GLOBAL';
import UserService from '../service/UserService';
import User from '../model/User';
// import User from '../model/User';

class UserController {
  constructor() {
    this.userView = new UserView();
    this.currentUser = new User({ id: 0 }); // "empty" object

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
      this.addUser(userFields);
    });

    // select (mousedown) record
    this.userView.on(GLOBAL.EVENT_MESS.SELECT_RECORD, userFields => {
      this.currentUser = new User(userFields);
      this.fillForm(this.currentUser);
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
  addUser(fields) {
    const user = new User(fields);
    user.dateChange = new Date();
    UserService.insert(user)
      .then(insData => {
        this.userView.addUser(insData);
      })
      .catch(err => console.log(err));
  }

  // fill form inputs
  fillForm(user) {
    this.userView.formUserFN.value = user.firstName;
    this.userView.formUserLN.value = user.lastName;
    this.userView.formUserPosition.value = user.position;
  }
}

export default UserController;
