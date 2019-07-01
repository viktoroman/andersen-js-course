import express from 'express';

import GLOBAL from '../lib/GLOBAL';
import models, { connectDb } from './model/models';

const app = express();

// test ping !!! REMOVE AFTER
app.get('/ping', (req, res) => {
  res.send('Hello World');
});

// get all users
app.get('/users', (req, res) => {
  models.User.find().exec((err, userData) => {
    if (err) {
      throw err;
    }
    res.send(userData);
  });
});

connectDb().then(async () => {
  app.listen(GLOBAL.SERVER_PORT, () => {
    console.log(`Server listening on PORT: ${GLOBAL.SERVER_PORT}.`);
  });
});
