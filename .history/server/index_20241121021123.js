const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const app = express();
app.use(express.json());
app.use(cors());
const EmployeeModel = require("./models/Employee");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

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

app.listen(3001, () => {
    console.log("Server started on port 3001");
});
