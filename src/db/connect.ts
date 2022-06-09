
import mongoose from 'mongoose';
import type { Mongoose } from 'mongoose';
import config from 'config';
import log from '../logger';

const connect = async (): Promise<Mongoose | undefined> => {
  try{
    const dbUri = config.get('dbUri') as string;
    return await mongoose.connect(dbUri)
  }catch(error) {
    log.error(error);
  }
}

export default connect;