import React, { useEffect, useState } from 'react'
import imgSrc from './assert/img/1.jpeg'; // Adjust the path based on your file structure
import axios from 'axios'
import { Link } from 'react-router-dom';

const Rooms = () => {

  const [rooms, setRooms] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/rooms')
      .then(response => {
        // console.log(response.data);
        setRooms(response.data)
      })
  }, [])

  const deleteRoom = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this room?');
    if (!confirmed) {
      return;
    }
    try {
      const response = await axios.delete(`http://localhost:3001/room/${id}`);
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
              <th>#</th>
              <th> Room Number </th>
              <th> Status </th>
              <th> Type </th>
              <th> Price </th>
              <th> Facility </th>
              <th> Description </th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody>
            {
              rooms.map((room, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{room.roomNumber}</td>
                  <td>{room.status}</td>
                  <td>{room.type}</td>
                  <td>{room.price}</td>
                  <td>{room.facility}</td>
                  <td>{room.description}</td>
                  <td>
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