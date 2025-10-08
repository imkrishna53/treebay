import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";

// Manually resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import mongoose from "mongoose";
// Manually load .env from root of server
dotenv.config({ path: path.resolve(__dirname, '../.env') }); // 👈 important fix

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
