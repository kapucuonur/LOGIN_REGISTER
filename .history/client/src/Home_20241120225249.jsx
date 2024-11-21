import React from "react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            // Token yoksa giriş sayfasına yönlendir
            navigate("/login");
        }
    }, [navigate]);

    return <h1>Welcome to the Home Page</h1>;
}

export default Home;