import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
// import { AuthContext } from '../../../context/AuthContext';

// Utility function to format dates
const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

const BookingDetails = () => {
  // const { user } = useContext(AuthContext);
  const userId = localStorage.getItem('userId');

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:3001/bookings`);
          // Filter bookings by user ID
          const userBookings = response.data.filter(booking => booking.userId._id === userId);
          setBookings(userBookings);
          // console.log(userBookings);
        } catch (error) {
          console.error('Failed to fetch bookings', error);
        }
      }
    };

    fetchBookings();
  }, [userId]);

  return (
    <div className="container mt-4">
      <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
      {bookings.length > 0 && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Room No</th>
              <th>Room Type</th>
              <th>Check-in Date</th>
              <th>Check-out Date</th>
              <th>Status</th>
              <th>Total Price</th>
              <th>Special Requests</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{booking.roomId.roomNumber}</td>
                <td>{booking.roomId.roomCategoryId.name}</td>
                <td>{formatDate(booking.checkInDate)}</td>
                <td>{formatDate(booking.checkOutDate)}</td>
                <td>{booking.status}</td>
                <td>₹ {booking.totalPrice.toFixed(2)}</td>
                <td>{booking.specialRequests}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingDetails;
