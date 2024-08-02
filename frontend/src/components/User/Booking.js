import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const Booking = () => {
  const userId = localStorage.getItem('userId');
  const { id } = useParams();
  const location = useLocation();
  const [room, setRoom] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [formData, setFormData] = useState({
    userId: userId,
    roomId: id,
    checkInDate: new URLSearchParams(location.search).get('checkInDate') || '',
    checkOutDate: new URLSearchParams(location.search).get('checkOutDate') || '',
    status: 'pending',
    totalPrice: '',
    specialRequests: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/room/${id}`)
      .then(res => {
        setRoom(res.data);
        console.log(res.data);
        calculateTotalPrice(
          new Date(formData.checkInDate),
          new Date(formData.checkOutDate),
          res.data.roomCategoryId.price
        );
      })
      .catch(error => {
        console.error('Error fetching room:', error);
      });
  }, [id, formData.checkInDate, formData.checkOutDate]);

  const calculateTotalPrice = (checkIn, checkOut, pricePerNight) => {
    if (checkIn && checkOut) {
      const timeDifference = checkOut - checkIn;
      const numberOfDays = timeDifference / (1000 * 3600 * 24);
      const totalPrice = pricePerNight * numberOfDays;
      setFormData(prevData => ({
        ...prevData,
        totalPrice: totalPrice.toFixed(2),
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }), () => {
      if (name === 'checkInDate' || name === 'checkOutDate') {
        calculateTotalPrice(
          new Date(formData.checkInDate),
          new Date(formData.checkOutDate),
          room.price
        );
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post('http://localhost:3001/booking', formData);
      if (response.status === 201) {
        setSuccess("Booking Successfully");
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg);
      } else {
        setError("Server Error.....");
      }
    }
  };

  return (
    <div className="Admincontainer">
      <div className="card m-5">
        <h2 className="card-header">Booking Room</h2>
        <form onSubmit={handleSubmit} className="card-body">
          {error && <div className='alert alert-danger'>{error}</div>}
          {success && <div className='alert alert-success'>{success}</div>}
          
          <div className="form-group">
            <label htmlFor="roomNumber">Room Number</label>
            <input
              type="text"
              className="form-control"
              id="roomNumber"
              name="roomNumber"
              value={room.roomNumber || ''}
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="checkInDate">Check-In Date</label>
            <input
              type="date"
              className="form-control"
              id="checkInDate"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="checkOutDate">Check-Out Date</label>
            <input
              type="date"
              className="form-control"
              id="checkOutDate"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="specialRequests">Special Requests</label>
            <textarea
              className="form-control"
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="totalPrice">Total Price</label>
            <input
              type="text"
              className="form-control"
              id="totalPrice"
              name="totalPrice"
              value={`₹${formData.totalPrice}`}
              disabled
            />
          </div>

          <button type="submit" className="btn btn-primary">Book Room</button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
