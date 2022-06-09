import { omit } from 'lodash';
import { DocumentDefinition, FilterQuery } from 'mongoose';
import User, { UserDocument } from '../model/user.model';

interface ValidatePassword {
  password: UserDocument['email']
  email: string;
}

export const createUser = async (userData: DocumentDefinition<UserDocument>): Promise<UserDocument> => {
  return await User.create(userData); 
}

export const findUser = async (query: FilterQuery<UserDocument>) => {
  return await User.findOne(query).lean();
}

export const validatePassword = async ({ email, password }: ValidatePassword ) => {
  const user = await User.findOne({ email });
  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);
  if(!isValid) {
    return false;
  }

  return omit(user.toJSON(), 'password');
}
