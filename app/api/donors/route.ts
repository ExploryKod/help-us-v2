import { Donor } from "@/lib/models/donors.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const donors = await Donor.find();
    return NextResponse.json(donors);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Une erreur est survenue lors de la récupération des donateurs." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const body = await req.json();
    const donors = new Donor(body);
    await donors.save();
    return NextResponse.json(donors);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Une erreur est survenue lors de la création de la donateurs." }, { status: 500 });
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
    return NextResponse.json({ error: "Une erreur est survenue lors de la modification de la donor." }, { status: 500 });
  }
}
