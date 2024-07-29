import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


const UpdateBooking = () => {

    const navigate = useNavigate();

    const {id} = useParams()

    console.log(id);
    
  return (
    <div>UpdateBooking</div>
  )
}

export default UpdateBooking