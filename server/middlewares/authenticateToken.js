const jwt = require('jsonwebtoken');

// Token doğrulama middleware
function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1]; // Token'ı header'dan alıyoruz (Bearer <token>)
  
  if (!token) return res.status(401).json({ message: "Access denied, no token provided." });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
