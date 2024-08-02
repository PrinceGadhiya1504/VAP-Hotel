import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
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
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/registration', form);

      if (response.status === 201) {
        const data = response.data;
        console.log(data);
        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } else {
        console.error('Error:', error);
        setError('Something went wrong. Please try again.');
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
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="form-control"
                value={form.name}
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
                value={form.phone}
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
                value={form.address}
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
                value={form.city}
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
                value={form.state}
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
                value={form.country}
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
                value={form.dateOfBirth}
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
                value={form.email}
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
                value={form.password}
                onChange={handleChange}
              />
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
