// models/Service.js - Updated with slug field
import mongoose from "mongoose";


const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
    image: {
    type: String,
    trim: true,
    default: ""
  },
  heroDescription: {
    type: String,
    required: true,
    trim: true
  },
  keyFeaturesDescription: {
    type: String,
    trim: true,
    default: ""
  },
  keyFeatures: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    }
  }],
  applicationsDescription: {
    type: String,
    trim: true,
    default: ""
  },
  applications: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    features: [{
      type: String,
      trim: true
    }]
  }],
  technicalSpecifications: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    value: {
      type: String,
      required: true,
      trim: true
    }
  }],
  whyChooseUs: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// **FIXED: Proper slug generation middleware**
ServiceSchema.pre('save', function(next) {
  console.log('Pre-save hook running for:', this.title);
  
  // Only generate slug if title is modified or slug doesn't exist
  if (this.isModified('title') || !this.slug) {
    let slug = this.title
      .toLowerCase()
      .replace(/&/g, 'and') // Replace & with 'and'
      .replace(/[^a-z0-9 ]/g, '') // Remove invalid chars
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/-+/g, '-'); // Replace multiple - with single -
    
    // Ensure slug is not empty
    if (!slug) {
      slug = 'service-' + Date.now();
    }
    
    this.slug = slug;
    console.log('Generated slug:', this.slug);
  }
  
  next();
});

// Indexes
ServiceSchema.index({ title: 'text', description: 'text' });
ServiceSchema.index({ slug: 1 });


export default mongoose.model("Service", ServiceSchema);