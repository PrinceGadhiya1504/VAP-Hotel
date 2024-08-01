import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateRoomCategory = () => {

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    maxPerson: '',
    facilities: '',
    description: ''
  });

  const navigate = useNavigate();
  const {id} = useParams()

  useEffect(() => {
    axios.get(`http://localhost:3001/roomCategory/${id}`)
    .then((res) => {
      setFormData(res.data)
    })
    .catch((err) => {
      console.log(err);
    })
  },[id])
  
  // console.log(data);
  console.log(formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/roomCategory/${id}`, formData)
      if(response.status === 200){
        console.log(response.data);
        navigate('/admin/category')
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);      
    }
  };

  return (
    <div className="Admincontainer">
     <div className="card">
       <h2>Update Category</h2>
       <form onSubmit={handleSubmit}>
           <div className="form-group">
             <label htmlFor="name">Name</label>
             <input
               type="text"
               className="form-control"
               id="name"
               name="name"
               value={formData.name}
               onChange={handleChange}
               autoComplete='off'
               autoFocus
             />
           </div>
         <div className="form-row">
         <div className="form-group">
           <label htmlFor="price">Price</label>
           <input
             type="number"
             className="form-control"
             id="price"
             name="price"
             value={formData.price}
             onChange={handleChange}
             />
         </div>
         <div className="form-group">
           <label htmlFor="maxPerson">maxPerson</label>
           <input
            type='number'
             id="maxPerson"
             name="maxPerson"
             className="form-control"
             value={formData.maxPerson}
             onChange={handleChange}
             />
         </div>
       </div>
         <div className="form-group">
           <label htmlFor="facilities">Facilities</label>
           <input
             type="text"
             className="form-control"
             id="facilities"
             name="facilities"
             value={formData.facilities}
             onChange={handleChange}
             autoComplete='off'
           />
         </div>
         <div className="form-group">
           <label htmlFor="description">Description</label>
           <textarea
             className="form-control"
             id="description"
             name="description"
             value={formData.description}
             onChange={handleChange}
           />
         </div>
         <button type="submit" className="submit-btn">Update Category</button>
       </form>
     </div>
   </div>
 )
}

export default UpdateRoomCategory