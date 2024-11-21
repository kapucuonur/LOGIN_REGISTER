const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

// Load environment variables
const PORT = process.env.PORT || 3001; // Use PORT from .env, fallback to 3001
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/employee"; // Use MONGO_URI from .env

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Employee Model
const EmployeeModel = require("./models/Employee");

// Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  EmployeeModel.findOne({ email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json({
            status: "success",
            message: "Login Successful",
          });
        } else {
          res.status(400).json({
            status: "error",
            message: "Incorrect password",
          });
        }
      } else {
        res.status(404).json({
          status: "error",
          message: "User does not exist",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: "Server error",
        error: err.message,
      });
    });
});

// Register Route
app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then((employee) => res.json(employee))
    .catch((err) =>
      res.status(400).json({
        status: "error",
        message: "Failed to register",
        error: err.message,
      })
    );
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
