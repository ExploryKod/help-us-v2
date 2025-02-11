"use server";

import { Donation } from "@/lib/models/donation.model";
import connectDB from "@/lib/mongodb";
import { IDonation } from "@/types/IDonnation";

export async function getDonations(): Promise<IDonation[]> {
  await connectDB();

  try {
    const donations: IDonation[] = await Donation.find()
      .populate('beneficiaryId', 'name') // Only get the name field from beneficiary
      .populate('donorId', 'name')       // Only get the name field from donor
      .lean();
    return donations;
  } catch (error) {
    console.error("Erreur lors de la récupération des donations :", error);
    return [];
  }
}
