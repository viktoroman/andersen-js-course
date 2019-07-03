import User from '../model/User';
import CRUD from './CRUD';
import GLOBAL from '../../lib/GLOBAL';

const UserService = (() => {
  // // get all users
  // const getAll = async () => {
  //   try {
  //     const userData = await fetch(`${GLOBAL.USER_REST_ROOT_URL}/all`).then(r => r.json());
  //     return userData.map(v => new User(v));
  //   } catch (error) {
  //     throw new Error(`Get all user error: ${error}`);
  //   }
  // };

  // // insert user
  // const insert = async user => {
  //   try {
  //     const insData = await fetch(GLOBAL.USER_REST_ROOT_URL, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(user),
  //     }).then(r => r.json());
  //     return new User(insData);
  //   } catch (error) {
  //     throw new Error(`Insert user error ${error}`);
  //   }
  // };

  // // update
  // const update = async user => {
  //   try {
  //     const updData = await fetch(GLOBAL.USER_REST_ROOT_URL, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(user),
  //     }).then(r => r.json());

  //     return new User(updData);
  //   } catch (error) {
  //     throw new Error(`Update user error: ${error}`);
  //   }
  // };

  // // delete
  // const deleteById = async userId => {
  //   try {
  //     const delData = await fetch(`${GLOBAL.USER_REST_ROOT_URL}/${userId}`, {
  //       method: 'DELETE',
  //       headers: { 'Content-Type': 'application/json' },
  //     }).then(r => r.json());

  //     return new User(delData);
  //   } catch (error) {
  //     throw new Error(`Delete user error: ${error}`);
  //   }
  // };

  // get all users
  const userGetAll = async () => {
    try {
      return await CRUD.getAll(GLOBAL.USER_REST_ROOT_URL).map(v => new User(v));
    } catch (error) {
      throw new Error(`Get all user error: ${error}`);
    }
  };

  // insert user
  const userInsert = async user => {
    try {
      return await CRUD.insert(GLOBAL.USER_REST_ROOT_URL, user);
    } catch (error) {
      throw new Error(`Insert user error ${error}`);
    }
  };

  // update
  const userUpdate = async user => {
    try {
      return await CRUD.update(GLOBAL.USER_REST_ROOT_URL, user);
    } catch (error) {
      throw new Error(`Update user error: ${error}`);
    }
  };

  // delete by ID
  const userDeleteById = async userId => {
    try {
      return await CRUD.deleteById(GLOBAL.USER_REST_ROOT_URL, userId);
    } catch (error) {
      throw new Error(`Delete user error: ${error}`);
    }
  };

  // final set
  return {
    getAll: userGetAll,
    insert: userInsert,
    update: userUpdate,
    deleteById: userDeleteById,
  };
})();

export default UserService;
