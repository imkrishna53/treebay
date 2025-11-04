import mongoose from "mongoose";

const HomeSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    sevices_description: {
      type: String,
      default: "We specialize in four key areas of chemical production and renewable energy, delivering the highest quality products with sustainable practices.",
      trim: true,
    },
    sevices_header: {
      type: String,
      default: "Comprehensive Chemical Solutions",
      trim: true,
    },
    hero_feature: [
      {
        key: { type: String, trim: true, default: "" },
        value: { type: String, trim: true, default: "" },
      },
    ],
    hero_design_string1: {
      type: [String],   // array of strings
      default: [],
      trim: true,
    },
    hero_design_string2: {
      type: [String],   // array of strings
      default: [],
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
    
    /* -------------------------------
       🆕 AWS Media Fields
    -------------------------------- */

    // Store a single video URL from AWS S3
    heroVideoUrl: {
      type: String,
      trim: true,
      default: "", // no video initially
    },

    // Store multiple image URLs (max 2)
    heroImageUrls: {
      type: [String],
      default: [], // e.g. ["https://s3.amazonaws.com/.../img1.jpg", ...]
    },
  },
  { timestamps: true } // ✅ Correct placement
);

// Optional text index for searching by description
HomeSchema.index({ description: "text" });

export default mongoose.model("Home", HomeSchema);
