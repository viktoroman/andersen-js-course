const GLOBAL = (() => {
  const mongoDbName = 'practice_db';
  const mongoDbLogin = 'admin';
  const mongoDbPass = 'admin';
  const mongoDbCollectionNameUser = 'users';

  const serverPort = 3000;
  const clientPort = 3001;

  return {
    SERVER_PORT: serverPort,
    CLIENT_PORT: clientPort,
    USER_REST_ROOT_URL: `http://localhost:${serverPort}/user`,
    MONGODB_CONNECTION_STRING: `mongodb+srv://${mongoDbLogin}:${mongoDbPass}@cluster0-eaxj6.mongodb.net/${mongoDbName}?retryWrites=true&w=majority`,
    COLLECTION_USERS: mongoDbCollectionNameUser,
  };
})();

export default GLOBAL;
