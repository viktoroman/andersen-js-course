import mongoose from 'mongoose';
import GLOBAL from '../../lib/GLOBAL';

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  position: { type: String },
  dateChange: { type: Date },
});

const User = mongoose.model('User', userSchema, GLOBAL.COLLECTION_USERS);

export default User;
