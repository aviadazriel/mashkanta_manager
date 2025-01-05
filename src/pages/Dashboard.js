import React, { useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axiosInstance.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // Save user details to localStorage
      } catch (error) {
        console.error("Error fetching user details:", error);
        navigate("/login");
      }
    };

    fetchUserDetails();
  }, [navigate, setUser]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard, {user.first_name}!</p>
    </div>
  );
};

export default Dashboard;
