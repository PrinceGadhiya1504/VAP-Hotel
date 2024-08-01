import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import {Link} from 'react-router-dom'

const RoomPage = () => {

  // const userId = localStorage.getItem('userId')
  const [rooms, setRooms] = useState([])
  // Filter the rooms to only include those that are available
  // const availableRooms = rooms.filter(room => room.status === 'available');

  useEffect(() => {
    axios.get('http://localhost:3001/roomCategory')
        .then(response => {
          console.log(response.data);
          setRooms(response.data)
        })  
}, [])

  return (
    <div>
      <div  className="our_room">
         <div className="container">
            <div className="row">
               <div className="col-md-12">
                  <div className="titlepage">
                     <h2>Our Room</h2>
                     <p>Lorem Ipsum available, but the majority have suffered </p>
                  </div>
               </div>
            </div>
            <div className="row">
            {
              rooms.map((room, index) => (
               <div className="col-md-4 col-sm-6">
                  <div id="serv_hover"  className="room">
                     <div className="room_img">
                        <figure><img src="images/room4.jpg" alt="#"/></figure>
                     </div>
                     <div className="bed_room">
                        <h3>{room.name}</h3>
                        <p>Price : {room.price} /Night</p>
                        <p>Max Person : {room.maxPerson} </p>
                        <p>Facilities: {room.facilities} </p>
                        <p>{room.description} </p>
                     </div>
                  </div>
               </div>
                ))
              }
            </div>
         </div>
      </div>
        {/* <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Hotel Room Listings</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {
              availableRooms.length > 0 ?
              (
                availableRooms.map((room, index) => (
                    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white" key={index}>
                  <img className="w-full" src="https://via.placeholder.com/400" alt="Card Image" />
                  <div className="px-6 py-4">
                    <div className="font-bold  mb-2">Room Number : {room.roomNumber}</div>
                    <div className="mb-2">Type : {room.roomCategoryId.name}</div>
                    <div className="mb-2">Price : {room.roomCategoryId.price}</div>
                    <div className="mb-2">Facility : {room.roomCategoryId.facilities}</div>
                    <p className="text-gray-700 text-base">
                      {room.roomCategoryId.description}
                    </p>
                  </div>
                </div>
                ))
              ): (
                <h2 className="text-3xl font-semibold text-gray-800 mb-8">No rooms available</h2>
              )}
          </div>
        </div> */}
    </div >    
  )
}

export default RoomPage 