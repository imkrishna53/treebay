import express from "express";
import Info from "../models/Info.js"; // ✅ create this model (shown below)

const router = express.Router();

// ✅ GET info (singleton)
router.get("/", async (req, res) => {
  try {
    const info = await Info.findOne();
    console.log("Fetched info:", info);
    res.json(info || {});
  } catch (error) {
    console.error("Error fetching info:", error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ PUT to update or create info
router.put("/", async (req, res) => {
  try {
    const {
      email,
      phone,
      address,
      social = {}
    } = req.body;

    let info = await Info.findOne();
    console.log("put---");
    console.log(info);
    if (info) {

      // Update existing fields
      if (email) info.email = email;
      if (phone) info.phone = phone;
      if (address) info.address = address;

      // Update nested social links
      if (social.facebook) info.social.facebook = social.facebook;
      if (social.instagram) info.social.instagram = social.instagram;
      if (social.twitter) info.social.twitter = social.twitter;
        console.log("put check---");
        console.log(info);
      
    //   const 
      
      updated = await info.save();
      console.log("Updated info:", updated);
      return res.json(updated);
    }

    // Create new record
    info = new Info({ email, phone, address, social });
    await info.save();
    console.log("Created new info:", info);
    res.json(info);

  } catch (error) {
    console.error("Error updating info:", error);
    res.status(400).json({ message: error.message });
  }
});

export default router;
