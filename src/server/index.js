import express from 'express';
import cors from 'cors';

import GLOBAL from '../lib/GLOBAL';
import Models, { connectDb } from './model/Models';

const app = express();
app.use(cors());

// the body-parser middleware bundled with express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// test ping !!! REMOVE AFTER
app.get('/ping', (req, res) => {
  res.send('Hello World');
});

// get all users
app.get('/user/all', (req, res) => {
  Models.User.find().exec((err, userData) => {
    if (err) {
      res.status(400).send(err);
      console.log(err);
    }
    res.status(200).send(userData);
  });
});

// insert new user
app.post('/user', (req, res) => {
  const newUser = new Models.User(req.body);

  newUser.save((err, savedObj) => {
    if (err || !savedObj) {
      const error = err || new Error('No object found');
      res.status(400).send(error);
      console.log(error);
    }
    res.status(200).send(savedObj);
  });
});

// update
app.put('/user', (req, res) => {
  // const user = new Models.User(req.body);
  // console.log(req.body);

  Models.User.findByIdAndUpdate(req.body.id, req.body, (err, updObj) => {
    if (err || !updObj) {
      const error = err || new Error('Object is not updated');
      res.status(400).send(error);
      console.log(error);
    }
    res.status(200).send(updObj);
  });
});

// delete
app.delete('/user/:id', (req, res) => {
  Models.User.findByIdAndDelete(req.params.id, (err, delObj) => {
    if (err || !delObj) {
      const error = err || new Error('Object is not deleted');
      res.status(400).send(error);
      console.log(error);
    }
    res.status(200).send(delObj);
  });
});

// connect to DB and turn up listener
connectDb().then(async () => {
  app.listen(GLOBAL.SERVER_PORT, () => {
    console.log(`Server listening on PORT: ${GLOBAL.SERVER_PORT}.`);
  });
});
