import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateRoom = () => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomCategoryId: '',
    status: 'available'
  });

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const URL = process.env.REACT_APP_URL

  useEffect(() => {
    axios.get(`${URL}room/${id}`)
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
        const response = await axios.get(`${URL}roomCategory`);
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
    setError("")
    try {
      const response = await axios.put(`${URL}room/${id}`, formData);
      if (response.status === 200) {
        // console.log(response.data);
        setSuccess("Room Update Successfully")
        setTimeout(() => {
          navigate('/admin/rooms');
          // window.location.href = '/admin/rooms'
        }, 1000)
      } else {
        // console.log("Error");
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
        <h2>Update Room</h2>
        <form onSubmit={handleSubmit}>
        {error && <div className='mt-3 alert alert-danger'>{error}</div>}
          {success && <div className='mt-3 alert alert-success'>{success}</div>}
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
                disabled

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
