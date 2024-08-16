import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const UserNavbar = () => {
  return (
    <div>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#userNavbar" aria-controls="userNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="userNavbar">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profile">User Details</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile/booking">Booking Details</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile/reset-password">Reset Password</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Rendering the selected component */}
        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
