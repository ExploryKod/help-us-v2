import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Beneficiary } from "@/lib/models/beneficiary.model";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const id = params.id;
    console.log("ID reçu :", id);

    if (!id) {
      return NextResponse.json({ error: "ID de bénéficiaire manquant." }, { status: 400 });
    }

    // Vérifier si l'ID est valide pour MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID de bénéficiaire invalide." }, { status: 400 });
    }

    const donation = await Beneficiary.findById(id);

    if (!donation) {
      return NextResponse.json({ error: "Bénéficiaire non trouvée." }, { status: 404 });
    }

    return NextResponse.json(donation);
  } catch (error) {
    console.error("Erreur lors de la récupération du bénéficiaire :", error);
    return NextResponse.json({ error: "Une erreur est survenue lors de la récupération du bénéficiaire." }, { status: 500 });
  }
}

