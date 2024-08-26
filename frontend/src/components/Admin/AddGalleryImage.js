import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddGalleryImage = () => {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    image: null
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formDataToSend = new FormData();
    formDataToSend.append('category', formData.category);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('image', formData.image);

    try {
      const response = await axios.post('http://localhost:3001/gallery', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        setSuccess("Image added successfully");
        setTimeout(() => {
          // window.location.href = '/admin/gallery';
          navigate('/admin/gallery')
        }, 500);
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Server error...");
      }
    }
  };

  return (
    <div className="Admincontainer">
      <div className="card">
        <h2>Add Gallery Image</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className='mt-3 alert alert-danger'>{error}</div>}
          {success && <div className='mt-3 alert alert-success'>{success}</div>}
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              className="form-control mb-2"
              id="image"
              name="image"
              onChange={handleChange}
              required
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Selected"
                style={{ width: '100px', height: '100px', marginLeft: '10px' }}
              />
            )}
          </div>
          {/* <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              autoComplete="off"
              autoFocus
              required
            />
          </div> */}
          <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                className="form-control"
                value={formData.category}
                onChange={handleChange}
              >
                <option>Choose...</option>
                <option value='gallery'>Gallery</option>
                <option value='slider'>Slider</option>
              </select>
            </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-btn">Add Image</button>
        </form>
      </div>
    </div>
  );
};

export default AddGalleryImage;
