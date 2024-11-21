import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  return(
    <div className="d-flex justify-content-center align-items-center bg-secondary 100vh">
        <div className="bg-white p-3 rounded w-25">
            <h2>Register</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="email">
                    <strong>Name</strong>
                    </label>
                    <input 
                    type="text" 
                    placeholder="Enter Name" 
                    autoComplete="off" 
                    name="email" 
                    className="form-control rounded-0"
                    onChange={(e) => setName(e.target.value)}
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
                                    />
                                    </div>
                                    <button type="submit" className="btn btn-success w-100 rounded-0">
                                        Register
                                        </button>
                                        </form>
                                        <p>Already Have an Account</p>
                                        <Link to="/login" className="btn btn-success w-100 rounded-0">
                                        Login
                                        </Link>



           
    </div>
    </div>
  );
}

export default Signup;