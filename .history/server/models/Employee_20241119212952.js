const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
    
})

const Employee = mongoose.model("Employee", employeeSchema);