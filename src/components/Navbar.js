import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };


  

  

  return (
    <nav style={{ padding: "10px", backgroundColor: "#1976d2", color: "white", textAlign: "center" }}>
      {user ? (
        <>
          <span>Welcome, {user.first_name} {user.last_name}!</span>
          <button
            onClick={handleLogout}
            style={{
              marginLeft: "20px",
              padding: "5px 10px",
              backgroundColor: "white",
              color: "#1976d2",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <div>
        <button
            onClick={handleLogin}
            style={{
              marginLeft: "20px",
              padding: "5px 10px",
              backgroundColor: "white",
              color: "#1976d2",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            LogIn
          </button>


          <button
            onClick={handleRegister}
            style={{
              marginLeft: "20px",
              padding: "5px 10px",
              backgroundColor: "white",
              color: "#1976d2",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Register
          </button>


          </div>



      )}




    </nav>
  );
};

export default Navbar;
