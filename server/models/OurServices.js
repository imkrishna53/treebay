import mongoose from 'mongoose';

const OurServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // stored path to image, e.g. "uploads/services/service-...png"
    required: true,
  },
  features: {
    type: [String], // array of feature strings
    default: [],
  },
  path: {
    type: String,
    required: true,
    trim: true,
  },
  badge: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true, // optional: adds createdAt and updatedAt fields
});

export default mongoose.model('OurService', OurServiceSchema);
