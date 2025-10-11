import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';

import authRoutes from "./routes/auth.js";
import servicesRoutes from "./routes/services.js";
import uploadRoutes from "./routes/upload.js";
import contactRoutes from "./routes/contact.js";
import OurServicesRoutes from './routes/ourServices.js'; 


// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve /uploads statically


const allowedOrigins = [
   'https://treebay1.vercel.app', // Your Vercel frontend
  'http://localhost:5000', // For local development
  'http://localhost:5173',
  'https://treebaytechnology.com'

];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Enable if you're using cookies/sessions
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));


// FIXED: Proper static file serving with MIME types
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    console.log(ext);
    
    // Set proper MIME types for images
    if (ext === '.jpg' || ext === '.jpeg') {
      res.setHeader('Content-Type', 'image/jpeg');
    } else if (ext === '.png') {
      res.setHeader('Content-Type', 'image/png');
    } else if (ext === '.gif') {
      res.setHeader('Content-Type', 'image/gif');
    } else if (ext === '.webp') {
      res.setHeader('Content-Type', 'image/webp');
    } else if (ext === '.svg') {
      res.setHeader('Content-Type', 'image/svg+xml');
    }
      // 🔥 Add this header to fix CORP
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

    // Optional: Add cache control headers
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
  }
}));

app.use("/api/auth", authRoutes);
app.use("/api/services", servicesRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/our-services', OurServicesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Static files served from: ${path.join(__dirname, 'uploads')}`);
  console.log(`📍 Current directory: ${process.cwd()}`);
  
  // Check if uploads directory exists
  const uploadsPath = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadsPath)) {
    console.log('⚠️  Uploads directory does not exist, creating...');
    fs.mkdirSync(uploadsPath, { recursive: true });
    console.log('✅ Created uploads directory');
  }
  
  const servicesPath = path.join(__dirname, 'uploads', 'services');
  if (!fs.existsSync(servicesPath)) {
    console.log('⚠️  Services uploads directory does not exist, creating...');
    fs.mkdirSync(servicesPath, { recursive: true });
    console.log('✅ Created services upload directory');
  }
});