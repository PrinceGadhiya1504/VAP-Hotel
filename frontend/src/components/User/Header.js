import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <a href="/">MyHotel</a>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
          <a href="/rooms" className="text-gray-600 hover:text-gray-900">Rooms</a>
          <a href="/availableRoom" className="text-gray-600 hover:text-gray-900">AvailableRoom</a>
          <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
          <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
        </nav>

        {/* Search Bar */}
        <div className="relative hidden md:block">
          <input
            type="text"
            className="pl-10 pr-4 py-2 border rounded-full w-64 focus:outline-none focus:border-gray-400"
            placeholder="Search..."
          />
          <svg
            className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M16.65 9.35A7.65 7.65 0 119.35 2a7.65 7.65 0 017.3 7.35z" />
          </svg>
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-4">
          <a href="/login" className="text-gray-600 hover:text-gray-900">Login</a>
          <a href="/register" className="text-gray-600 hover:text-gray-900">Register</a>
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
