const mongoose = require("mongoose");

// Define the schema for employees
const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true, // Ensure email is unique
        match: [/.+@.+\..+/, "Please enter a valid email address"], // Email validation
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Create the model
const EmployeeModel = mongoose.model("Employee", EmployeeSchema);

module.exports = EmployeeModel;
