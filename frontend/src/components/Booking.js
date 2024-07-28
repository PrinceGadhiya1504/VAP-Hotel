import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Booking = () => {

  const userId = localStorage.getItem('userId')
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  // const [totalPrice, setTotalPrice] = useState(0)

  // State to store form values
  const [formData, setFormData] = useState({
    userId: userId,
    roomId: id,
    roomType: 'single',
    checkInDate: '',
    checkOutDate: '',
    specialRequests: '',
    numberOfGuests: '',
    status: 'pending',
  });




  useEffect(() => {
    if (id) {
      axios.get('http://localhost:3001/room/' + id)
        .then(res => {
          setRoom(res.data);
          console.log(res.data);
        })
        .catch(error => {
          console.error('Error fetching room:', error);
        });
    }
  }, [id]);


  // console.log(room?.price);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculate the number of days
    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);

    const timeDifference = checkOut - checkIn;
    const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days

    const numberOfDays = daysDifference
    const totalPrice = room.price*numberOfDays

    // setTotalPrice(totalPrice);
    // console.log(totalPrice);
      
    // Handle form submission logic here
    
    console.log('Form Data Submitted:', formData, totalPrice);
    
    axios.post('http://localhost:3001/booking', { formData, totalPrice })
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

  };

  return (
    <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6 mx-auto my-10">
      <h2 className="text-2xl font-semibold mb-4">Book Your Room</h2>
      <form onSubmit={handleSubmit}>
        {/* Room Type Selection */}
        <div className="mb-4">
          <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
          <input
            id="roomType"
            name="roomType"
            value={room?.type}
            // onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            disabled
          />
           <label htmlFor="roomPrice" className="block text-sm font-medium text-gray-700 mb-1">Room Price</label>
          <input
            id="roomPrice"
            name="roomPrice"
            value={room?.price}
            // onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            disabled
          />
        </div>
        
        {/* Date Picker */}
        <div className="mb-4">
          <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700 mb-1">Check-In Date</label>
          <input
            type="date"
            id="checkInDate"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700 mb-1">Check-Out Date</label>
          <input
            type="date"
            id="checkOutDate"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            min={formData.checkInDate}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
          <input
            type="text"
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="numberOfGuests" className="block text-sm font-medium text-gray-700 mb-1">Number Of Guests</label>
          <input
            type="number"
            id="numberOfGuests"
            name="numberOfGuests"
            value={formData.numberOfGuests}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default Booking;
