const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const { getJwtSecret } = require("../config/jwt");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({
      email: String(email).trim().toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id.toString() }, getJwtSecret(), {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    if (String(password).length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const emailNorm = String(email).trim().toLowerCase();

    const existing = await User.findOne({ email: emailNorm });
    if (existing) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }

    const hashed = await bcrypt.hash(String(password), 10);

    await User.create({
      name: String(name).trim(),
      email: emailNorm,
      password: hashed,
    });

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
