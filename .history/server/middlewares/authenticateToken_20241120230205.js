const jwt = require("jsonwebtoken");

// Middleware fonksiyonu
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Authorization header kontrolü
    if (!authHeader) {
        return res.status(401).json({ message: "Access Denied. No Token Provided." });
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>

    // Token doğrulama
    jwt.verify(token, process.env.JWT_SECRET || "secret_key", (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or Expired Token." });
        }

        // Doğrulanmış kullanıcıyı req.user'a ata
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
