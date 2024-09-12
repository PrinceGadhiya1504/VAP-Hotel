import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Gallery = () => {

   const [gallery, setGallery] = useState([])
   const URL = process.env.REACT_APP_URL

   useEffect(() => {
      axios.get(`${URL}gallery`)
         .then(response => {
            console.log(response.data);
            const filteredGallery = response.data.filter(item => item.category === 'gallery');
            setGallery(filteredGallery)
         })
   }, [])

   return (
      <div>
         <div className="gallery">
            <div className="container">
               <div className="row">
                  <div className="col-md-12">
                     <div className="titlepage">
                        <h2>gallery</h2>
                        <p>Explore the Beauty and Elegance of VAP Hotel</p>
                     </div>
                  </div>
               </div>
               <div className="row">
                  {
                     gallery.map((gall, index) => (
                        <div className="col-md-3 col-sm-6" key={index}>
                           <div className="gallery_img">
                              <figure><img src={`${URL}uploads/${gall.imageName}`} alt={gall.imageName}  /></figure>
                           </div>
                        </div>
                     ))
                  }
               </div>
            </div>
         </div>
      </div>
   )
}

export default Gallery