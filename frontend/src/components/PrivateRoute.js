// src/components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ role }) => {
  const { user } = useContext(AuthContext);

  // Debugging logs
  console.log('Current User:', user);
  console.log('Required Role:', role);

  if (!user || (role && user.role !== role)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
