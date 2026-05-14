require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");

const { HoldingsModel } = require('./model/HoldingsModel');
const { PositionsModel } = require('./model/PositionsSchema');
const { OrdersModel } = require("./model/OrdersModel");
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URI;

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((s) => s.trim())
    : true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

// Public Routes
app.use("/api/auth", authRoutes);

// Protected Data Routes
app.get("/allHoldings", authMiddleware, async (req, res) => {
  try {
    let allHoldings = await HoldingsModel.find({ userId: req.user.id });
    res.json(allHoldings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching holdings" });
  }
});

app.get("/allPositions", authMiddleware, async (req, res) => {
  try {
    let allPositions = await PositionsModel.find({ userId: req.user.id });
    res.json(allPositions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching positions" });
  }
});

app.post("/newOrder", authMiddleware, async (req, res) => {
  try {
    let newOrder = new OrdersModel({
      userId: req.user.id,
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order saved!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving order" });
  }
});

// Connect to MongoDB and start server
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`App started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
