import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const Booking = () => {
  const userId = localStorage.getItem('userId');
  const { id } = useParams();
  const location = useLocation();
  const [room, setRoom] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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
        calculateTotalPrice(
          new Date(formData.checkInDate),
          new Date(formData.checkOutDate),
          res.data.roomCategoryId.price
        );
      })
      .catch(error => {
        console.error('Error fetching room:', error);
        setError('Unable to fetch room details. Please try again later.');
      });
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
  };

  const makePayment = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Step 1: Create the booking
      const bookingResponse = await fetch("http://localhost:3001/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!bookingResponse.ok) {
        throw new Error("Failed to create booking");
      }

      const { bookingId } = await bookingResponse.json();

      // Step 2: Create a checkout session
      const stripe = await loadStripe("pk_test_51PkNRDP769pZvV3qcj4JeG7ixz8pLDBwln4uYlPjcDrH0l1gpJhZYi0oAFyZQi32nrvfV4x9SEsELwAB36O7BzTp00Kp4LTRl1");

      const sessionResponse = await fetch("http://localhost:3001/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          booking: { ...formData, _id: bookingId }
        }),
      });

      if (!sessionResponse.ok) {
        throw new Error("Failed to create checkout session");
      }

      const session = await sessionResponse.json();
      
      // Redirect to checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
        setError(result.error.message);
      } else {
        setSuccess("Redirecting to payment gateway...");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Admincontainer">
      <div className="card m-5">
        <h2 className="card-header">Booking Room</h2>
        <form className="card-body">
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

          <button type="button" className="btn btn-primary" onClick={makePayment} disabled={loading}>
            {loading ? "Processing..." : "Book Room"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
