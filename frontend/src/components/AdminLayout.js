import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './Admin/Header';
import AdminFooter from './Admin/Footer';

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      {/* <Outlet /> */}
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
