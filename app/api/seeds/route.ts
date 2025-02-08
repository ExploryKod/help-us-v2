// app/api/seed/route.ts
import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  image?: string;
  role?: 'admin' | 'user';
  provider?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IDonation {
    _id: mongoose.Types.ObjectId;
    amount: number;
    type: string;
    date: Date;
    grade?: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface IDonor {
  id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  donationType: 'financial' | 'material';
  status: 'active' | 'inactive';
}
  
export interface IBeneficiary {
    id?: mongoose.Types.ObjectId;
    name: string;
    email: string;
    needs: string;
    status: 'active' | 'inactive' | 'urgent';
    createdAt?: Date;
    updatedAt?: Date;
}


export async function POST(req: Request) {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://amauryfranssen:password900@cluster0.n8h2o.mongodb.net/helpus', {
      ssl: true,
      authSource: 'admin',
      dbName: 'helpus'
    })

    // Define seed data
    const users: IUser[] = [
      {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        role: "admin",
        provider: "credentials"
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        password: "password124",
        role: "user",
        provider: "credentials"
      },
      {
        name: "Mary Smith",
        email: "mary.smith@example.com",
        password: "password125",
        role: "user",
        provider: "credentials"
      }
    ]

    // Import model
    const UserModel = mongoose.models.User || 
      mongoose.model('User', new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String },
        image: { type: String },
        role: { type: String, default: 'user' },
        provider: { type: String, default: 'credentials' }
      }, { timestamps: true }))

    // Clear existing documents
    //await UserModel.deleteMany({})

    // Insert new documents
    const insertedUsers = await UserModel.insertMany(users)

    // Define donor seed data
    const donors: IDonor[] = [
      {
        id: new mongoose.Types.ObjectId(),
        name: "Pierre Dupont",
        email: "pierre.dupont@example.com",
        phone: "+33612345678",
        donationType: "financial",
        status: "active"
      },
      {
        id: new mongoose.Types.ObjectId(),
        name: "Marie Martin",
        email: "marie.martin@example.com",
        donationType: "material",
        status: "active"
      },
      {
        id: new mongoose.Types.ObjectId(),
        name: "Jean Durand",
        email: "jean.durand@example.com",
        phone: "+33698765432",
        donationType: "financial",
        status: "inactive"
      }
    ]

    // Import Donor model
    const DonorModel = mongoose.models.Donor ||
        mongoose.model('Donor', new mongoose.Schema({
          name: { type: String, required: true },
          email: { type: String, unique: true, required: true },
          phone: { type: String },
          donationType: { type: String, enum: ['financial', 'material'], required: true },
          status: { type: String, enum: ['active', 'inactive'], default: 'active' }
        }, { timestamps: true }))

    // Clear existing donors
    //await DonorModel.deleteMany({})

    // Insert new donors
    const insertedDonors = await DonorModel.insertMany(donors)

    // Define donation seed data
    const donations: IDonation[] = [
      {
        _id: new mongoose.Types.ObjectId(),
        amount: 100,
        type: "financial",
        date: new Date(),
        grade: "A",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new mongoose.Types.ObjectId(),
        amount: 200,
        type: "material",
        date: new Date(),
        grade: "B",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new mongoose.Types.ObjectId(),
        amount: 150,
        type: "financial",
        date: new Date(),
        grade: "A",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    // Import Donation model
    const DonationModel = mongoose.models.Donation ||
        mongoose.model('Donation', new mongoose.Schema({
          amount: { type: Number, required: true },
          type: { type: String, enum: ['financial', 'material'], required: true },
          date: { type: Date, required: true },
          grade: { type: String },
          createdAt: { type: Date },
          updatedAt: { type: Date }
        }, { timestamps: true }))

    // Clear existing donations
    //await DonationModel.deleteMany({})

    // Insert new donations
    const insertedDonations = await DonationModel.insertMany(donations)


    // Define beneficiary data
    const beneficiaries: IBeneficiary[] = [
      {
        id: new mongoose.Types.ObjectId(),
        name: "Marie Dubois",
        email: "marie.dubois@example.com",
        needs: "Besoin d'aide pour les frais médicaux",
        status: "urgent"
      },
      {
        id: new mongoose.Types.ObjectId(),
        name: "Pierre Martin",
        email: "pierre.martin@example.com",
        needs: "Besoin d'aide pour le logement",
        status: "active"
      },
      {
        id: new mongoose.Types.ObjectId(),
        name: "Sophie Laurent",
        email: "sophie.laurent@example.com",
        needs: "Besoin d'aide pour l'éducation",
        status: "inactive"
      }
    ]

    // Import model
    const BeneficiaryModel = mongoose.models.Beneficiary || 
        mongoose.model('Beneficiary', new mongoose.Schema({
          name: { type: String, required: true },
          email: { type: String, unique: true, required: true },
          needs: { type: String, required: true },
          status: { 
            type: String, 
            enum: ['active', 'inactive', 'urgent'], 
            default: 'active' 
          }
        }, { timestamps: true }))

    // Clear existing documents
    await BeneficiaryModel.deleteMany({})

    // Insert new documents
    const insertedBeneficiaries = await BeneficiaryModel.insertMany(beneficiaries)

    // Disconnect
    await mongoose.disconnect()

    return NextResponse.json({
      success: true,
      message: `Seeded ${insertedUsers.length} users, ${insertedDonors.length} donors, and ${insertedDonations.length} donations`
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la création de la donation." }, { status: 500 }
    );
  }
}