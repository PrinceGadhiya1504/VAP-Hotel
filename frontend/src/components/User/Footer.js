import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul>
            <li><a href="/" className="text-gray-400 hover:text-gray-200">Home</a></li>
            <li><a href="/rooms" className="text-gray-400 hover:text-gray-200">Rooms</a></li>
            <li><a href="/about" className="text-gray-400 hover:text-gray-200">About</a></li>
            <li><a href="/contact" className="text-gray-400 hover:text-gray-200">Contact</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <ul>
            <li className="text-gray-400">123 Hotel St, City, Country</li>
            <li className="text-gray-400">Email: info@myhotel.com</li>
            <li className="text-gray-400">Phone: +123 456 7890</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-gray-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.5a9.84 9.84 0 0 1-2.82.775A4.92 4.92 0 0 0 23.337 2a9.808 9.808 0 0 1-3.125 1.195 4.918 4.918 0 0 0-8.384 4.483A13.96 13.96 0 0 1 1.671 3.15a4.916 4.916 0 0 0 1.523 6.56A4.897 4.897 0 0 1 .96 8.68v.061a4.917 4.917 0 0 0 3.941 4.819 4.897 4.897 0 0 1-2.22.084 4.918 4.918 0 0 0 4.593 3.417A9.86 9.86 0 0 1 0 21.54 13.945 13.945 0 0 0 7.548 24c9.057 0 14.01-7.513 14.01-14.01 0-.213-.005-.425-.014-.637A10.024 10.024 0 0 0 24 4.5z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 0v24H0V0h24zM9.509 19.794V9.335H6.978v10.459h2.531zm-1.265-12.47c.873 0 1.577-.711 1.577-1.587 0-.873-.704-1.576-1.577-1.576-.874 0-1.576.703-1.576 1.576 0 .876.702 1.587 1.576 1.587zm12.005 12.47h-2.532V14.8c0-1.191-.024-2.72-1.657-2.72-1.657 0-1.91 1.293-1.91 2.634v5.08h-2.532V9.335h2.43v1.429h.036c.339-.642 1.167-1.31 2.4-1.31 2.567 0 3.044 1.691 3.044 3.886v6.454z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.388 2H7.612C4.123 2 2 4.123 2 7.612v8.776C2 19.877 4.123 22 7.612 22h8.776C19.877 22 22 19.877 22 16.388V7.612C22 4.123 19.877 2 16.388 2zm3.68 14.388c0 2.043-1.638 3.68-3.68 3.68H7.612a3.682 3.682 0 0 1-3.68-3.68V7.612c0-2.043 1.638-3.68 3.68-3.68h8.776a3.682 3.682 0 0 1 3.68 3.68v8.776z"/>
                <path d="M15.75 9.249h-2.004c-.622 0-.75.295-.75.726v1.313h2.25v1.812H13v4.625h-1.813V12.5h-1.252v-1.812h1.252V9.249c0-1.29.563-2.229 2.251-2.229h2.004v1.811z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4">
        <p className="text-center text-gray-400">© 2024 MyHotel. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
