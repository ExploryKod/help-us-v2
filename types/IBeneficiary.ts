import mongoose from "mongoose";

export enum BeneficiaryStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    URGENT = "urgent",
}
export interface IBeneficiary extends Partial<Document> {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    needs: string;
    status?: BeneficiaryStatus;
    createdAt: Date;
    updatedAt: Date;
}
  