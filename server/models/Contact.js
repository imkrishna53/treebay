import mongoose from "mongoose"; 

const ContactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, required: true }, 
  serviceInterest: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Service',  
    required: true 
  },
  message: { type: String, required: true }
}, { timestamps: true });


export default mongoose.model("Contact", ContactSchema);