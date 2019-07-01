import mongoose from 'mongoose';

import User from './user';
import GLOBAL from '../../lib/GLOBAL';

const connectDb = () => {
  return mongoose.connect(GLOBAL.MONGODB_CONNECTION_STRING, { useNewUrlParser: true });
};

const models = { User };

export { connectDb };
export default models;
