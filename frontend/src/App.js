import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import RoomPage from './components/RoomPage';
import Login from './components/Login';
import Register from './components/Register';
import Booking from './components/Booking';
// Import other page components as needed

function App() {
  return (
      <div>
        <Header />
        <main>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/rooms" element={<RoomPage/>} />
              <Route path="/booking/:id" element={<Booking/>} />
              {/* <Route path="/about" element={<AboutPage/>} /> */}
              {/* <Route path="/contact" element={<ContactPage/>} /> */}
              {/* <Route path="/login" element={<LoginPage/>} /> */}
              {/* <Route path="/register" element={<RegisterPage/>} />  */}
            </Routes>
          </BrowserRouter>
        </main>
        <Footer />
      </div>
  );
}

export default App;
