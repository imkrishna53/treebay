import mongoose from 'mongoose';

const OurServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,  
      trim: true,      
    },
    description: {
      type: String,
      required: true,  
      trim: true,      
    },
    image: {
      type: String,
      required: true,  
      trim: true,      
    },
    features: {
      type: [String],  
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
  },
  { timestamps: true } 
);

export default mongoose.model('OurService', OurServiceSchema);
