import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Users = () => {

  const [user, setUser] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(response => {
        console.log(response.data);
        setUser(response.data)
      })
  }, [])

  const deleteUser = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this User?');
    if (!confirmed) {
      return;
    }
    try {
      const response = await axios.delete(`http://localhost:3001/user/${id}`);
      if (response.status === 200) {
        setUser(user.filter(user => user._id !== id));
      } else {
        console.error('Failed to delete the User');
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
            <Link to="/register"><button>Add User</button></Link>
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
              <th style={{ width: '5%' }}>Image</th>
              <th style={{ width: '5%' }}> Name </th>
              <th style={{ width: '5%' }}> Phone </th>
              <th style={{ width: '5%' }}> Address </th>
              <th style={{ width: '5%' }}> City </th>
              <th style={{ width: '5%' }}> State </th>
              <th style={{ width: '5%' }}> Country </th>
              <th style={{ width: '5%' }}> dateOfBirth </th>
              <th style={{ width: '5%' }}> Email </th>
              {/* <th style={{ width: '5%' }}> Password </th> */}
              <th style={{ width: '5%' }}> Role </th>
              <th style={{ width: '5%' }}> Action </th>
            </tr>
          </thead>
          <tbody>
            {
              user.map((user, index) => (
                <tr key={index}>
                  <td style={{ width: '5%' }}>{index + 1}</td>
                  <td style={{ width: '5%' }}> <img src={`http://localhost:3001/uploads/${user.image}`} alt={user.image} style={{ width: '100px', height: '100px' }} /></td>
                  <td style={{ width: '5%' }}>{user.name}</td>
                  <td style={{ width: '5%' }}>{user.phone}</td>
                  <td style={{ width: '5%' }}>{user.address}</td>
                  <td style={{ width: '5%' }}>{user.city}</td>
                  <td style={{ width: '5%' }}>{user.state}</td>
                  <td style={{ width: '5%' }}>{user.country}</td>
                  <td style={{ width: '5%' }}>{user.dateOfBirth}</td>
                  <td style={{ width: '5%' }}>{user.email}</td>
                  {/* <td style={{ width: '5%' }}>{user.password}</td> */}
                  <td style={{ width: '5%' }}>{user.role}</td>
                  <td style={{ width: '5%' }}>
                    <Link to={`/admin/edituser/${user._id}`}><button className='editButton'>Edit</button></Link>
                    <button onClick={() => deleteUser(user._id)} className='deleteButton'>Delete</button>
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

export default Users