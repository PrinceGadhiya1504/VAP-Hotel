import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure you import Bootstrap CSS if not already imported

const UserNavbar = () => {
  return (
    <div>
      <header>
        <div className="header">
          <div className="container">
            <div className="row align-items-center">
              {/* <div className="col-12 col-md-3 logo_section">
                <div className="logo">
                  <Link to="/"><img src="images/vap_logo.png" alt="Logo" className="logo-img" /></Link>
                </div>
              </div> */}
              <div className="col-12">
                <nav className="navbar navbar-expand-md ">
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#userNavbar" aria-controls="userNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="userNavbar">
                    <ul className="navbar-nav ms-auto">
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
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Rendering the selected component */}
      <div className="container mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default UserNavbar;
