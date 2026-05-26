import { NextResponse } from "next/server";
import Enrollment from "@/models/Enrollment";
import connectDB from "@/lib/mongodb";
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const alreadyEnrolled = await Enrollment.findOne({
      student: body.studentId,
      course: body.courseId,
    });

    if (alreadyEnrolled) {
      return NextResponse.json({
        message: "Already enrolled",
      });
    }

    const enrollment = await Enrollment.create({
      student: body.studentId,
      course: body.courseId,
    });

    return NextResponse.json(enrollment);
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 },
    );
  }
}
