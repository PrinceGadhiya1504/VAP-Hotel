import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateRoom = () => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomCategoryId: '',
    status: 'available'
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/room/${id}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    // Fetch categories from the backend
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/room/${id}`, formData);
      if (response.status === 200) {
        console.log(response.data);
        navigate('/admin/rooms');
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Update Room</h2>
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
          <button type="submit" className="submit-btn">Update Room</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateRoom;
