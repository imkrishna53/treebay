import mongoose from 'mongoose';

const ourServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Image path is required']
  },
  features: [{
    type: String,
    required: true,
    trim: true
  }],
  path: {
    type: String,
    required: [true, 'Path is required'],
    trim: true,
    unique: true
  },
  badge: {
    type: String,
    required: [true, 'Badge is required'],
    trim: true
  }
}, {
  timestamps: true
});

// Index for better performance
ourServiceSchema.index({ path: 1 });
ourServiceSchema.index({ createdAt: -1 });

export default mongoose.model('OurService', ourServiceSchema);