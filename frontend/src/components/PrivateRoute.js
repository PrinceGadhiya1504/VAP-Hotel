import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ role }) => {
  const { user, loading } = useContext(AuthContext);

  // Debugging logs
  console.log('Current User:', user);
  console.log('Required Role:', role);
  console.log('Loading:', loading);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while user data is being retrieved
  }

  if (!user || (role && user.role !== role)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
