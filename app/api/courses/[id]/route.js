import { NextResponse } from "next/server";
//import connectDB from "@/lib/connectDB";
import Course from "@/models/Course";
import connectDB from "@/lib/mongodb";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const course = await Course.findById(params.id).populate("instructor");
    return NextResponse.json(course);
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 },
    );
  }
}
