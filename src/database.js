import mongoose from "mongoose";
import "dotenv/config";

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado");
  } catch (error) {
    console.log(error);
  }
}
