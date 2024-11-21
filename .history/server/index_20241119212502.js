const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/userDB");


app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    const User = mongoose.model('User', {
        name: String,
        email: String,
        password: String
    });
    const user = new User({name, email, password});
    user.save()
    .then(result => {
        res.send({message: "User registered successfully"});
    })
    .catch(err => {
        res.send(err);
    })
})
app.listen(3001, () => {
  console.log("Server started on port 3001");
})