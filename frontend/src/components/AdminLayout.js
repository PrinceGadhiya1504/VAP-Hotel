import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './Admin/Header';
import AdminFooter from './Admin/Footer';
import AdminHome from './Admin/Home'

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <main>
        <Outlet />
      </main>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
