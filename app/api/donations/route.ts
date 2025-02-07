import { Donation } from "@/lib/models/donation.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const donations = await Donation.find();
    return NextResponse.json(donations);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Une erreur est survenue lors de la récupération des dons." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const body = await req.json();
    const donation = new Donation(body);
    await donation.save();
    return NextResponse.json(donation);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Une erreur est survenue lors de la création de la donation." }, { status: 500 });
  }
}