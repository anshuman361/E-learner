import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Course from "@/models/Course";

export async function GET(req, context) {
  try {
    await connectDB();

    const params = await context.params;

    const course = await Course.findById(params.courseId);

    return NextResponse.json({
      success: true,
      course,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
