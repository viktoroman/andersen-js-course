const GLOBAL = (() => {
  const mongoDbName = 'practice_db';
  const mongoDbLogin = 'admin';
  const mongoDbPass = 'admin';
  const mongoDbCollectionNameUser = 'users';

  const serverPort = 3000;
  const clientPort = 3001;

  const eventMess = {
    GET_ALL: 'GET_ALL',
    ADD_USER: 'ADD_USER',
    UPDATE_USER: 'UPDATE_USER',
    SELECT_RECORD: 'SELECT_RECORD',
  };

  const classes = {
    USER_FN: 'first-name',
    USER_LN: 'last-name',
    USER_POSITION: 'position',
    USER_DATE: 'change-date',
  };

  return {
    SERVER_PORT: serverPort,
    CLIENT_PORT: clientPort,
    USER_REST_ROOT_URL: `http://localhost:${serverPort}/user`,
    MONGODB_CONNECTION_STRING: `mongodb+srv://${mongoDbLogin}:${mongoDbPass}@cluster0-eaxj6.mongodb.net/${mongoDbName}?retryWrites=true&w=majority`,
    COLLECTION_USERS: mongoDbCollectionNameUser,

    EVENT_MESS: eventMess,
    CLASSES: classes,
  };
})();

export default GLOBAL;
