import connectDB from "@/lib/mongodb";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const { instructorId } = await req.json();
    const courses = await Course.find({ instructorId }).sort({ createdAt: -1 });

    console.log("COURSES:", courses);

    return NextResponse.json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
