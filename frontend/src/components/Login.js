// src/components/Login.js
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [role, setRole] = useState('guest'); // Add role state
  const [error, setError] = useState('');

  // Destructure login from the context
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // await login(email, password, role); // Pass role to login
      await login(email, password); // Pass role to login
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Login failed. Please try again.');
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
    maxWidth: '500px',
    padding: '20px',
    backgroundColor: 'white', // Card background color
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  };

  return (
    <div    style={containerStyle}>
      <div className="card" style={cardStyle}>
        <h2 className="text-center mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='off'
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='off'
            />
          </div>
          {/* <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              id="role"
              name="role"
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="guest">Guest</option>
              <option value="admin">Admin</option>
            </select>
          </div> */}
          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/register" className="link-primary">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
