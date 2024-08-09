import React from 'react'
import imgSrc from './assert/img/1.jpeg'; // Adjust the path based on your file structure
// import './assert/style.css'

import { Link, Outlet } from 'react-router-dom';

const Header = () => {

  return (
    <div>
      {/* <input type="checkbox" id="menu-toggle" /> */}
      <div className="sidebar">
        <div className="side-header">
          <h3>VAP-Hotel</h3>
        </div>

        <div className="side-content">
          <div className="profile">
            <div className="profile-img bg-img" style={{ backgroundImage: `url(${imgSrc})` }}></div>
            <h5>Prince Gadhiya</h5>
            {/* <small>Admin</small> */}
          </div>

          <div className="side-menu">
            <ul>
              {/* <li>
                       <Link to="" className="active">
                            <span className="las la-home"></span>
                            <small>Dashboard</small>
                        </Link>
                    </li> */}
              <li>
                <Link to="category">
                  <span className="las la-user-alt"></span>
                  <small>Category</small>
                </Link>
              </li>
              <li>
                <Link to="rooms">
                  <span className="las la-user-alt"></span>
                  <small>Rooms</small>
                </Link>
              </li>
              <li>
                <Link to="bookings">
                  <span className="las la-envelope"></span>
                  <small>Booking</small>
                </Link>
              </li>
              <li>
                <Link to="users">
                  <span className="las la-clipboard-list"></span>
                  <small>Users</small>
                </Link>
              </li>
              <li>
                <Link to="payments">
                  <span className="las la-shopping-cart"></span>
                  <small>Payments</small>
                </Link>
              </li>
              <li>
                <Link to="gallery">
                  <span className="las la-tasks"></span>
                  <small>Gallery</small>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="main-content">

        <div className='admin-header'>
          <div className="header-content">
            <label htmlFor="menu-toggle">
              <span className="las la-bars"></span>
            </label>

            <div className="header-menu">
              {/* <label htmlFor="">
                        <span className="las la-search"></span>
                    </label>
                    
                    <div className="notify-icon">
                        <span className="las la-envelope"></span>
                        <span className="notify">4</span>
                    </div>
                    
                    <div className="notify-icon">
                        <span className="las la-bell"></span>
                        <span className="notify">3</span>
                    </div> */}

              <div className="user">
                <div className="bg-img" style={{ backgroundImage: `url(${imgSrc})` }}></div>

                <span className="las la-power-off"></span>
                <Link to="/login"><span>Logout</span></Link>
              </div>
            </div>
          </div>
        </div>
        <main>
          <div className="page-content">
            <Outlet />
          </div>
        </main>
      </div>
    </div >
  )
}

export default Header