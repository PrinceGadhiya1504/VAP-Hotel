import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    navigate('/');
    alert("Logout Successfully...");
  };

  return (
    <header>
      <div className="header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-2 logo_section">
              <div className="logo">
                <Link to="/"><img src="images/vap_logo.png" alt="Logo" className="logo-img" /></Link>
              </div>
            </div>
            <div className="col-10">
              <nav className="navbar navbar-expand-md navbar-light">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/about">About</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/rooms">Room</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/availableRoom">Booking</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/gallery">Gallery</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/blog">Blog</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/contact">Contact Us</Link>
                    </li>
                    {!isAuthenticated ? (
                      <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                      </li>
                    ) : (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" onClick={logOut} style={{ cursor: 'pointer' }}>Logout</Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
