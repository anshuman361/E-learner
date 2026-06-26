import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Enrollment from "@/models/Enrollment";

export async function POST(req) {
  try {
    await connectDB();

    const { studentId, courseId } = await req.json();

    // Validation
    if (!studentId || !courseId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing studentId or courseId",
        },
        { status: 400 },
      );
    }

    // Already enrolled?
    const exists = await Enrollment.findOne({
      studentId,
      courseId,
    });

    if (exists) {
      return NextResponse.json({
        success: true,
        alreadyEnrolled: true,
      });
    }

    // Save enrollment
    const enrollment = await Enrollment.create({
      studentId,
      courseId,
    });

    return NextResponse.json({
      success: true,
      message: "Enrollment Successful",
      enrollment,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 },
    );
  }
}
