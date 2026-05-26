import connectDB from "@/lib/mongodb";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    //const courses = await Course.find();
    //const courses = await Course.find();
    const courses = await Course.find({
      isPublished: true,
    });
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 },
    );
  }
}
