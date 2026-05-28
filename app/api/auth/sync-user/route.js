//import { connectDB } from "@/lib/mongodb";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const { privyId, email, role, provider } = body;

    let user = await User.findOne({
      privyId,
    });

    // NEW USER
    if (!user && !role) {
      return Response.json({
        isNewUser: true,
      });
    }

    // CREATE USER
    if (!user) {
      user = await User.create({
        privyId,
        email,
        role,
        provider,
      });
    }

    return Response.json({
      success: true,
      isNewUser: false,
      user,
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
