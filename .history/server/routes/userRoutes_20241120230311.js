const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");

const router = express.Router();

// Korunan bir rota
router.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: `Welcome, user ${req.user.userId}` });
});

module.exports = router;
