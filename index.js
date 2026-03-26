const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  type: String,
  personality: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", userSchema);

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// POST endpoint - Save to MongoDB
app.post("/users", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    
    const { name, age, type, personality } = req.body;
    
    const newUser = new User({
      name,
      age,
      type: type || "Not specified",
      personality: personality || []
    });
    
    const savedUser = await newUser.save();
    
    console.log("✅ Saved to MongoDB:", savedUser);
    res.status(201).json(savedUser);
    
  } catch (error) {
    console.error("Error saving:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET endpoint - Get all cats from MongoDB
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected!");
    
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`Test: http://localhost:${PORT}/test`);
      console.log(`Users: http://localhost:${PORT}/users`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err.message);
    console.log("Server still running but without database...");
    
    // Server still starts even if MongoDB fails
    app.listen(PORT, () => {
      console.log(`⚠️ Server running on port ${PORT} (without MongoDB)`);
    });
  });