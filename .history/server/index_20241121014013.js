const express = require('express');
const path = require('path');
const app = express();

// React build dosyasını sunma
app.use(express.static(path.join(__dirname, 'client/build')));

// API rotaları buraya gelecek
// Örnek: app.get('/api/data', (req, res) => { res.json({ message: 'hello' }); });

// Tüm diğer istekleri React'ın index.html dosyasına yönlendirme
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
