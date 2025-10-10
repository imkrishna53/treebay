import express from 'express';
import OurService from '../models/OurServices.js';

const router = express.Router();

console.log('OurService Routes Loaded');

// Create a new service
router.post('/', async (req, res) => {
  console.log('Request body:', req.body); 

  try {
    const { title, description, image, features, path, badge } = req.body;

    if (!title || !description || !image || !path || !badge) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const newService = new OurService({
      title,
      description,
      image,
      features: features || [],
      path,
      badge,
    });

    await newService.save();

    res.status(201).json({
      message: 'Service created successfully',
      service: newService,
    });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: 'Error creating service', error: error.message });
  }
});

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await OurService.find();

    if (!services || services.length === 0) {
      return res.status(404).json({ message: 'No services found' });
    }

    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
});

// Get a single service by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const service = await OurService.findById(id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ message: 'Error fetching service', error: error.message });
  }
});

// Update a service by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, features, path, badge } = req.body;

    const updatedService = await OurService.findByIdAndUpdate(
      id,
      {
        title,
        description,
        image,
        features: features || [],
        path,
        badge,
      },
      { new: true } 
    );

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({
      message: 'Service updated successfully',
      service: updatedService,
    });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
});

// Delete a service by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedService = await OurService.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
});

export default router;
