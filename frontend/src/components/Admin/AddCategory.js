import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    maxPerson: '',
    facilities: '',
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
    console.log(formData);

    const formDataToSend = new FormData();

    formDataToSend.append('name', formData.name);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('maxPerson', formData.maxPerson);
    formDataToSend.append('facilities', formData.facilities);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('image', formData.image);


       //  // Use a loop to append each field from the formData state
    //  for (const key in formData) {
    //   if (formData.hasOwnProperty(key)) {
    //     formDataToSend.append(key, formData[key]);
    //   }
    // }

    try {
      const response = await axios.post('http://localhost:3001/roomCategory', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        setSuccess("Category added successfully");
        setTimeout(() => {
          navigate('/admin/category')
          // window.location.href = '/admin/category';
        }, 500);
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg);
      } else {
        setError("Server error...");
      }
    }
  };

  return (
    <div className="Admincontainer">
      <div className="card">
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className='mt-3 alert alert-danger'>{error}</div>}
          {success && <div className='mt-3 alert alert-success'>{success}</div>}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="off"
              autoFocus
            />
          </div>
          <div className="form-row">
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
              <label htmlFor="maxPerson">maxPerson</label>
              <input
                type="number"
                id="maxPerson"
                name="maxPerson"
                className="form-control"
                value={formData.maxPerson}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="facilities">Facilities</label>
            <input
              type="text"
              className="form-control"
              id="facilities"
              name="facilities"
              value={formData.facilities}
              onChange={handleChange}
              autoComplete="off"
            />
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
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={handleChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Selected"
                style={{ width: '100px', height: '100px', marginLeft: '10px' }}
              />
            )}
          </div>
          <button type="submit" className="submit-btn">Add Category</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
