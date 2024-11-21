const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authenticateToken");  // Middleware

// Protected route with token authentication
router.get('/protected-route', authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route" });
});

module.exports = router;
