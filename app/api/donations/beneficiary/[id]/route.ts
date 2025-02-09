import { Donation } from "@/lib/models/donation.model";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const beneficiaryId = params.id;
    const donations = await Donation.find({ beneficiaryId }).populate('donorId');
    return NextResponse.json(donations);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Une erreur est survenue lors de la récupération des dons du bénéficiaire." }, { status: 500 });
  }
} 