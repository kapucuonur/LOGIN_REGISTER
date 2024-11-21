const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/userDB");
app.listen(3001, () => {
  console.log("Server started on port 3001");
})