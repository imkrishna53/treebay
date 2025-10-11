// routes/ourservices.js

import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import OurService from '../models/OurServices.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Setup uploads path: /uploads/services
const uploadsDir = path.join(process.cwd(), 'uploads', 'services');

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


router.post('/', upload.single('image'), async (req, res) => {
    console.log("=== Incoming /our-services POST ===");
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  try {
    const { title, description, features, path: routePath, badge } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const imagePath = `uploads/services/${req.file.filename}`;

    const newService = new OurService({
      title,
      description,
      image: imagePath,
      features: features ? JSON.parse(features) : [],
      path: routePath,
      badge,
    });

    await newService.save();

    res.status(201).json({
      message: 'Service created successfully',
      service: newService,
    });
  } catch (error) {
    console.error('❌ Error creating service:', error);
    res.status(500).json({ message: 'Error creating service', error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const services = await OurService.find();
    if (!services.length) {
      return res.status(404).json({ message: 'No services found' });
    }
    res.status(200).json(services);
  } catch (error) {
    console.error('❌ Error fetching services:', error);
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
});


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


router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, description, features, path: routePath, badge } = req.body;

    const updatedFields = {
      title,
      description,
      path: routePath,
      badge,
      features: features ? JSON.parse(features) : []
    };

    if (req.file) {
      updatedFields.image = `uploads/services/${req.file.filename}`;
    }

    const updatedService = await OurService.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Service updated successfully', service: updatedService });
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedService = await OurService.findByIdAndDelete(req.params.id);

    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
});

export default router;
