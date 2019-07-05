const GLOBAL = (() => {
  const mongoDbName = 'practice_db';
  const mongoDbLogin = 'admin';
  const mongoDbPass = 'admin';
  const mongoDbCollectionNameUser = 'users';

  const serverPort = 3000;
  const clientPort = 3001;

  const userRootPath = '/user';
  const userRestRootUrl = `http://localhost:${serverPort}${userRootPath}`;

  const eventMess = {
    GET_ALL: 'GET_ALL',
    ADD_USER: 'ADD_USER',
    UPDATE_USER: 'UPDATE_USER',
    DELETE_USER: 'DELETE_USER',
    SELECT_RECORD: 'SELECT_RECORD',
  };

  const classes = {
    USER_FN: 'first-name',
    USER_LN: 'last-name',
    USER_POSITION: 'position',
    USER_DATE: 'change-date',
  };

  const status = {
    OK: 200,
    BAD: 400,
  };

  const errorMessage = {
    INSERT: 'No object found',
    UPDATE: 'Object is not updated',
    DELETE: 'Object is not deleted',
  };

  return {
    SERVER_PORT: serverPort,
    CLIENT_PORT: clientPort,
    USER_ROOT_PATH: userRootPath,
    USER_REST_ROOT_URL: userRestRootUrl,
    MONGODB_CONNECTION_STRING: `mongodb+srv://${mongoDbLogin}:${mongoDbPass}@cluster0-eaxj6.mongodb.net/${mongoDbName}?retryWrites=true&w=majority`,
    COLLECTION_USERS: mongoDbCollectionNameUser,

    EVENT_MESS: eventMess,
    CLASSES: classes,
    RESPONSE_STATUS: status,
    ERROR_MESSAGE: errorMessage,
  };
})();

export default GLOBAL;
