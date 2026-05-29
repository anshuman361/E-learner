import connectDB from "@/lib/mongodb";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { courseId, chapters } = await req.json();

    const course = await Course.findById(courseId);

    if (!course) {
      return NextResponse.json(
        {
          success: false,
          message: "Course not found",
        },
        { status: 404 },
      );
    }

    course.chapters = chapters;

    course.isPublished = true;

    await course.save();

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
