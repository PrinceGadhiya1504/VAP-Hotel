import React from 'react';
import { Outlet } from 'react-router-dom';
import UserHeader from './User/Header';
import UserFooter from './User/Footer';
// import AdminHome from './User/Home'

const UserLayout = () => {
  return (
    <div>
      <UserHeader />
        <Outlet />
      <UserFooter />
    </div>
  );
};

export default UserLayout;
