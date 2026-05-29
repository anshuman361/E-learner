import { NextResponse } from "next/server";

import connectDB from "@/lib/connectDB";
import Course from "@/models/Course";

// export async function GET() {
//   try {
//     await connectDB();

//     const courses = await Course.find({
//       isPublished: true,
//     }).populate("instructor");

//     return NextResponse.json(courses);
//   } catch (error) {
//     return NextResponse.json(
//       {
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    console.log(body);

    const course = await Course.create({
      title: body.title,
      category: body.category,
      description: body.description,
      price: body.price,
      thumbnail: body.thumbnail || "",
    });

    return NextResponse.json({
      success: true,
      course,
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
