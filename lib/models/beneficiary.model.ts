import mongoose from "mongoose"

const beneficiarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  needs: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'urgent'],
  }
}, { timestamps: true })

const Beneficiary = mongoose.models.Beneficiary || mongoose.model("Beneficiary", beneficiarySchema)

export { Beneficiary }