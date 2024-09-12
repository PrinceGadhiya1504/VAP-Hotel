import React, { useEffect, useState } from 'react'
// import imgSrc from './assert/img/1.jpeg'; // Adjust the path based on your file structure
import axios from 'axios'
import { Link } from 'react-router-dom';

const Rooms = () => {

  const [rooms, setRooms] = useState([])
  const URL = process.env.REACT_APP_URL


  useEffect(() => {
    axios.get(`${URL}rooms`)
      .then(response => {
        console.log(response.data);
        setRooms(response.data)
      })
  }, [])

  const deleteRoom = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this room?');
    if (!confirmed) {
      return;
    }
    try {
      const response = await axios.delete(`${URL}room/${id}`);
      if (response.status === 200) {
        setRooms(rooms.filter(room => room._id !== id));
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
            <Link to="/admin/addRoom"><button>Add record</button></Link>
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
              <th style={{ width: '5%' }}> Room Number </th>
              <th style={{ width: '5%' }}> Status </th>
              <th style={{ width: '5%' }}> Type </th>
              {/* <th style={{ width: '5%' }}> Price </th>
              <th style={{ width: '5%' }}> Facility </th>
              <th style={{ width: '5%' }}> Description </th> */}
              <th style={{ width: '5%' }}> Action </th>
            </tr>
          </thead>
          <tbody>
            {
              rooms.map((room, index) => (
                <tr key={index}>
                  <td style={{ width: '5%' }}>{index + 1}</td>
                  <td style={{ width: '5%' }}>{room.roomNumber}</td>
                  <td style={{ width: '5%' }}>{room.status}</td>
                  <td style={{ width: '5%' }}>{room.roomCategoryId.name}</td>
                  {/* <td style={{ width: '5%' }}>{room.roomCategoryId.price}</td>
                  <td style={{ width: '5%' }}>{room.roomCategoryId.facilities}</td>
                  <td style={{ width: '5%' }}>{room.roomCategoryId.description}</td> */}
                  <td style={{ width: '5%' }}>
                    <Link to={`/admin/editRoom/${room._id}`}><button className='editButton'>Edit</button></Link>
                    <button onClick={() => deleteRoom(room._id)} className='deleteButton'>Delete</button>
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

export default Rooms