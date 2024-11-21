const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const EmployeeModel = require("./models/Employee");

mongoose.connect("mongodb://localhost:27017/userDB");


app.post('/register', (req, res) => {
   EmployeeModel.create(req.body)
   .then(employees => res.json(employees))
   .catch(err => res.json(err))
  
})
app.listen(3001, () => {
  console.log("Server started on port 3001");
})