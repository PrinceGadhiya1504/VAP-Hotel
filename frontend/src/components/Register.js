import axios from "axios";
import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    email: "",
    password: "",
    dateOfBirth: "",
    role: "guest",
    image: null
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:3001/registration', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        setSuccess("Registration Successful");
        setTimeout(() => {
          window.location.href = '/login';
        }, 500);
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("Server error...");
      }
    }
  };

  // Inline styles for gradient background and card styling
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to right, #4A90E2, #9013FE)', // Gradient background
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '800px',
    padding: '20px',
    backgroundColor: 'white', // Card background color
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  };

  return (
    <div style={containerStyle}>
      <div className="card" style={cardStyle}>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
        {error && <div className='mt-3 alert alert-danger'>{error}</div>}
        {success && <div className='mt-3 alert alert-success'>{success}</div>}
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="form-control"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                id="phone"
                name="phone"
                type="text"
                required
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                required
                className="form-control"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="city" className="form-label">City</label>
              <input
                id="city"
                name="city"
                type="text"
                required
                className="form-control"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="state" className="form-label">State</label>
              <input
                id="state"
                name="state"
                type="text"
                required
                className="form-control"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="country" className="form-label">Country</label>
              <input
                id="country"
                name="country"
                type="text"
                required
                className="form-control"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                required
                className="form-control"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={handleChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Selected"
                style={{ width: '100px', height: '100px', marginLeft: '10px' }}
              />
            )}
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login" className="link-primary">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
