import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Avatar, Alert } from "@mui/material";
import axiosInstance from "../api/axios";

const UserSettings = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    status: "",
    profileImage: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setUserData({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          status: data.status || "",
          profileImage: data.profile_image || "",
        });
      } catch (err) {
        setError("Failed to load user data.");
      }
    };
    fetchUserData();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();
      formData.append("firstName", userData.firstName);
      formData.append("lastName", userData.lastName);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      formData.append("address", userData.address);
      formData.append("status", userData.status);
      if (selectedImage) {
        formData.append("profileImage", selectedImage);
      }

      await axiosInstance.put("/users/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "600px",
        margin: "auto",
        mt: 5,
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderRadius: "10px",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h4" gutterBottom>
        User Settings
      </Typography>

      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <Avatar
          src={userData.profileImage || ""}
          alt="Profile Image"
          sx={{ width: 80, height: 80, margin: "auto", mb: 2 }}
        />
        <Button variant="outlined" component="label">
          Upload Profile Image
          <input type="file" hidden onChange={handleImageChange} />
        </Button>

        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
          margin="normal"
          disabled
        />
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={userData.address}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Status"
          name="status"
          value={userData.status}
          onChange={handleChange}
          margin="normal"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, backgroundColor: "#1976d2" }}
        >
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default UserSettings;
