const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authenticateToken");  // Middleware
const { registerUser, loginUser } = require('../controllers/userController'); // Controller dosyasını import et

// Protected route with token authentication
router.get('/protected-route', authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route" });
});
// Kullanıcı kaydederken şifreyi hash'leyerek kaydet
router.post('/register', registerUser);

// Kullanıcı giriş işlemi (şifre doğrulaması)
router.post('/login', loginUser);
module.exports = router;
