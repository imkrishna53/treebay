import mongoose from "mongoose";

const logoSchema = new mongoose.Schema(
  {
    logoUrl: { type: String, required: false }
  },
  { timestamps: true }
);

export default mongoose.model("Logo", logoSchema);
