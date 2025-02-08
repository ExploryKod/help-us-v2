import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { DonationType, DonorStatus, IDonor } from '@/types/IDonor';
import { IUser, UserRolesEnum } from '@/types/IUser';
import User from '@/lib/models/user.model';
import { Donor } from '@/lib/models/donors.model';
import { IDonation } from '@/types/IDonnation';
import { Donation } from '@/lib/models/donation.model';
import { BeneficiaryStatus, IBeneficiary } from '@/types/IBeneficiary';
import { Beneficiary } from '@/lib/models/beneficiary.model';

export async function POST(req: Request) {
  try {
    console.log("Connexion à MongoDB en cours...");
    await mongoose.connect(process.env.MONGODB_URI_SEEDS!);
    console.log("Connexion réussie !");

    //======= USERS SEED DATA =======//
    const users: IUser[] = [
      {
        _id: new mongoose.Types.ObjectId(),
        name: "John Doe",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "password123",
        image: "https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109",
        role: UserRolesEnum.ADMIN,
        provider: "credentials",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId(),
        name: "Jane Smith",
        firstName: "Jane Smith",
        lastName: "Doe",
        email: "jane.smith@example.com",
        password: "password123",
        role: UserRolesEnum.USER,
        provider: "credentials",
        image: "https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: new mongoose.Types.ObjectId(),
        name: "Alice Johnson",
        firstName: "Alice",
        lastName: "Alice",
        email: "alice.johnson@example.com",
        password: "password123",
        role: UserRolesEnum.BENEFICIARY,
        provider: "credentials",
        image: "https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    console.log("Insertion des utilisateurs...");
    const insertedUsers = await User.insertMany(users);
    console.log(`${insertedUsers.length} utilisateurs insérés.`);

    //======= DONORS SEED DATA =======//
    try {
      const donors: IDonor[] = [
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Pierre Dupont",
          email: "pierre.dupont@example.com",
          phone: "+33612345678",
          donationType: DonationType.FINANCIAL,
          status: DonorStatus.ACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Marie Curie",
          email: "marie.curie@example.com",
          phone: "+33687654321",
          donationType: DonationType.MATERIAL,
          status: DonorStatus.INACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Albert Einstein",
          email: "albert.einstein@example.com",
          phone: "+33612349876",
          donationType: DonationType.FINANCIAL,
          status: DonorStatus.ACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      console.log("Insertion des donateurs...");
      const insertedDonors = await Donor.insertMany(donors);
      console.log(`${insertedDonors.length} donateurs insérés.`);
    } catch (error) {
      console.error("Erreur lors de l'insertion des donateurs :", error);
    }

    //======= DONATIONS SEED DATA =======//
    try {
      const donations: IDonation[] = [
        {
          _id: new mongoose.Types.ObjectId(),
          amount: 100,
          type: "financial",
          date: new Date(),
          grade: "A",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: new mongoose.Types.ObjectId(),
          amount: 200,
          type: "material",
          date: new Date(),
          grade: "B",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: new mongoose.Types.ObjectId(),
          amount: 150,
          type: "financial",
          date: new Date(),
          grade: "A",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      console.log("Insertion des donations...");
      const insertedDonations = await Donation.insertMany(donations);
      console.log(`${insertedDonations.length} donations insérées.`);
    } catch (error) {
      console.error("Erreur lors de l'insertion des donations :", error);
    }

    //======= BENEFICIARIES SEED DATA =======//
    try {
      const beneficiaries: IBeneficiary[] = [
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Marie Dubois",
          email: "marie.dubois@example.com",
          needs: "Besoin d'aide pour les frais médicaux",
          status: BeneficiaryStatus.URGENT,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Pierre Martin",
          email: "pierre.martin@example.com",
          needs: "Besoin d'aide pour le logement",
          status: BeneficiaryStatus.ACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Sophie Laurent",
          email: "sophie.laurent@example.com",
          needs: "Besoin d'aide pour l'éducation",
          status: BeneficiaryStatus.INACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      console.log("Insertion des bénéficiaires...");
      const insertedBeneficiaries = await Beneficiary.insertMany(beneficiaries);
      console.log(`${insertedBeneficiaries.length} bénéficiaires insérés.`);
    } catch (error) {
      console.error("Erreur lors de l'insertion des bénéficiaires :", error);
    }

    // Déconnexion propre
    console.log("Déconnexion de MongoDB...");
    await mongoose.disconnect();
    console.log("Déconnexion réussie !");

    return NextResponse.json({
      success: true,
      message: "Données insérées avec succès.",
    });
  } catch (error) {
    console.error("Erreur principale :", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la création des données." },
      { status: 500 }
    );
  }
}
