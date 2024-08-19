import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const Booking = () => {
  const { id } = useParams(); // Room ID
  const location = useLocation(); // Location to get passed state
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId'); // Get user ID from local storage

  const [room, setRoom] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    userId: userId,
    roomId: id,
    roomNumber: location.state?.roomNumber || '',
    checkInDate: location.state?.checkInDate || '',
    checkOutDate: location.state?.checkOutDate || '',
    totalPrice: 0,
    specialRequests: '',
  });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/room/${id}`);
        setRoom(response.data);
        if (response.data.roomCategoryId?.price) {
          calculateTotalPrice(
            new Date(formData.checkInDate),
            new Date(formData.checkOutDate),
            response.data.roomCategoryId.price
          );
        }
      } catch (error) {
        console.error('Error fetching room:', error);
        setError('Unable to fetch room details. Please try again later.');
      }
    };

    fetchRoom();
  }, [id, formData.checkInDate, formData.checkOutDate]);

  const calculateTotalPrice = (checkIn, checkOut, pricePerNight) => {
    if (checkIn && checkOut && !isNaN(checkIn) && !isNaN(checkOut)) {
      const timeDifference = checkOut - checkIn;
      const numberOfDays = timeDifference / (1000 * 3600 * 24);
      const totalPrice = pricePerNight * numberOfDays;
      setFormData(prevData => ({
        ...prevData,
        totalPrice: totalPrice.toFixed(2),
      }));
    } else {
      setError('Invalid check-in or check-out date.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'checkInDate' || name === 'checkOutDate') {
      const checkInDate = name === 'checkInDate' ? value : formData.checkInDate;
      const checkOutDate = name === 'checkOutDate' ? value : formData.checkOutDate;
      calculateTotalPrice(
        new Date(checkInDate),
        new Date(checkOutDate),
        room.roomCategoryId?.price
      );
    }
  };

  const makePayment = async () => {
    if (!userId) {
      alert("Login is required");
      navigate('/login');
      return;
    }
  
    setLoading(true);
    setError("");
    setSuccess("");
  
    try {
      // Check if the room is available
      const availabilityResponse = await axios.post("http://localhost:3001/reAvailableRoom", {
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        roomId: formData.roomId,
      });
  
      if (availabilityResponse.status === 200) {
        setSuccess(availabilityResponse.data.message);
  
        // Create booking first
        const bookingResponse = await axios.post("http://localhost:3001/booking", formData);
        const bookingId = bookingResponse.data.bookingId;
  
        const stripe = await loadStripe("pk_test_51PkNRDP769pZvV3qcj4JeG7ixz8pLDBwln4uYlPjcDrH0l1gpJhZYi0oAFyZQi32nrvfV4x9SEsELwAB36O7BzTp00Kp4LTRl1");
  
        const sessionResponse = await axios.post("http://localhost:3001/create-checkout-session", {
          bookingId: bookingId
        });
  
        const sessionId = sessionResponse.data.sessionId;
        const result = await stripe.redirectToCheckout({ sessionId });
  
        if (result.error) {
          console.error(result.error.message);
          setError(result.error.message);
        } else {
          setSuccess("Redirecting to payment gateway...");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError(error.response.data.message);
      } else {
        console.error("Error during payment:", error.response || error);
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  



  return (
    <div className="container">
      <div className="card m-5">
        <h2 className="card-header">Booking Room</h2>
        <form className="card-body">
          {error && <div className='alert alert-danger'>{error}</div>}
          {success && <div className='alert alert-success'>{success}</div>}

          <div className="form-group">
            <label>Room Number</label>
            <input
              type="text"
              name="roomNumber"
              value={formData.roomNumber}
              className="form-control"
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Check-In Date</label>
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Check-Out Date</label>
            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              min={formData.checkInDate}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Total Price</label>
            <input
              type="text"
              name="totalPrice"
              value={formData.totalPrice}
              className="form-control"
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Special Requests</label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={makePayment}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
