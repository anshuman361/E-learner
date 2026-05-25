import connectDB from "@/lib/mongodb";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    console.log("CONNECTED DB");

    const courses = await Course.find();

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
