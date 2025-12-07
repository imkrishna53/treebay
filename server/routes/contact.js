
import express from "express";
import Contact from "../models/Contact.js";
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, company, serviceInterest, message } = req.body;
console.log(req.body);

    const newContact = new Contact({
      fullName: name,
      email,
      company,
      serviceInterest,  
      message,
    });

    await newContact.save();

   
    res.status(201).json({
      message: 'Your message has been received. We will get back to you shortly.',
    });
  } catch (error) {
    console.error('Error saving contact data:', error);
    res.status(500).json({ error: 'Failed to submit contact form', details: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().populate('serviceInterest', 'title description').exec();

    if (contacts.length === 0) {
      return res.status(404).json({ message: 'No contacts found' });
    }

    res.status(200).json(contacts);

  } catch (error) {
    console.error('Error fetching contacts:', error);

    res.status(500).json({ error: 'An error occurred while fetching contacts.' });
  }
});



export default router;
