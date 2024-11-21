import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './styles.css'; // Import your styles

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

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
        return "";
    };

    const validateForm = () => {
        if (!name || !email || !password || !confirmPassword) {
            toast.error("All fields are required!");
            return false;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            toast.error("Please enter a valid email address.");
            return false;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return false;
        }

        const passwordValidationError = validatePassword(password);
        if (passwordValidationError) {
            setPasswordError(passwordValidationError);
            return false;
        } else {
            setPasswordError("");
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
        <div className="signup-page">
            <div className="form-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            className="form-input"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            className="form-input"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="form-input"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        {passwordError && (
                            <div className="error-message">{passwordError}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="form-input"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                        />
                    </div>

                    <button type="submit" className="btn btn-register">Register</button>
                </form>

                <p>Already Have an Account?</p>
                <Link to="/login" className="btn btn-login">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
