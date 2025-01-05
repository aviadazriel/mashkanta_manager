import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/users/reset-password", { email });
      setMessage("If this email is registered, a password reset link will be sent.");
    } catch (err) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
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
        Reset Password
      </Typography>
      {message && <Alert severity="info" sx={{ mb: 2 }}>{message}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, backgroundColor: "#1976d2" }}
        >
          Send Reset Link
        </Button>
      </form>
    </Box>
  );
};

export default ResetPassword;
