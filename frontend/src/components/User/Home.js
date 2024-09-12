import React, { useEffect, useState } from 'react';
import About from './About';
import axios from 'axios';

const Home = () => {
   const [gallery, setGallery] = useState([]);
   const URL = process.env.REACT_APP_URL

   useEffect(() => {
      axios.get(`${URL}gallery`)
         .then(response => {
            const filteredGallery = response.data.filter(item => item.category === 'slider');
            setGallery(filteredGallery);
            // console.log(filteredGallery);
         })
         .catch(error => {
            console.error("There was an error fetching the gallery images!", error);
         });
   }, []);

   return (
      <div>
         <section className="banner_main">
            <div id="myCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
               <ol className="carousel-indicators">
                  {gallery.map((_, index) => (
                     <li key={index} data-bs-target="#myCarousel" data-bs-slide-to={index} className={index === 0 ? 'active' : ''}></li>
                  ))}
               </ol>
               <div className="carousel-inner">
                  {gallery.map((item, index) => (
                     <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <img className="d-block w-100 carousel-image" src={`${URL}uploads/${item.imageName}`} alt={`Slide ${index + 1}`} />
                     </div>
                  ))}
               </div>
               <a className="carousel-control-prev" href="#myCarousel" role="button" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
               </a>
               <a className="carousel-control-next" href="#myCarousel" role="button" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
               </a>
            </div>
         </section>
         <About />
      </div>
   );
}

export default Home;
