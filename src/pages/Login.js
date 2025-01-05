import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Box, Button, TextField, Typography, Alert, Divider } from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/users/login", {
        username: formData.email,
        password: formData.password,
      }, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      localStorage.setItem("token", response.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

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

  const onError = () => {
    setError("Google Login Failed.");
  };
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Box
        sx={{
          maxWidth: "400px",
          margin: "auto",
          mt: 5,
          padding: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

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
            Login
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          <a
            href="/reset-password"
            style={{ color: "#1976d2", textDecoration: "none" }}
          >
            Forgot Password?
          </a>
        </Typography>

        <Divider sx={{ my: 2 }}>Or</Divider>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <GoogleLogin
            onSuccess={onSuccess}
            onError={onError}
            theme="filled_blue"
            shape="pill"
            text="continue_with"
            style={{
              marginTop: "20px",
              width: "240px",
              height: "40px",
            }}
          />
        </Box>

        <Typography variant="body2" sx={{ mt: 3, color: "gray" }}>
          Don't have an account?{" "}
          <a href="/register" style={{ color: "#1976d2", textDecoration: "none" }}>
            Register here
          </a>
        </Typography>
      </Box>
    </GoogleOAuthProvider>
  );
};

export default Login;
