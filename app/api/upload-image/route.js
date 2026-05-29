import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No file uploaded",
        },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
        },

        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      stream.end(buffer);
    });

    return NextResponse.json({
      success: true,

      imageUrl: result.secure_url,
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
