const crypto = require('crypto');
const User = require('../models/User');  // Kullanıcı modelinizi import edin

// Salt üretme fonksiyonu
const generateSalt = () => crypto.randomBytes(16).toString('hex');

// Şifreyi hash'leme fonksiyonu
const hashPasswordWithSalt = (password) => {
  const salt = generateSalt();
  const hash = crypto.createHmac('sha256', salt);
  hash.update(password);
  return { salt, hash: hash.digest('hex') };
};

// Kullanıcı kaydederken şifreyi hash'le ve veritabanına kaydet
const registerUser = (req, res) => {
  const { email, password } = req.body;
  
  const { salt, hash } = hashPasswordWithSalt(password);

  // Kullanıcıyı veritabanına kaydet
  const newUser = new User({
    email,
    salt,
    passwordHash: hash,
  });

  newUser.save()
    .then(user => res.status(201).json({ message: "User registered", user }))
    .catch(err => res.status(500).json({ message: "Error registering user", error: err }));
};

// Şifre doğrulama fonksiyonu
const verifyPassword = (inputPassword, storedSalt, storedHash) => {
  const hash = crypto.createHmac('sha256', storedSalt);
  hash.update(inputPassword);
  const inputHash = hash.digest('hex');
  return inputHash === storedHash;
};

// Kullanıcı giriş işlemi
const loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (user && verifyPassword(password, user.salt, user.passwordHash)) {
        // JWT token oluşturma işlemi yapılabilir burada
        res.json({ message: "Login successful" });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    })
    .catch(err => res.status(500).json({ message: "Server error", error: err }));
};

module.exports = {
  registerUser,
  loginUser,
};
