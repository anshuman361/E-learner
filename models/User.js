import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    privyId: String,

    email: String,
    role: {
      type: String,
      enum: ["student", "instructor"],
    },

    provider: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
