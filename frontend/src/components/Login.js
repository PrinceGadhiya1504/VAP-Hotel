import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      }, { withCredentials: true });

      if (response.status === 200) {
        const { user } = response.data;
        localStorage.setItem('userId', user._id);
        console.log(user._id);
        alert('Login successful!');
        console.log(user.role);
        if (user.role === 'guest') {
          navigate('/'); // Redirect to home page
        } else {
          navigate('/admin'); // Redirect to Admin page
        }
      } else {
        navigate('/admin'); // Redirect to admin page if login fails
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
    maxWidth: '500px',
    padding: '20px',
    backgroundColor: 'white', // Card background color
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  };

  return (
    <div style={containerStyle}>
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
