import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Bookings = () => {

  const [bookings, setBookings] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/bookings')
      .then(response => {
        // console.log(response.data);
        setBookings(response.data)
      })
  }, [])

  console.log(bookings);

  const deleteBooking = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this Booking?');
    if (!confirmed) {
      return;
    }
    try {
      const response = await axios.delete(`http://localhost:3001/booking/${id}`);
      if (response.status === 200) {
        setBookings(bookings.filter(booking => booking._id !== id));
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
            <Link to="/availableRoom  "><button>Add record</button></Link>
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
              <th style={{ width: '10%' }}> User Name </th>
              <th style={{ width: '5%' }}> Room Number </th>
              <th style={{ width: '10%' }}> Check In Date </th>
              <th style={{ width: '10%' }}> Check Out Date </th>
              <th style={{ width: '10%' }}> Status </th>
              <th style={{ width: '10%' }}> Total Price </th>
              <th style={{ width: '5%' }}> No. Of Guests </th>
              <th style={{ width: '15%' }}> Special Requirement </th>
              <th style={{ width: '10%' }}> Action </th>
            </tr>
          </thead>
          <tbody>
            {
              bookings.map((booking, index) => (
                <tr key={index}>
                  <td style={{ width: '5%' }}>{index + 1}</td>
                  <td style={{ width: '10%' }}>{booking.userId.name}</td>
                  <td style={{ width: '5%' }}>{booking.roomId.roomNumber}</td>
                  <td style={{ width: '10%' }}>{booking.checkInDate}</td>
                  <td style={{ width: '10%' }}>{booking.checkOutDate}</td>
                  <td style={{ width: '10%' }}>{booking.status}</td>
                  <td style={{ width: '10%' }}>{booking.totalPrice}</td>
                  <td style={{ width: '5%' }}>{booking.numberOfGuests}</td>
                  <td style={{ width: '15%' }}>{booking.specialRequests}</td>
                  <td style={{ width: '10%' }}>
                    <Link to={`/admin/editBooking/${booking._id}`}><button className='editButton'>Edit</button></Link>
                    <button onClick={() => deleteBooking(booking._id)} className='deleteButton'>Delete</button>
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

export default Bookings