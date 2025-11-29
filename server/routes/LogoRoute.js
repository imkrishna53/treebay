// routes/logoRoute.js
import express from "express";
import Logo from "../models/logoModel.js"; 

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const logo = await Logo.findOne();
    res.json(logo || {});
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch logo" });
  }
});

router.put("/", async (req, res) => {
  try {
    const { logoUrl } = req.body;
    let logo = await Logo.findOne();

    if (!logo) {
      logo = await Logo.create({ logoUrl });
    } else {
      logo.logoUrl = logoUrl;
      await logo.save();
    }

    res.json({ success: true, logo });
  } catch (error) {
    res.status(500).json({ error: "Failed to update logo" });
  }
});

export default router;
