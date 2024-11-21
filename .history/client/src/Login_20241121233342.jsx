import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("All fields are required!");
            return;
        }

        axios.post(`${process.env.REACT_APP_API_URL}/login`, { email, password })

            .then((response) => {
                toast.success("Login Successful!");
                navigate("/dashboard");  // Redirect to a protected page after login
            })
            .catch((err) => {
                toast.error("Invalid credentials, please try again!");
                console.error(err);
            });
    };

    const pageStyle = {
        height: "100vh",
        background: "linear-gradient(45deg, #6a11cb, #2575fc)",
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
        backgroundColor: "#6a11cb",
        color: "white"
    };

    const buttonHoverStyle = {
        ...buttonStyle,
        backgroundColor: "#2575fc"
    };

    const linkStyle = {
        display: "block",
        width: "100%",
        padding: "12px",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        backgroundColor: "#2575fc",
        color: "white",
        marginTop: "10px"
    };

    const linkHoverStyle = {
        backgroundColor: "#6a11cb"
    };

    return (
        <div style={pageStyle}>
            <div style={formContainerStyle}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
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
                    </div>

                    <button
                        type="submit"
                        style={buttonStyle}
                        onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                        onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                    >
                        Login
                    </button>
                </form>

                <p>Don't have an account?</p>
                <Link
                    to="/register"
                    style={linkStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = linkHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = linkStyle.backgroundColor}
                >
                    Register Now
                </Link>
            </div>
        </div>
    );
}

export default Login;
