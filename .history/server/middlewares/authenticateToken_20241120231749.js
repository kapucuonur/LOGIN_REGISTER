const jwt = require('jsonwebtoken');

// Token doğrulama middleware'ı
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if (!token) return res.status(403).json({ message: 'Token is required' });

  jwt.verify(token, 'secretkey', (err, user) => {
    if (err) return res.status(403).json({ message: 'Token is invalid' });
    
    req.user = user; // Kullanıcıyı istek objesine ekliyoruz
    next();
  });
};

// Örnek korunan route
app.get('/protected-route', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});


module.exports = authenticateToken;
