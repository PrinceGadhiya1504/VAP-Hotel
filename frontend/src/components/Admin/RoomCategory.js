import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const RoomCategory = () => {

  const [category, setCategory] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/roomCategory')
      .then(response => {
        console.log(response.data);
        setCategory(response.data)
      })
  }, [])

  const deleteCategory = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this Category?');
    if (!confirmed) {
      return;
    }
    try {
      const response = await axios.delete(`http://localhost:3001/roomCategory/${id}`);
      if (response.status === 200) {
        setCategory(category.filter(cat => cat._id !== id));
      } else {
        console.error('Failed to delete the room');
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
            <Link to="/admin/addCategory"><button>Add Category</button></Link>
          </div>

          <div className="browse">
            <input type="search" placeholder="Search" className="record-search" />
            <select name="" id="">
              <option value="">Status</option>
            </select>
          </div>

        </div>

        <table width="100%">
          <thead>
            <tr>
              <th style={{ width: '5%' }}>#</th>
              <th style={{ width: '5%' }}>Images</th>
              <th style={{ width: '5%' }}> Name </th>
              <th style={{ width: '5%' }}> Price </th>
              <th style={{ width: '5%' }}> Max Person </th>
              <th style={{ width: '5%' }}> facilities </th>
              <th style={{ width: '5%' }}> Description </th>
              <th style={{ width: '5%' }}> Action </th>
            </tr>
          </thead>
          <tbody>
            {
              category.map((cat, index) => (
                <tr key={index}>
                  <td style={{ width: '5%' }}>{index + 1}</td>
                  <td style={{ width: '5%' }}> <img src={`./uploads/${cat.image}`} style={{ width: '200px', height: 'auto' }} />{cat.image}</td>
                  <td style={{ width: '5%' }}>{cat.name}</td>
                  <td style={{ width: '5%' }}>{cat.price}</td>
                  <td style={{ width: '5%' }}>{cat.maxPerson}</td>
                  <td style={{ width: '5%' }}>{cat.facilities}</td>
                  <td style={{ width: '5%' }}>{cat.description}</td>
                  <td style={{ width: '5%' }}>
                    <Link to={`/admin/editcategory/${cat._id}`}><button className='editButton'>Edit</button></Link>
                    <button onClick={() => deleteCategory(cat._id)} className='deleteButton'>Delete</button>
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

export default RoomCategory