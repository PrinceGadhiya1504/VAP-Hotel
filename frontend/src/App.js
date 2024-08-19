import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import Registration from './components/Register';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import UserLayout from './components/UserLayout';
import AdminLayout from './components/AdminLayout';

// User Side Routes
import Home from './components/User/Home';
import RoomPage from './components/User/RoomPage';
import Booking from './components/User/Booking';
import AvailableRoom from './components/User/AvailableRoom';
import About from './components/User/About';
import Gallery from './components/User/Gallery';
import Blog from './components/User/Blog';
import Contact from './components/User/Contact';
import UserNavbar from './components/User/Profile/UserNavbar';
import UserDetails from './components/User/Profile/UserDetails'
import BookingDetails from './components/User/Profile/BookingDetails'
import ResetPassword from './components/User/Profile/ResetPassword'
import PaymentSuccess from './components/User/PaymentSuccess'
import PaymentCancel from './components/User/PaymentCancel'


// Admin Side Routes
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

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* User Side Routes */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="rooms" element={<RoomPage />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="blog" element={<Blog />} />
            <Route path="contact" element={<Contact />} />
            <Route path="availableRoom" element={<AvailableRoom />} />
            <Route path="booking/:id" element={<Booking />} />
            <Route path="profile/*" element={<UserNavbar />}>
              <Route index element={<UserDetails />} />
              <Route path="booking" element={<BookingDetails />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Route>
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-cancel" element={<PaymentCancel />} />
          </Route>

          {/* Admin Side Routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute role="admin">
                <AdminLayout />
              </PrivateRoute>
            }
          >
            {/* Define additional admin routes as children */}
            <Route path="category" element={<RoomCategory />} />
            <Route path="addCategory" element={<AddCategory />} />
            <Route path="editcategory/:id" element={<UpdateRoomCategory />} />
            <Route path="rooms" element={<AdminRooms />} />
            <Route path="addRoom" element={<AdminAddRoom />} />
            <Route path="editRoom/:id" element={<AdminUpdateRoom />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="editBooking/:id" element={<AdminUpdateBooking />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="edituser/:id" element={<UpdateUser />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="addImage" element={<AddGalleryImage />} />
            <Route path="editGallery/:id" element={<UpdateGalleryImage />} />
            <Route path="gallery" element={<AdminGallery />} />
          </Route>

          {/* Common Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
