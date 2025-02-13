"use server";

import connectDB from "@/lib/mongodb";
import { IDonor } from "@/types/IDonor";
import { Donor } from "../models/donors.model";

export async function getDonors(): Promise<IDonor[]> {
  await connectDB();

  try {
    const donors: IDonor[] = await Donor.find();
    return donors;
  } catch (error) {
    console.error("Erreur lors de la récupération des donors :", error);
    return [];
  }
}

export async function getDonorById(id: string): Promise<IDonor | null> {
  await connectDB();

  try {
    const donor: IDonor | null = await Donor.findById(id);
    return donor;
  } catch (error) {
    console.error("Erreur lors de la récupération du donor :", error);
    return null;
  }
}

export async function createDonor(donor: IDonor): Promise<IDonor> {
  await connectDB();

  try {
    const newDonor: IDonor = await Donor.create(donor);
    return newDonor;
  } catch (error) {
    console.error("Erreur lors de la création du donor :", error);
    return donor;
  }
}
