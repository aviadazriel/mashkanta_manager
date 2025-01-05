import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Divider,
  Card,
  CardContent,
} from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // Google Login Success Handler
  const onSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/users/google-login", {
        token: credentialResponse.credential,
      });

      localStorage.setItem("token", response.data.access_token);
      navigate("/dashboard");
    } catch (error) {
      setError("Error logging in with Google.");
    }
  };

  // Google Login Error Handler
  const onError = () => {
    setError("Google Login Failed.");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Use the client ID from environment variables
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/users/register", {
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
      });

      setSuccess("Registration successful! Verification code sent.");
      setError("");
      navigate("/verify-phone", { state: { phone: formData.phone, email: formData.email } });
    } catch (err) {
      setError("Error occurred during registration.");
      setSuccess("");
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f4f6f8",
          padding: "20px",
        }}
      >
        <Card
          sx={{
            maxWidth: "400px",
            width: "100%",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: "12px",
          }}
        >
          <CardContent>
            <Typography variant="h4" textAlign="center" gutterBottom>
              Register
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                margin="normal"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#1976d2" }}
              >
                Register
              </Button>
            </form>

            <Divider sx={{ my: 3 }}>Or</Divider>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <GoogleLogin
                onSuccess={onSuccess}
                onError={onError}
                theme="filled_blue"
                shape="pill"
                text="continue_with"
                style={{ marginTop: "20px",  width: "400px", textAlign: "center",  height: "40px",}}
              />
            </Box>

            <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
              Already have an account?{" "}
              <a href="/login" style={{ color: "#1976d2", textDecoration: "none" }}>
                Login here
              </a>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </GoogleOAuthProvider>
  );
};

export default Register;
