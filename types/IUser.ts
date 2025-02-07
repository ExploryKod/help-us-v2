import mongoose from "mongoose";

export interface IUser extends Document {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  image?: string;
  role?: string;
  provider?: string;
  createdAt?: Date;
  updatedAt?: Date;
}