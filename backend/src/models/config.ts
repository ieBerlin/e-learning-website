import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import Routes from "../routes";
dotenv.config();
const app = express();
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log("MongoDB connected successfully");
    app.use(express.json());
    Routes(app);
    app.listen(PORT, () => {
      console.log(`App is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("MongoDB connection failed :");
    console.log(error);
    process.exit(1);
  }
}
export default connectDB;
