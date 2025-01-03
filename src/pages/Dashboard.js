import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login"); // Redirect if no token
        }
// const response = await axios.get("http://127.0.0.1:8000/users/aa");
        const response = await axios.get("http://127.0.0.1:8000/users/me",
             {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      

        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user details.");
        console.error(err);
        // navigate("/login"); // Redirect on failure
      }
    };

    fetchUserDetails();
  }, [navigate]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {user.first_name} {user.last_name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Admin Status:</strong> {user.is_admin ? "Admin" : "User"}</p>
    </div>
  );
};

export default Dashboard;
