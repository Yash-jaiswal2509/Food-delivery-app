import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  try {
    const conn = await mongoose
      .connect(process.env.MONGODB_CONNECTION_STRING, {})
      .then(() => {
        console.log("MongoDB connection established");
      });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
