import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AvailableRoom = () => {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [formData, setFormData] = useState({
    checkInDate: '',
    checkOutDate: ''
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/availableRoom', { formData })
      .then(response => {
        setAvailableRooms(response.data);
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Booking Form Section */}
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6 mx-auto my-10">
        <h2 className="text-2xl font-semibold mb-4">Book Your Room</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700 mb-1">Check-In Date</label>
            <input
              type="date"
              id="checkInDate"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700 mb-1">Check-Out Date</label>
            <input
              type="date"
              id="checkOutDate"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              min={formData.checkInDate}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Show Available Rooms
          </button>
        </form>
      </div>

      {/* Available Rooms Table Section */}
      {availableRooms.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Available Rooms</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Room Number</th>
                  <th className="py-3 px-6 text-left">Type</th>
                  <th className="py-3 px-6 text-left">Price</th>
                  <th className="py-3 px-6 text-left">Description</th>
                  <th className="py-3 px-6 text-left">Facility</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {availableRooms.map((room, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{room.roomNumber}</td>
                    <td className="py-3 px-6 text-left">{room.type}</td>
                    <td className="py-3 px-6 text-left">{room.price}</td>
                    <td className="py-3 px-6 text-left">{room.description}</td>
                    <td className="py-3 px-6 text-left">{room.facility}</td>
                    <td className="py-3 px-6 text-center">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => navigate(`/booking/${room._id}`, { state: { checkInDate: formData.checkInDate, checkOutDate: formData.checkOutDate } })}
                      >
                        Book Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AvailableRoom;
