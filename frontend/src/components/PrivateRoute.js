import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  
  const userRole = localStorage.getItem('userRole');
  const isLoggedIn = !!localStorage.getItem('token');

  if (!isLoggedIn) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    // If the user role doesn't match, redirect to a forbidden or home page
    return <Navigate to="/" />;
  }

  // If everything is okay, render the children components (e.g., AdminLayout)
  return children;
};

export default PrivateRoute;
