import { Donation } from "@/lib/models/donation.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
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

    const donation = await Donation.findById(id)
      .populate('beneficiaryId')
      .populate('donorId');

    if (!donation) {
      return NextResponse.json({ error: "Donation non trouvée." }, { status: 404 });
    }

    return NextResponse.json(donation);
  } catch (error) {
    console.error("Erreur lors de la récupération de la donation:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération de la donation." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const id = params.id;
    const body = await req.json();
    
    const updatedDonation = await Donation.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    )
    .populate('beneficiaryId')
    .populate('donorId');

    if (!updatedDonation) {
      return NextResponse.json({ error: "Donation non trouvée." }, { status: 404 });
    }

    return NextResponse.json(updatedDonation);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la modification de la donation." },
      { status: 500 }
    );
  }
}
