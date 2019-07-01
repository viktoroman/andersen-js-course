const GLOBAL = (() => {
  const mongoDbName = 'practice_db';
  const mongoDbLogin = 'admin';
  const mongoDbPass = 'admin';
  const mongoDbCollectionNameUser = 'users';

  return {
    SERVER_PORT: 3000,
    MONGODB_CONNECTION_STRING: `mongodb+srv://${mongoDbLogin}:${mongoDbPass}@cluster0-eaxj6.mongodb.net/${mongoDbName}?retryWrites=true&w=majority`,
    COLLECTION_USERS: mongoDbCollectionNameUser,
  };
})();

export default GLOBAL;
