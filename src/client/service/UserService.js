import User from '../model/User';
import CRUD from './CRUD';
import GLOBAL from '../../lib/GLOBAL';

const UserService = (() => {
  // get all users
  const userGetAll = async () => {
    try {
      const result = await CRUD.getAll(`${GLOBAL.USER_REST_ROOT_URL}/all`);
      return result.map(v => new User(v));
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
