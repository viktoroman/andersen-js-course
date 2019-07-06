import express from 'express';
import cors from 'cors';

import GLOBAL from '../lib/GLOBAL';
import { connectDb } from './model/Models';

import { getAll, insert, update, deleteById } from './service/UserService';

const app = express();
app.use(cors());

// the body-parser middleware bundled with express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// get all users
app.get(`${GLOBAL.USER_ROOT_PATH}/all`, getAll);

// insert new user
app.post(GLOBAL.USER_ROOT_PATH, insert);

// update
app.put(GLOBAL.USER_ROOT_PATH, update);

// delete
app.delete(`${GLOBAL.USER_ROOT_PATH}/:id`, deleteById);

// connect to DB and turn up listener
connectDb().then(async () => {
  app.listen(GLOBAL.SERVER_PORT, () => {
    // console.log(`Server listening on PORT: ${GLOBAL.SERVER_PORT}.`);
  });
});
