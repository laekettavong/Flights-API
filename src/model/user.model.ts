import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserDocument extends mongoose.Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  age: number;
  creatdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true }, 
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  const user = this as UserDocument;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // Random additional data
  const salt = await bcrypt.genSalt(config.get('saltWorkFactor'));
  const hash = await bcrypt.hashSync(user.password, salt);

  // Replace the password with the hash
  user.password = hash;
  return next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as UserDocument;
  try{
    return await bcrypt.compare(candidatePassword, user.password);
  }catch(err) {
    return false;
  }
};

const User = mongoose.model<UserDocument>('User', UserSchema);
export default User;