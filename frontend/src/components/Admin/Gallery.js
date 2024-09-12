import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Gallery = () => {

  const [image, setImage] = useState([])
  const URL = process.env.REACT_APP_URL


  useEffect(() => {
    axios.get(`${URL}gallery`)
      .then(response => {
        console.log(response.data);
        setImage(response.data)
      })
  }, [])


  const deleteImage = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this Image?');
    if (!confirmed) {
      return;
    }
    try {
      const response = await axios.delete(`${URL}gallery/${id}`);
      if (response.status === 200) {
        setImage(image.filter(img => img._id !== id));
      } else {
        console.error('Failed to delete the Gallery');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="records table-responsive">
<div className="record-header">
  <div className="add">
    {/* <span>Entries</span>
    <select name="" id="">
      <option value="">ID</option>
    </select> */}
    <Link to="/admin/addImage"><button>Add Image</button></Link>
  </div>

  {/* <div className="browse">
    <input type="search" placeholder="Search" className="record-search" />
    <select name="" id="">
      <option value="">Status</option>
    </select>
  </div> */}

</div>

<table width="100%">
  <thead>
    <tr>
      <th style={{ width: '5%' }}>#</th>
      <th style={{ width: '10%' }}> Image </th>
      <th style={{ width: '5%' }}> Category </th>
      <th style={{ width: '5%' }}> Action </th>
    </tr>
  </thead>
  <tbody>
    {
      image.map((img, index) => (
        <tr key={index}>
          <td style={{ width: '5%' }}>{index + 1}</td>
          <td style={{ width: '10%' }}> <img src={`${URL}uploads/${img.imageName}`} alt={img.name} style={{ width: '100px', height: '100px' }} /></td>
          <td style={{ width: '5%' }}>{img.category}</td>
          <td style={{ width: '5%' }}>
            <Link to={`/editGallery/${img._id}`}><button className='editButton'>Edit</button></Link>
            <button onClick={() => deleteImage(img._id)} className='deleteButton'>Delete</button>
          </td>
        </tr>
      ))
    }
  </tbody>
</table>

</div>
    </div>
  )
}

export default Gallery