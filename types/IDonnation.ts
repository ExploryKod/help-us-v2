import mongoose from "mongoose";

export interface IDonation extends Partial<Document> {
    _id: string; 
    amount: number;
    type: string;
    date: Date;
    grade?: string;
    createdAt: Date;
    updatedAt: Date;
}
  
  