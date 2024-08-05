import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AvailableRoom = () => {
  const [availableRooms, setAvailableRooms] = useState([]);
  
  const userId = localStorage.getItem('userId');
  
  const [formData, setFormData] = useState({
    checkInDate: '',
    checkOutDate: ''
  });

  // const navigate = useNavigate();

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

  const loginRequire = () => {
    if(!userId){
      alert("Login Required")
      window.location.href = '/login';
    }
  }

  return (
    <div className="booking_ocline">
      <div className="container my-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div className="book_room">
              <h1 className="card-title">Book a Room</h1>
              <form className="book_now" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="checkInDate" className="form-label">Check-In Date</label>
                  <input
                    type="date"
                    id="checkInDate"
                    name="checkInDate"
                    value={formData.checkInDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="form-control online_book"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="checkOutDate" className="form-label">Check-Out Date</label>
                  <input
                    type="date"
                    id="checkOutDate"
                    name="checkOutDate"
                    value={formData.checkOutDate}
                    onChange={handleChange}
                    min={formData.checkInDate}
                    className="form-control online_book"
                  />
                </div>
                <button type="submit" className="book_btn w-100">Show Available Rooms</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className='m-4'>
        {availableRooms.length > 0 && (
          <div className="mt-5">
            <h3 className="mb-4">Available Rooms</h3>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Room Number</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Max Person</th>
                    <th>Description</th>
                    <th>Facility</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {availableRooms.map((room, index) => (
                    <tr key={index}>
                      <td>{room.roomNumber}</td>
                      <td>{room.roomCategoryId.name}</td>
                      <td>{room.roomCategoryId.price}</td>
                      <td>{room.roomCategoryId.maxPerson}</td>
                      <td>{room.roomCategoryId.description}</td>
                      <td>{room.roomCategoryId.facilities}</td>
                      <td className="text-center">
                        <Link 
                          to={`/booking/${room._id}?checkInDate=${formData.checkInDate}&checkOutDate=${formData.checkOutDate}`}>
                          <button className='btn btn-primary' onClick={loginRequire}>Book Now</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableRoom;
