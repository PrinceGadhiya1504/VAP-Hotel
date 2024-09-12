import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

const Payments = () => {
  const [payment, setPayment] = useState([])
  const URL = process.env.REACT_APP_URL


  useEffect(() => {
    axios.get(`${URL}payment`)
      .then(response => {
        setPayment(response.data)
        console.log(response.data);
        
      })
  }, [])
 
  // const deletePayment = async (id) => {
  //   const confirmed = window.confirm('Are you sure you want to delete this Payment?');
  //   if (!confirmed) {
  //     return;
  //   }
  //   try {
  //     const response = await axios.delete(`http://localhost:3001/payment/${id}`);
  //     if (response.status === 200) {
  //       setPayment(payment.filter(payment => payment._id !== id));
  //     } else {
  //       console.error('Failed to delete the User');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div>
      <div className="records table-responsive">
        <div className="record-header">
          <div className="add">
            {/* <Link to="/register"><button>Add Payment</button></Link> */}
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
              {/* <th style={{ width: '5%' }}>bookingId</th> */}
              <th style={{ width: '5%' }}> User Name </th>
              <th style={{ width: '5%' }}> Amount </th>
              <th style={{ width: '5%' }}> Bank </th>
              <th style={{ width: '5%' }}> Payment Method </th>
              <th style={{ width: '5%' }}> Payment Status </th>
              <th style={{ width: '5%' }}> Date </th>
              <th style={{ width: '5%' }}> Transaction Id </th>
              <th style={{ width: '5%' }}> Currency </th>
              {/* <th style={{ width: '5%' }}> Action </th> */}
            </tr>
          </thead>
          <tbody>
            {
              payment.map((pay, index) => (
                <tr key={index}>
                  <td style={{ width: '5%' }}>{index + 1}</td>
                  {/* <td style={{ width: '5%' }}>{pay.bookingId._id}</td> */}
                  <td style={{ width: '5%' }}>{pay.userId.name}</td>
                  <td style={{ width: '5%' }}>{pay.amount}</td>
                  <td style={{ width: '5%' }}>{pay.bank}</td>
                  <td style={{ width: '5%' }}>{pay.paymentMethod}</td>
                  <td style={{ width: '5%' }}>{pay.paymentStatus}</td>
                  <td style={{ width: '5%' }}>{pay.paymentDate}</td>
                  <td style={{ width: '5%' }}>{pay.transactionId}</td>
                  <td style={{ width: '5%' }}>{pay.currency}</td>
                  {/* <td style={{ width: '5%' }}>
                    <Link to={`/editPayment/${pay._id}`}><button className='editButton'>Edit</button></Link>
                    <button onClick={() => deletePayment(pay._id)} className='deleteButton'>Delete</button>
                  </td> */}
                </tr>
              ))
            }
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Payments