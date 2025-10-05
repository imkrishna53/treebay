import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { verifyToken } from "../middleware/auth.js";
import { log } from "console";
const router = express.Router();

// REGISTER (optional) - protect with ADMIN_REGISTER_KEY in env
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, key } = req.body;

    if (process.env.ADMIN_REGISTER_KEY) {
      if (!key || key !== process.env.ADMIN_REGISTER_KEY) {
        return res.status(403).json({ message: "Invalid registration key" });
      }
    }

    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: "Admin exists" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const admin = new Admin({ name, email, password: hashed });
    await admin.save();

    return res.status(201).json({ message: "Admin created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const payload = { id: admin._id, email: admin.email, name: admin.name };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "8h" });

    res.json({ token, admin: payload });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET current admin
// ✅ get current logged-in user
router.get("/me", verifyToken, async (req, res) => {
  try {
    // req.user should be set by verifyToken
    const user = await Admin.findById(req.user.id).select("-password");
    console.log(user);
    
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error in /me route:", err);
    res.status(500).json({ message: "Server error" });
  }
});
export default router;
