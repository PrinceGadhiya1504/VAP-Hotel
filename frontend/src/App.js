import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/Register'
import Login from './components/Login';
import UserLayout from './components/UserLayout';
import AdminLayout from './components/AdminLayout';

//Home
import Home from './components/User/Home';
import RoomPage from './components/User/RoomPage';
import Booking from './components/User/Booking';
import AvailableRoom from './components/User/AvailableRoom';

//Admin 
import AdminHome from './components/Admin/Home';
import AdminRooms from './components/Admin/Rooms';
import AdminAddRoom from './components/Admin/AddRoom';
import AdminUpdateRoom from './components/Admin/UpdateRoom';
import AdminBookings from './components/Admin/Bookings';
import AdminUsers from './components/Admin/Users';
import AdminPayments from './components/Admin/Payments';
import AdminGallery from './components/Admin/Gallery';

// Import other page components as needed

function App() {
  return (
    <Router>
      <Routes>
        {/* User Side Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/rooms" element={<RoomPage />} />
          <Route path="/availableRoom" element={<AvailableRoom />} />
          <Route path="/booking/:id" element={<Booking />} />
        </Route>

        {/* Admin Side Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="/admin/rooms" element={<AdminRooms />} />
          <Route path="/admin/addRoom" element={<AdminAddRoom />} />
          <Route path="/admin/editRoom/:id" element={<AdminUpdateRoom />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
        </Route>

        {/* Common Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </Router>

    // <div>
    //   <Header />
    //   <main>
    //     <BrowserRouter>
    //       <Routes>
    //         <Route path="/" element={<HomePage/>} />
    //         <Route path="/login" element={<Login/>} />
    //         <Route path="/register" element={<Register/>} />
    //         <Route path="/rooms" element={<RoomPage/>} />
    //         <Route path="/booking/:id" element={<Booking/>} />
    //         {/* <Route path="/about" element={<AboutPage/>} /> */}
    //         {/* <Route path="/contact" element={<ContactPage/>} /> */}
    //         {/* <Route path="/login" element={<LoginPage/>} /> */}
    //         {/* <Route path="/register" element={<RegisterPage/>} />  */}
    //       </Routes>
    //     </BrowserRouter>
    //   </main>
    //   <Footer />
    // </div>

  );
}

export default App;
