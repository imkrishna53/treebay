// routes/upload.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Get the absolute path to uploads directory - FIX THIS LINE
const uploadsDir = path.join(process.cwd(), 'uploads', 'services'); // Use process.cwd() instead

console.log('📁 Upload directory setup:');
console.log('   📍 __dirname:', __dirname);
console.log('   📍 process.cwd():', process.cwd());
console.log('   📁 Uploads directory:', uploadsDir);

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  console.log('⚠️  Creating uploads directory...');
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory:', uploadsDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('💾 Saving file to:', uploadsDir);
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    const filename = 'service-' + uniqueSuffix + fileExtension;
    console.log('📄 Generated filename:', filename);
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, PNG, WebP) are allowed!'), false);
    }
  }
});

// Upload endpoint
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    console.log('✅ File upload details:');
    console.log('   📄 Filename:', req.file.filename);
    console.log('   📁 Path:', req.file.path);
    console.log('   🔗 Destination:', req.file.destination);
    
    // Verify file was actually saved
    if (!fs.existsSync(req.file.path)) {
      console.error('❌ File was not saved at path:', req.file.path);
      return res.status(500).json({ message: 'File was not saved properly' });
    }

    console.log('✅ File verified at path:', req.file.path);

    // Return the image URL path
    const imageUrl = `/uploads/services/${req.file.filename}`;
    
    console.log('🌐 Image URL to return:', imageUrl);

    res.json({
      message: 'Image uploaded successfully',
      imageUrl: imageUrl
    });
  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({ message: 'Error uploading image: ' + error.message });
  }
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size too large. Maximum size is 5MB.' });
    }
  }
  res.status(400).json({ message: error.message });
});

export default router;