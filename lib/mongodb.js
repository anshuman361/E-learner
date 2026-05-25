import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://pandeyanshuman361_db_user:PIyPEqHcRZyNGfB6@bike-lo.in66yxe.mongodb.net/elearner?appName=Bike-Lo";

async function connectDB() {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }

    await mongoose.connect(MONGODB_URI);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default connectDB;
