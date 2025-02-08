import mongoose from "mongoose";

export enum DonationType {
    FINANCIAL = "financial",
    MATERIAL = "material",
}

export enum DonorStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

export interface IDonor {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    phone?: string;
    donationType: DonationType;
    status: DonorStatus;
    createdAt: Date;
    updatedAt: Date;
}