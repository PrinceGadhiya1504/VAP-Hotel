import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateBooking = () => {
  const [formData, setFormData] = useState({
    userId: '',
    roomId: '',
    checkInDate: '',
    checkOutDate: '',
    status: '',
    totalPrice: '',
    numberOfGuests: '',
    specialRequests: ''
  });
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/booking/${id}`)
      .then((res) => {
        const data = res.data;
        setFormData({
          userId: data.userId,
          roomId: data.roomId,
          checkInDate: formatDate(new Date(data.checkInDate)),
          checkOutDate: formatDate(new Date(data.checkOutDate)),
          status: data.status,
          totalPrice: data.totalPrice,
          numberOfGuests: data.numberOfGuests,
          specialRequests: data.specialRequests
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")  
    try {
      const response = await axios.put(`http://localhost:3001/booking/${id}`, formData);
      if (response.status === 200) {
        // console.log(response.data);
        // navigate('/admin/bookings');
        setSuccess("Booking Update Successfully")
        setTimeout(() => {
          window.location.href = '/admin/bookings'
        }, 2000)
      } else {
        // console.log("error");
        alert(response.statusText);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg)
      } else {
        setError("Server Error.....")
      }
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="Admincontainer">
      <div className="card">
        <h2>Update Booking</h2>
        <form onSubmit={handleSubmit}>
        {error && <div className='mt-3 alert alert-danger'>{error}</div>}
          {success && <div className='mt-3 alert alert-success'>{success}</div>}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="guestName">Guest Name</label>
              <input
                type="text"
                className="form-control"
                id="guestName"
                name="guestName"
                value={formData.userId.name}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="roomNumber">Room Number</label>
              <input
                type="text"
                id="roomNumber"
                name="roomNumber"
                className="form-control"
                value={formData.roomId.roomNumber}
                onChange={handleChange}
                disabled
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="checkInDate">Check In Date</label>
            <input
              type="date"
              className="form-control"
              id="checkInDate"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="checkOutDate">Check Out Date</label>
            <input
              type="date"
              className="form-control"
              id="checkOutDate"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              className="form-control"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalPrice">Total Price</label>
            <input
              type="text"
              className="form-control"
              id="totalPrice"
              name="totalPrice"
              value={formData.totalPrice}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="numberOfGuests">Number Of Guest</label>
            <input
              type="text"
              className="form-control"
              id="numberOfGuests"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="specialRequests">Special Requirement</label>
            <input
              type="text"
              className="form-control"
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <button type="submit" className="submit-btn">Update Booking</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBooking;
