import mongoose from "mongoose";

const HomeSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    yearsExperience: {
      type: String,
      default: "0 Years",
    },
    projectsCompleted: {
      type: String,
      default: "0+",
    },
    qualityRating: {
      type: String,
      default: "100%",
    },
    supportAvailable: {
      type: String,
      default: "24/7",
    },
  },
  { timestamps: true } // ✅ Correct placement
);

// Optional text index for searching by description
HomeSchema.index({ description: "text" });

export default mongoose.model("Home", HomeSchema);
