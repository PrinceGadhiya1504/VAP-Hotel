import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../../../context/AuthContext.js'
import axios from 'axios';

const UserDetails = () => {
  // const { user } = useContext(AuthContext);
  const userId = localStorage.getItem('userId');
  const [userData, setUserData] = useState(null);
  const URL = process.env.REACT_APP_URL

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const response = await axios.get(`${URL}user/${userId}`);
          setUserData(response.data);
        } catch (error) {
          console.error('Failed to fetch user details', error);
        }
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="d-flex container align-items-center justify-content-center mt-4">
      <div className="card" style={{ maxWidth: '500px' }}>
        <div className="card-body text-center">
          <img
            src={`${URL}uploads/${userData.image}`}
            alt={userData.image}
            className="rounded-circle img-fluid mb-3"
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
          <h2 className="mb-4">User Details</h2>
          <ul className="list-group">
            <li className="list-group-item"><strong>Name:</strong> {userData.name}</li>
            <li className="list-group-item"><strong>Phone:</strong> {userData.phone}</li>
            <li className="list-group-item"><strong>Address:</strong> {userData.address}</li>
            <li className="list-group-item"><strong>City:</strong> {userData.city}</li>
            <li className="list-group-item"><strong>State:</strong> {userData.state}</li>
            <li className="list-group-item"><strong>Country:</strong> {userData.country}</li>
            <li className="list-group-item"><strong>Date of Birth:</strong> {userData.dateOfBirth}</li>
            <li className="list-group-item"><strong>Email:</strong> {userData.email}</li>
            <li className="list-group-item"><strong>Role:</strong> {userData.role}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
