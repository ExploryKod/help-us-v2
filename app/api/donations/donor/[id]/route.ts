import { Donation } from "@/lib/models/donation.model";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const donorId = params.id;
    const donations = await Donation.find({ donorId }).populate('beneficiaryId');
    return NextResponse.json(donations);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Une erreur est survenue lors de la récupération des dons du donateur." }, { status: 500 });
  }
} 