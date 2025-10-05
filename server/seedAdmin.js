import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";
import bcrypt from "bcryptjs";

const run = async () => {
  await connectDB();
  const email = process.env.ADMIN_EMAIL || "treebay@gmail.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const name = process.env.ADMIN_NAME || "Admin";

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log("Admin already exists");
    process.exit();
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const admin = new Admin({ name, email, password: hashed });
  await admin.save();
  console.log("Admin created:", email);
  process.exit();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
