import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import OurService from '../models/OurServices.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Setup uploads path: /uploads/services1 (matching your server.js structure)
const uploadsDir = path.join(process.cwd(), 'uploads', 'services1');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `service-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const isValidExt = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const isValidMime = allowedTypes.test(file.mimetype);
    if (isValidExt && isValidMime) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, PNG, WebP) are allowed!'));
    }
  }
});

// POST - Create new service
router.post('/', upload.single('image'), async (req, res) => {
  console.log("=== Incoming /our-services POST ===");
  console.log("req.body:", req.body);
  console.log("req.file:", req.file); // This should no longer be undefined

  try {
    // 1) Check if a file was actually received
    if (!req.file) {
      return res.status(400).json({ message: 'No image file was uploaded.' });
    }

    // 2) Safely process the features array
    let featuresArray = [];
    if (req.body.features) {
      // If features come as an array from FormData (e.g., features[0], features[1])
      if (typeof req.body.features === 'object') {
        featuresArray = Object.values(req.body.features)
          .filter(feature => feature != null) // Remove null/undefined
          .map(feature => String(feature)) // Convert everything to string to avoid .trim() errors
          .map(feature => feature.trim())
          .filter(feature => feature !== ''); // Remove empty strings
      }
      // If it's a single string
      else if (typeof req.body.features === 'string' && req.body.features.trim() !== '') {
        featuresArray = [req.body.features.trim()];
      }
    }

    // 3) Your existing validation and logic
    const { title, description, path: routePath, badge } = req.body;
    if (!title || !description || !routePath || !badge) {
      // Delete the uploaded file if other validations fail
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: 'All text fields are required.' });
    }

    const imagePath = `uploads/services1/${req.file.filename}`;

    const newService = new OurService({
      title,
      description,
      image: imagePath,
      features: featuresArray, // Use the safely processed array
      path: routePath,
      badge,
    });

    await newService.save();
    res.status(201).json({ message: 'Service created successfully', service: newService });

  } catch (error) {
    // Delete the uploaded file if anything in the try block fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('❌ Error creating service:', error);
    res.status(500).json({ message: 'Error creating service', error: error.message });
  }
});

// GET - All services
router.get('/', async (req, res) => {
  try {
    const services = await OurService.find().sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    console.error('❌ Error fetching services:', error);
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
});

// GET - Single service by ID
router.get('/:id', async (req, res) => {
  try {
    const service = await OurService.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service', error: error.message });
  }
});

// PUT - Update service (Fixed for FormData features array)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, description, path: routePath, badge } = req.body;

    // Handle features array from FormData
    let features = [];
    if (req.body.features) {
      const featureKeys = Object.keys(req.body).filter(key => key.startsWith('features'));
      if (featureKeys.length > 0) {
        features = featureKeys
          .map(key => req.body[key])
          .filter(feature => feature && feature.trim() !== '');
      } else {
        try {
          features = JSON.parse(req.body.features);
        } catch {
          features = [req.body.features].filter(f => f && f.trim() !== '');
        }
      }
    }

    const updatedFields = {
      title,
      description,
      path: routePath,
      badge,
      features: features
    };

    // If new image is uploaded, update image and delete old one
    if (req.file) {
      // Get current service to delete old image
      const currentService = await OurService.findById(req.params.id);
      if (currentService && currentService.image) {
        try {
          const oldImagePath = path.join(process.cwd(), currentService.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        } catch (error) {
          console.log('Error deleting old image:', error);
        }
      }
      updatedFields.image = `uploads/services1/${req.file.filename}`;
    }

    const updatedService = await OurService.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ 
      message: 'Service updated successfully', 
      service: updatedService 
    });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
});

// DELETE - Remove service
router.delete('/:id', async (req, res) => {
  try {
    const serviceToDelete = await OurService.findById(req.params.id);
    
    if (!serviceToDelete) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Delete associated image file
    if (serviceToDelete.image) {
      try {
        const imagePath = path.join(process.cwd(), serviceToDelete.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      } catch (error) {
        console.log('Error deleting image file:', error);
      }
    }

    await OurService.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
});

export default router;