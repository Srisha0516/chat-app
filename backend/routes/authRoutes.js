import express from "express";
import User from "../models/User.js";

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email, password });
    await user.save();

    res.json({
      success: true,
      name: user.name,
    });
  } catch (err) {
    res.json({ success: false });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.json({ success: false });
    }

    res.json({
      success: true,
      name: user.name,
    });
  } catch (err) {
    res.json({ success: false });
  }
});

export default router;