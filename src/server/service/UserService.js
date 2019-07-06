import GLOBAL from '../../lib/GLOBAL';
import Models from '../model/Models';

// get all users
const getAll = (req, res) => {
  Models.User.find().exec((err, userData) => {
    if (err) {
      res.status(GLOBAL.RESPONSE_STATUS.BAD).send(err);
    }
    res.status(GLOBAL.RESPONSE_STATUS.OK).send(userData);
  });
};

// insert new user
const insert = (req, res) => {
  const newUser = new Models.User(req.body);

  newUser.save((err, savedObj) => {
    if (err || !savedObj) {
      const error = err || new Error(GLOBAL.ERROR_MESSAGE.INSERT);
      res.status(GLOBAL.RESPONSE_STATUS.BAD).send(error);
    }
    res.status(GLOBAL.RESPONSE_STATUS.OK).send(savedObj);
  });
};

// update
const update = (req, res) => {
  Models.User.findByIdAndUpdate(req.body.id, req.body, (err, updObj) => {
    if (err || !updObj) {
      const error = err || new Error(GLOBAL.ERROR_MESSAGE.UPDATE);
      res.status(GLOBAL.RESPONSE_STATUS.BAD).send(error);
    }
    res.status(GLOBAL.RESPONSE_STATUS.OK).send(updObj);
  });
};

// delete
const deleteById = (req, res) => {
  Models.User.findByIdAndDelete(req.params.id, (err, delObj) => {
    if (err || !delObj) {
      const error = err || new Error(GLOBAL.ERROR_MESSAGE.DELETE);
      res.status(GLOBAL.RESPONSE_STATUS.BAD).send(error);
    }
    res.status(GLOBAL.RESPONSE_STATUS.OK).send(delObj);
  });
};

export { getAll, insert, update, deleteById };
