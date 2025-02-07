import connectDB from "@/lib/mongodb"
import User from "@/lib/models/user.model"
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  
  try {
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Une erreur est survenue lors de la récupération des utilisateurs." }, { status: 500 });
  }
}
