import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import UserLayout from './components/UserLayout';
import AdminLayout from './components/AdminLayout';
import Home from './components/User/Home';
import RoomPage from './components/User/RoomPage';
import Booking from './components/User/Booking';
import AvailableRoom from './components/User/AvailableRoom';
import AdminHome from './components/Admin/Home';
import AddRoom from './components/Admin/AddRoom';
import Registration from './components/Register'
// Import other page components as needed

function App() {
  return (
    <Router>
      <Routes>
        {/* User Side Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/rooms" element={<RoomPage/>} />
          <Route path="/availableRoom" element={<AvailableRoom/>} />
          <Route path="/booking/:id" element={<Booking/>} />
        </Route>
        
        {/* Admin Side Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="/admin/add" element={<AddRoom />} />
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
