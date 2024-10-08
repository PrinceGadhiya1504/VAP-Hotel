import React, { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const userId = localStorage.getItem('userId');
  const URL = process.env.REACT_APP_URL

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      const response = await axios.post(`${URL}reset-password`, {
        userId,  // Pass userId here
        currentPassword,
        newPassword,
      });

      setSuccess("Password reset successful!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data || "Error resetting password");
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ width: '400px' }}>
        <h2 className="card-title text-center mb-4">Reset Password</h2>
        
        {error && <div className='alert alert-danger'>{error}</div>}
        {success && <div className='alert alert-success'>{success}</div>}
        
        <form onSubmit={handleResetPassword}>
          <div className="mb-3">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
