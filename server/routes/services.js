// routes/services.js
import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/auth.js";
import Service from "../models/Service.js";

// GET all services (with optional field selection)
router.get('/', async (req, res) => {
  try {
    const { fields } = req.query;
    
    let projection = {};
    if (fields) {
      const fieldList = fields.split(',');
      fieldList.forEach(field => {
        projection[field.trim()] = 1;
      });
    }
    
    const services = await Service.find({}, projection);
    console.log(services)
    res.json(services);
 
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET service by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error('Error fetching service by slug:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET service by ID
router.get('/:id', async (req, res) => {
    try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error('Error fetching service by ID:', error);
    res.status(500).json({ message: error.message });
  }
});


// routes/services.js - Alternative approach
router.post('/', async (req, res) => {
  try {
    const { title, ...rest } = req.body;
    
    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    
    // Create service with generated slug
    const serviceData = {
      ...rest,
      title,
      slug
    };
    
    console.log('Creating service with data:', serviceData);
    
    const service = new Service(serviceData);
    const savedService = await service.save();
    
    res.status(201).json(savedService);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(400).json({ message: error.message });
  }
});

// PUT update service
router.put('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE service
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;