import { NextResponse } from "next/server";
import Enrollment from "@/models/Enrollment";
import connectDB from "@/lib/mongodb";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    console.log("BODY:", body);

    const exists = await Enrollment.findOne({
      studentId: body.studentId,
      courseId: body.courseId,
    });

    if (exists) {
      return NextResponse.json({
        message: "Already enrolled",
      });
    }
    const enrollment = await Enrollment.create({
      studentId: body.studentId,
      courseId: body.courseId,
    });

    return NextResponse.json(enrollment);
  } catch (error) {
    console.error("ENROLL ERROR:", error);
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 },
    );
  }
}
