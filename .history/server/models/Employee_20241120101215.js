const mongoose = require("mongoose");

// Define the schema for employees
const EmployeeSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String
     // Automatically add createdAt and updatedAt fields
)},
// Create the model
const EmployeeModel = mongoose.model("Employee", EmployeeSchema);

module.exports = EmployeeModel;
