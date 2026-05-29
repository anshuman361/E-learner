import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Course from "@/models/Course";

export async function GET() {
  try {
    await connectDB();

    const courses = await Course.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,

      courses,
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
