import mongoose from "mongoose";
export interface IDonation {
    _id: mongoose.Types.ObjectId;
    amount: number;
    type: string;
    date: Date;
    grade?: string;
    createdAt: Date;
    updatedAt: Date;
}
  