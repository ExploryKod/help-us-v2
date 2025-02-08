// models/Donor.ts
import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String
  },
  donationType: {
    type: String,
    enum: ['financial', 'material'],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
});

const Donor = mongoose.models.Donation || mongoose.model("Donor", donorSchema)

export { Donor }
