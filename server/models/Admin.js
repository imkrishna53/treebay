import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Admin", AdminSchema);
