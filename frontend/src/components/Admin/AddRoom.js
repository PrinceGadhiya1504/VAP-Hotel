import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const AddRoom = () => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomCategoryId: '',
    status: 'available'
  });

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // const navigate = useNa vigate();
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/roomCategory');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
console.log(categories);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")

    try {
      const response = await axios.post('http://localhost:3001/room', formData);
      if (response.status === 201) {
        // navigate('/admin/rooms');
        setSuccess("Room added Successfully")
        setTimeout(() => {
          window.location.href = '/admin/rooms'
        }, 2000)
      } else {
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

  return (
    <div className="Admincontainer">
      <div className="card">
        <h2>Add Room</h2>
        <form onSubmit={handleSubmit}>
        {error && <div className='mt-3 alert alert-danger'>{error}</div>}
          {success && (
            <div className='mt-3 alert alert-success'>{success}</div>
          )}
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
                autoComplete="off"
                autoFocus
              />
            </div>
            <div className="form-group">
              <label htmlFor="roomCategoryId">Room Type</label>
              <select
                id="roomCategoryId"
                name="roomCategoryId"
                className="form-control"
                value={formData.roomCategoryId}
                onChange={handleChange}
              >
                <option>Choose...</option>
                  {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="submit-btn">Add Room</button>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;
