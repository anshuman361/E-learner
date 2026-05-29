import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");
    const users = await User.find({ role });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
