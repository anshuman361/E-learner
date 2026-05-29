import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
  title: String,
  type: {
    type: String,
    enum: ["video", "article"],
  },
  video: String,
  article: String,
});

const ChapterSchema = new mongoose.Schema({
  title: String,
  topics: [TopicSchema],
});

const CourseSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    thumbnail: String,
    price: {
      type: Number,
      default: 0,
    },
    category: String,
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    chapters: [ChapterSchema],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
