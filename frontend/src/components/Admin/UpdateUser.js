import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: '',
        dateOfBirth: '',
        email: '',
        password: '',
        role: '',
      });
    
      const navigate = useNavigate();
      const {id} = useParams()
    
      useEffect(() => {
        axios.get(`http://localhost:3001/user/${id}`)
        .then((res) => {
          setFormData(res.data)
        })
        .catch((err) => {
          console.log(err);
        })
      },[])
      
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
          const response = await axios.put(`http://localhost:3001/user/${id}`, formData)
          if(response.status === 200){
            console.log(response.data);
            navigate('/admin/users')
          } else {
            console.log("error");
          }
        } catch (error) {
          console.log(error);      
        }
      };

      
  return (
    <div className="container">
     <div className="card">
       <h2>Update Category</h2>
       <form onSubmit={handleSubmit}>
            <div className="form-row">
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
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="number"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        autoComplete='off'
                        autoFocus
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                        type="text"
                        className="form-control"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        autoComplete='off'
                        autoFocus
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        className="form-control"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        autoComplete='off'
                        autoFocus
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="name">Password</label>
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
                <div className="form-group">
                    <label htmlFor="type">Room Type</label>
                    <select
                        id="type"
                        name="type"
                        className="form-control"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option>Choose...</option>
                        <option value='guest'>Guest</option>
                        <option value='admin'>Admin</option>
                    </select>
                </div>
            </div>
         <button type="submit" className="submit-btn">Update Category</button>
       </form>
     </div>
   </div>
  )
}

export default UpdateUser