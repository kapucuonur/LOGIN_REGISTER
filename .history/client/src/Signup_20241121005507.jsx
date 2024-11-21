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

    const pageStyle = {
        height: "100vh",
        background: "linear-gradient(45deg, #ff9a9e, #fad0c4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    };

    const formContainerStyle = {
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "10px",
        width: "100%",
        maxWidth: "400px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        fontSize: "16px"
    };

    const buttonStyle = {
        display: "block",
        width: "100%",
        padding: "12px",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        backgroundColor: "#ff9a9e",
        color: "white"
    };

    const buttonHoverStyle = {
        ...buttonStyle,
        backgroundColor: "#f8b3c0"
    };

    const errorMessageStyle = {
        color: "#e74c3c",
        fontSize: "14px",
        marginTop: "5px",
        fontStyle: "italic"
    };

    const linkStyle = {
        display: "block",
        width: "100%",
        padding: "12px",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        backgroundColor: "#fad0c4",
        color: "white",
        marginTop: "10px"
    };

    const linkHoverStyle = {
        backgroundColor: "#f5b9a0"
    };

    return (
        <div style={pageStyle}>
            <div style={formContainerStyle}>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "20px" }}>
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            style={inputStyle}
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            style={inputStyle}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            style={inputStyle}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        {passwordError && (
                            <div style={errorMessageStyle}>{passwordError}</div>
                        )}
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <label htmlFor="confirmPassword"><strong>Confirm Password</strong></label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            style={inputStyle}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                        />
                    </div>

                    <button
                        type="submit"
                        style={buttonStyle}
                        onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                        onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                    >
                        Register
                    </button>
                </form>

                <p>Already Have an Account?</p>
                <Link
                    to="/login"
                    style={linkStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = linkHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = linkStyle.backgroundColor}
                >
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
