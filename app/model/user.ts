import { Application } from 'egg';
import { Document } from 'mongoose';
export default (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const schema = {
    userName: { type: String },
    password: { type: String },
  };
  const UserSchema = new Schema(schema);
  type UserIf = typeof schema & Document;
  return mongoose.model<UserIf>('User', UserSchema);
};
