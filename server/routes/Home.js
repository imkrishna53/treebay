import express from "express";
import Home from "../models/Home.js";

const router = express.Router();

// GET home page singleton
router.get("/", async (req, res) => {
  try {
    const home = await Home.findOne(); // singleton
    console.log("inserver",home);
    res.json(home || {});
  } catch (error) {
    console.error("Error fetching home:", error);
    res.status(500).json({ message: error.message });
  }
});

// PUT update home page description
// router.put("/", async (req, res) => {
//   try {
//     // console.log("hjhkhjhj");
//     // console.log(req.body.description);
//     const { description } = req.body.description;
//     const { yearsExperience } = req.body.yearsExperience;
//     const { projectsCompleted } = req.body.projectsCompleted;
//     const { qualityRating } = req.body.description;
//     // const { description } = req.body.description;

//     let home = await Home.findOne();
//     console.log("put");
//     console.log(home);
//     if (home) {
//       home.description = description;
//       home.yearsExperience = yearsExperience;
//       home.projectsCompleted = projectsCompleted;
//       home.qualityRating = qualityRating;
//       console.log("update")
//       console.log(home);
//       const sabed = await home.save();
//       console.log(sabed);
//     } else {
//       home = new Home({ description });
//       await home.save();
//     }

//     res.json(home);
//   } catch (error) {
//     console.error("Error updating home:", error);
//     res.status(400).json({ message: error.message });
//   }
// });
router.put("/", async (req, res) => {
  try {
    // Destructure directly from req.body
    const { description, yearsExperience, projectsCompleted, qualityRating } = req.body;

    let home = await Home.findOne();
    console.log("PUT request received:", home);

    if (home) {
      // Update existing fields only if they exist in the request
      if (description) home.description = description;
      if (yearsExperience) home.yearsExperience = yearsExperience;
      if (projectsCompleted) home.projectsCompleted = projectsCompleted;
      if (qualityRating) home.qualityRating = qualityRating;

      const saved = await home.save();
      console.log("Updated home:", saved);
      res.json(saved);
    } else {
      // Create new document
      home = new Home({ description, yearsExperience, projectsCompleted, qualityRating });
      await home.save();
      res.json(home);
    }
  } catch (error) {
    console.error("Error updating home:", error);
    res.status(400).json({ message: error.message });
  }
});


export default router;
