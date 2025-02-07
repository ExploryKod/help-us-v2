export interface IDonation extends Document {
    _id: string;
    montant: number;
    type: string;
    date: Date;
    grade?: string;
    createdAt: Date;
    updatedAt: Date;
}
  