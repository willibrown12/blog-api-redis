import mongoose from "mongoose";
import {mongoURI} from "./db";

export default async function mongoConnect() {


  try {
    console.log("✅ MongoDB connected");
    return await mongoose.connect(mongoURI)

  
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // force app to exit if DB isn't available
  }
}