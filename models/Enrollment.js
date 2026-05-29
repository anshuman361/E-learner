import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Enrollment ||
  mongoose.model("Enrollment", EnrollmentSchema);
