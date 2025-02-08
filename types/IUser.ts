import mongoose from "mongoose";

export interface IUser extends Partial<Document> {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  image?: string;
  role?: 'admin' | 'user';
  provider?: string;
  createdAt?: Date;
  updatedAt?: Date;
}