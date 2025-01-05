import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const clientId = "1040890287209-6ei904rpmlpsp7m3gs42eietl4e3pn3h.apps.googleusercontent.com";
  const onSuccess = async (credentialResponse) => {
    try {
      // Send the Google credential token to your FastAPI backend
      const response = await axios.post("http://127.0.0.1:8000/users/google-login", {
        token: credentialResponse.credential,
      });

      // Save the access token and navigate to the dashboard
      localStorage.setItem("token", response.data.access_token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in with Google:", error.response?.data);
    }
  };

  const onError = () => {
    console.error("Google Login Failed");
  };










  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/users/register", {
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
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <input
            type="text"
            name="phone"
            placeholder="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
        </div>
        <GoogleOAuthProvider clientId={clientId}>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>Login with Google</h2>
        <GoogleLogin onSuccess={onSuccess} onError={onError} />
      </div>
    </GoogleOAuthProvider>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
