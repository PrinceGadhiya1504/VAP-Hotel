
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const RoomPage = () => {

  const userId = localStorage.getItem('userId')
  const [rooms, setRooms] = useState([])
  // Filter the rooms to only include those that are available
  const availableRooms = rooms.filter(room => room.status === 'available');

  useEffect(() => {
    axios.get('http://localhost:3001/rooms')
        .then(response => {
          console.log(response.data);
          setRooms(response.data)
        })  
}, [])

  return (
    <div>
      <div>
      <h1>Home Page</h1>
      <p>User ID: {userId}</p>
      <p>Token is stored in cookies</p>
    </div>
        
      {/* Category
      ---------------
      King Room
      Suite Room
      Family Room
      Deluxe Room
      Luxury Room
      Superior Room */}

      {/* Roome Page */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Hotel Room Listings</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {
            availableRooms.length > 0 ?
            (
              availableRooms.map((room, index) => (
                  <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white" key={index}>
                <img className="w-full" src="https://via.placeholder.com/400" alt="Card Image" />
                <div className="px-6 py-4">
                  <div className="font-bold  mb-2">Room Number : {room.roomNumber}</div>
                  <div className="mb-2">Type : {room.type}</div>
                  <div className="mb-2">Price : {room.price}</div>
                  <p className="text-gray-700 text-base">
                    {room.description}
                  </p>
                  <div className="mb-2">Facility : {room.facility}</div>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <Link to={`/booking/${room._id}`} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Book Now</Link>
                </div>
              </div>
              ))
            ): (
              <h2 className="text-3xl font-semibold text-gray-800 mb-8">No rooms available</h2>
            )}
        </div>
        </div>
        </div >    
      )
}

export default RoomPage