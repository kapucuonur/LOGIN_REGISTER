function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        toast.info("Logged out successfully");
        navigate("/login");
    };

    return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
