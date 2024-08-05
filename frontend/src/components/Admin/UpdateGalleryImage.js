import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateGalleryImage = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  
  useEffect(() => {
    axios.get(`http://localhost:3001/gallery/${id}`)
      .then(response => {
        console.log(response.data);
        
        setCategory(response.data.category);
        setDescription(response.data.description);
        setImagePreview(`http://localhost:3001/uploads/${response.data.imageName}`);
      })
      .catch(error => {
        console.error('There was an error fetching the image details!', error);
      });
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append('image', image);
    }
    formData.append('category', category);
    formData.append('description', description);

    axios.put(`http://localhost:3001/gallery/${id}`, formData)
      .then(response => {
        alert('Image updated successfully');
        window.location.href = '/admin/gallery';
      })
      .catch(error => {
        console.error('There was an error updating the image!', error);
      });
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Update Gallery Image</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input type="file" className="form-control" id="image" onChange={handleImageChange} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Selected"
              style={{ width: '100px', height: '100px', marginLeft: '10px', marginTop: '10px' }}
            />
          )}
        </div>
        <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Choose...</option>
                <option value='gallery'>Gallery</option>
                <option value='slider'>Slider</option>
              </select>
            </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Update Image</button>
      </form>
    </div>
  );
};

export default UpdateGalleryImage;
