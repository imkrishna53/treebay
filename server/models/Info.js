import { Mail } from "lucide-react";
import mongoose from "mongoose";
import { number } from "zod";

const InfoSchema = new mongoose.Schema(
  {
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true, // optional, converts email to lowercase
        match: [/.+@.+\..+/, 'Please enter a valid email'] // basic email validation
    },
    phone: {
        type: Number,
        required: true,
        min: 1000000000, // minimum 10-digit number
        max: 9999999999, // maximum 10-digit number
    },
    Address: {
      type: String,
      default: "6/299 Vaishnav Khand, Sector -6 Gomti nagar Extension, Lucknow -UP, 226010",
    },
    social: {
        facebook: {
          type: String,
          trim: true,
          default: "www.facebook.com",
        },
        instagram: {
          type: String,
          trim: true,
          default: "www.instagram.com",
        },
        twitter: {
          type: String,
          trim: true,
          default: "www.twitter.com",
        },
      }
  },
  { timestamps: true } // ✅ Correct placement
);

// Optional text index for searching by description
InfoSchema.index({ email: "text" });

export default mongoose.model("Info", InfoSchema);


// connect@treebaytechnology.com

// +919871599470

// 6/299 Vaishnav Khand, Sector -6
// Gomti nagar Extension, Lucknow -UP, 226010