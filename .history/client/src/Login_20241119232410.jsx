import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', {email, password})
        .then(result => {
        console.log(result)
        
        if(result.data === "Login Successful"){
            navigate("/home")
        }
        else{
            alert("Invalid Credentials")}
        })
        .catch(err => console.log(err))
        
    }
  return(
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
                                <label htmlFor="email">
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
                                        <p>Already Have an Account</p>
                                        <Link to="/login" className="btn btn-success w-100 rounded-0">
                                        Signup
                                        </Link>



           
    </div>
    </div>
  );
}


export default Login;