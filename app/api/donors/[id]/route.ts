import { Donor } from "@/lib/models/donors.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    const id = params.id;

    console.log("ID donateur reçu :", id);

    if (!id) {
      return NextResponse.json({ error: "ID de donateur manquant." }, { status: 400 });
    }

    // Vérifier si l'ID est valide pour MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID de donateur invalide." }, { status: 400 });
    }

    const donor = await Donor.findById(id);

    if (!donor) {
      return NextResponse.json({ error: "Donateur non trouvée." }, { status: 404 });
    }

    return NextResponse.json(donor);
  } catch (error) {
    console.error("Erreur lors de la récupération du donateur:", error);
    return NextResponse.json({ error: "Une erreur est survenue lors de la récupération du donateur." }, { status: 500 });
  }
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const id = params.id;
    const body = await req.json();
    const donor = await Donor.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(donor);
  }
  catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Une erreur est survenue lors de la modification du donateur." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const id = params.id;
    const donor = await Donor.findByIdAndDelete(id);
    return NextResponse.json(donor);
  }
  catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Une erreur est survenue lors de la suppression du donateur." }, { status: 500 });
  }
}