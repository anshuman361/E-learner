import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  title: String,

  type: {
    type: String,
    enum: ["video", "article"],
  },

  videoUrl: String,

  articleContent: String,

  freePreview: {
    type: Boolean,
    default: false,
  },
});

const chapterSchema = new mongoose.Schema({
  title: String,

  topics: [topicSchema],
});

const courseSchema = new mongoose.Schema(
  {
    title: String,

    subtitle: String,

    description: String,

    price: Number,

    thumbnail: String,

    chapters: [chapterSchema],

    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Course || mongoose.model("Course", courseSchema);
