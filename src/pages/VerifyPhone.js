import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";


const VerifyPhone = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { phone, email } = location.state;

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");

    try {
        await axiosInstance.post(`/users/verify-phone?phone=${phone}&code=${verificationCode}`);
        setSuccess("Phone number verified successfully!");
      setError("");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid verification code.");
      setSuccess("");
    }
  };

  return (
    <div>
      <h2>Verify Your Phone Number</h2>
      <p>We sent a verification code to: <strong>{phone}</strong></p>
      <p>Email: <strong>{email}</strong></p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {code.map((num, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={num}
            onChange={(e) => handleChange(e.target.value, index)}
            style={{ width: "40px", height: "40px", textAlign: "center", fontSize: "20px" }}
          />
        ))}
        <button type="submit" style={{ marginLeft: "10px" }}>Verify</button>
      </form>
    </div>
  );
};

export default VerifyPhone;
