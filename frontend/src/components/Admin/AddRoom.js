import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const AddRoom = () => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    type: '',
    price: '',
    description: '',
    status: 'available',
    facility: ''
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post('http://localhost:3001/room',formData)
      if(response.status === 201){
        console.log(response.data);
        navigate('/admin/rooms')
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);      
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Add Room</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="roomNumber">Room Number</label>
              <input
                type="text"
                className="form-control"
                id="roomNumber"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                autoComplete='off'
                autoFocus
              />
            </div>
            <div className="form-group">
              <label htmlFor="type">Room Type</label>
              <select
                id="type"
                name="type"
                className="form-control"
                value={formData.type}
                onChange={handleChange}
              >
                  <option>Choose...</option>
                  <option value="single">Single</option>
                  <option value="double">Double</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="facility">Facility</label>
            <input
              type="text"
              className="form-control"
              id="facility"
              name="facility"
              value={formData.facility}
              onChange={handleChange}
              autoComplete='off'
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              className="form-control"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            />
          </div> */}
          <button type="submit" className="submit-btn">Add Room</button>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;
