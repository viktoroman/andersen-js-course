import mongoose from 'mongoose';

import User from './User';
import GLOBAL from '../../lib/GLOBAL';

const connectDb = () => {
  return mongoose.connect(GLOBAL.MONGODB_CONNECTION_STRING, { useNewUrlParser: true });
};

const Models = { User };

export { connectDb };
export default Models;
