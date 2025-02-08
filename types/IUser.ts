import mongoose from "mongoose";

export enum UserRolesEnum {
  ADMIN = 'admin',
  USER = 'user',
  BENEFICIARY = 'beneficiary',
  DONOR = 'donor'
}


export interface IUser extends Partial<Document> {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  image?: string;
  role?: UserRolesEnum;
  provider?: string;
  createdAt?: Date;
  updatedAt?: Date;
}