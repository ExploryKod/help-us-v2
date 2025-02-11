import mongoose from "mongoose";
import { IDonor } from "./IDonor";
import { IBeneficiary } from "./IBeneficiary";

export interface IDonation extends Document {
  _id: mongoose.Types.ObjectId;
  donorId: mongoose.Types.ObjectId | IDonor;
  beneficiaryId: mongoose.Types.ObjectId | IBeneficiary;
  amount: number;
  type: string;
  date: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}