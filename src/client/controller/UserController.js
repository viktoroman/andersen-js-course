import UserView from '../view/UserView';
import GLOBAL from '../../lib/GLOBAL';
import UserService from '../service/UserService';
// import User from '../model/User';

class UserController {
  constructor() {
    this.userView = new UserView();

    this.onUserViewEmitter();

    // refresh
    this.userView.refresh();
  }

  onUserViewEmitter() {
    this.userView.on(GLOBAL.EVENT_MESS.GET_ALL, () => {
      this.userRefresh();
    });
  }

  userRefresh() {
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
}

export default UserController;
