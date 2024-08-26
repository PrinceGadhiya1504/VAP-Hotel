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
                        <img src={`http://localhost:3001/uploads/${room.image}`} alt={index.image} style={{ width: '300px', height: '300px' }} />
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
       
    </div >    
  )
}

export default RoomPage 