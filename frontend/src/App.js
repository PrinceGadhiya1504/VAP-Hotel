import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Registration from './components/Register'
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import UserLayout from './components/UserLayout';
import AdminLayout from './components/AdminLayout';

//Home
import Home from './components/User/Home';
import RoomPage from './components/User/RoomPage';
import Booking from './components/User/Booking';
import AvailableRoom from './components/User/AvailableRoom';
import About from './components/User/About';
import Gallery from './components/User/Gallery';
import Blog from './components/User/Blog';
import Contact from './components/User/Contact';

//Admin 
import AdminHome from './components/Admin/Home';
import RoomCategory from './components/Admin/RoomCategory';
import AddCategory from './components/Admin/AddCategory';
import UpdateRoomCategory from './components/Admin/UpdateRoomCategory';
import AdminRooms from './components/Admin/Rooms';
import AdminAddRoom from './components/Admin/AddRoom';
import AdminUpdateRoom from './components/Admin/UpdateRoom';
import AdminBookings from './components/Admin/Bookings';
import AdminUpdateBooking from './components/Admin/UpdateBooking';
import AdminUsers from './components/Admin/Users';
import UpdateUser from './components/Admin/UpdateUser';
import AdminPayments from './components/Admin/Payments';
import AddGalleryImage from './components/Admin/AddGalleryImage';
import UpdateGalleryImage from './components/Admin/UpdateGalleryImage';
import AdminGallery from './components/Admin/Gallery';

// Import other page components as needed

function App() {
  return (
    <Router>
      <Routes>
        {/* User Side Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/rooms" element={<RoomPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/availableRoom" element={<AvailableRoom />} />
          <Route path="/booking/:id" element={<Booking />} />
        </Route>

        {/* Admin Side Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="/admin/category" element={<RoomCategory />} />
          <Route path="/admin/addCategory" element={<AddCategory />} />
          <Route path="/admin/editcategory/:id" element={<UpdateRoomCategory />} />
          <Route path="/admin/rooms" element={<AdminRooms />} />
          <Route path="/admin/addRoom" element={<AdminAddRoom />} />
          <Route path="/admin/editRoom/:id" element={<AdminUpdateRoom />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/editBooking/:id" element={<AdminUpdateBooking />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/editUser/:id" element={<UpdateUser />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/gallery" element={<AdminGallery/>} />
          <Route path="/admin/addImage" element={<AddGalleryImage/>} />
          <Route path="/admin/editGallery/:id" element={<UpdateGalleryImage/>} />
        </Route>

        {/* Common Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>

  );
}

export default App;
