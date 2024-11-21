import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Make the POST request
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                console.log(result.data); // Log the response from server
                
                // Check the response status and message
                if (result.data.status === "success") {
                    navigate("/home"); // Redirect to Home page if successful
                } else {
                    alert(result.data.message); // Display message from server
                }
            })
            .catch(err => {
                console.error(err);
                alert("An error occurred. Please try again.");
            });
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary 100vh">
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
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
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Login
                    </button>
                </form>
                <p>Don't have an account?</p>
                <Link to="/register" className="btn btn-success w-100 rounded-0">
                    Signup
                </Link>
            </div>
        </div>
    );
}

export default Login;
