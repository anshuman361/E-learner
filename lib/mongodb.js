import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://pandeyanshuman361_db_user:PIyPEqHcRZyNGfB6@bike-lo.in66yxe.mongodb.net/elearner?appName=Bike-Lo",
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
