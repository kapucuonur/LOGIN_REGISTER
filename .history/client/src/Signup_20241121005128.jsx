import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(""); // State for password error
    const navigate = useNavigate();

    // Password validation function
    const validatePassword = (password) => {
        const minLength = 8;
        const hasUppercase = /[A-Z]/;
        const hasNumber = /\d/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if (password.length < minLength) {
            return "Password must be at least 8 characters long";
        }
        if (!hasUppercase.test(password)) {
            return "Password must contain at least one uppercase letter";
        }
        if (!hasNumber.test(password)) {
            return "Password must contain at least one number";
        }
        if (!hasSpecialChar.test(password)) {
            return "Password must contain at least one special character";
        }
        return ""; // No error
    };

    // Form validation before submitting
    const validateForm = () => {
        if (!name || !email || !password || !confirmPassword) {
            toast.error("All fields are required!");
            return false;
        }

        // Simple email validation
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            toast.error("Please enter a valid email address.");
            return false;
        }

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return false;
        }

        // Validate password criteria
        const passwordValidationError = validatePassword(password);
        if (passwordValidationError) {
            setPasswordError(passwordValidationError); // Set password error message
            return false;
        } else {
            setPasswordError(""); // Clear password error if valid
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            axios
                .post("http://localhost:3001/register", { name, email, password })
                .then((response) => {
                    toast.success("Registration Successful!");
                    navigate("/login");
                })
                .catch((err) => {
                    toast.error("Something went wrong. Try again!");
                    console.error(err);
                });
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary 100vh">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="name"
                            className="form-control rounded-0"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        {passwordError && (
                            <div className="text-danger mt-2">
                                <small>{passwordError}</small>
                            </div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirmPassword">
                            <strong>Confirm Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            className="form-control rounded-0"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Register
                    </button>
                </form>

                <p>Already Have an Account?</p>
                <Link to="/login" className="btn btn-success w-100 rounded-0">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
