import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";

const ResetPasswordForm = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const navigate = useNavigate();

  // Handle new password change
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    validatePasswordMatch(e.target.value, confirmPassword);
  };

  // Handle confirm password change
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validatePasswordMatch(newPassword, e.target.value);
  };

  // Validate if passwords match
  const validatePasswordMatch = (password, confirmPassword) => {
    setPasswordMatchError(password !== confirmPassword && confirmPassword !== "");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final check before submitting
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Send the request to the backend
      await axios.post(`http://127.0.0.1:8000/users/reset-new-password`, {
        new_password: newPassword,
        token: token,
      });

      setMessage("Password reset successful! You can now log in.");
      setError("");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setMessage("Error resetting password. Please try again.");
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

      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          type="password"
          label="New Password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          type="password"
          label="Confirm New Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
          margin="normal"
          error={passwordMatchError}
          helperText={passwordMatchError ? "Passwords do not match" : ""}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, backgroundColor: "#1976d2" }}
          disabled={passwordMatchError}
        >
          Reset Password
        </Button>
      </form>
    </Box>
  );
};

export default ResetPasswordForm;
