// routes/ourservices.js

import express from 'express';
import OurService from '../models/OurServices.js';

import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// ✅ Path to uploads/services
const uploadsDir = path.join(process.cwd(), 'uploads', 'services');

// ✅ Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ✅ Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, `service-${uniqueSuffix}${fileExtension}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const isValidExt = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const isValidMime = allowedTypes.test(file.mimetype);
    if (isValidExt && isValidMime) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, or WebP images are allowed.'));
    }
  }
});

// ✅ Create a new service with image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, features, path: routePath, badge } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    if (!title || !description || !routePath) {
      return res.status(400).json({ message: 'Title, description, and path are required' });
    }

    const imagePath = `uploads/services/${req.file.filename}`;

    const newService = new OurService({
      title,
      description,
      image: imagePath,
      features: features ? JSON.parse(features) : [],
      path: routePath,
      badge
    });

    await newService.save();

    res.status(201).json({
      message: 'Service created successfully',
      service: newService
    });
  } catch (error) {
    console.error('❌ Error creating service:', error);
    res.status(500).json({ message: 'Error creating service', error: error.message });
  }
});

// ✅ Get all services
router.get('/', async (req, res) => {
  try {
    const services = await OurService.find();

    if (!services || services.length === 0) {
      return res.status(404).json({ message: 'No services found' });
    }

    res.status(200).json(services);
  } catch (error) {
    console.error('❌ Error fetching services:', error);
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
});

// ✅ Get single service
router.get('/:id', async (req, res) => {
  try {
    const service = await OurService.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json(service);
  } catch (error) {
    console.error('❌ Error fetching service:', error);
    res.status(500).json({ message: 'Error fetching service', error: error.message });
  }
});

// ✅ Update service
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, description, features, path: routePath, badge } = req.body;

    const updatedData = {
      title,
      description,
      path: routePath,
      badge,
      features: features ? JSON.parse(features) : []
    };

    if (req.file) {
      updatedData.image = `uploads/services/${req.file.filename}`;
    }

    const updatedService = await OurService.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Service updated successfully', service: updatedService });
  } catch (error) {
    console.error('❌ Error updating service:', error);
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
});

// ✅ Delete service
router.delete('/:id', async (req, res) => {
  try {
    const deletedService = await OurService.findByIdAndDelete(req.params.id);

    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting service:', error);
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
});

export default router;
