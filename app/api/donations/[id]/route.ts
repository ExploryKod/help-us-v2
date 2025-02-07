import { Donation } from "@/lib/models/donation.model";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    const id = params.id;

    console.log("ID reçu :", id);

    if (!id) {
      return NextResponse.json({ error: "ID de donation manquant." }, { status: 400 });
    }

    // Vérifier si l'ID est valide pour MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID de donation invalide." }, { status: 400 });
    }

    const donation = await Donation.findById(id);

    if (!donation) {
      return NextResponse.json({ error: "Donation non trouvée." }, { status: 404 });
    }

    return NextResponse.json(donation);
  } catch (error) {
    console.error("Erreur lors de la récupération du don :", error);
    return NextResponse.json({ error: "Une erreur est survenue lors de la récupération du don." }, { status: 500 });
  }
}
