//import connectDB from "@/lib/mongodb";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  await connectDB();

  const body = await req.json();

  const { privyId, email, name, image, role } = body;

  let user = await User.findOne({
    privyId,
  });

  // New user
  if (!user && !role) {
    return Response.json({
      isNewUser: true,
    });
  }

  // Create user
  if (!user) {
    user = await User.create({
      privyId,
      email,
      name,
      image,
      role,
    });
  }

  return Response.json({
    success: true,
    user,
  });
}
