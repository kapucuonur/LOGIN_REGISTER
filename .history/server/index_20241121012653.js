const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(cors());
const EmployeeModel = require("./models/Employee");

mongoose.connect("mongodb://localhost:27017/employee");

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    EmployeeModel.findOne({ email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json({
                        status: "success",
                        message: "Login Successful"
                    });
                } else {
                    res.json({
                        status: "error",
                        message: "Incorrect password"
                    });
                }
            } else {
                res.json({
                    status: "error",
                    message: "User does not exist"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: "error",
                message: "Server error",
                error: err.message
            });
        });
});

app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.json(err))
});
app.use("/api/users", userRoutes);
app.listen(3001, () => {
    console.log("Server started on port 3001");
});

const path = require('path');


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
