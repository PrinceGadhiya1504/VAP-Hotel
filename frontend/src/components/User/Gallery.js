import React from 'react'

const Gallery = () => {
  return (
    <div>
        <div  className="gallery">
         <div className="container">
            <div className="row">
               <div className="col-md-12">
                  <div className="titlepage">
                     <h2>gallery</h2>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-md-3 col-sm-6">
                  <div className="gallery_img">
                     <figure><img src="images/gallery1.jpg" alt="#"/></figure>
                  </div>
               </div>
               <div className="col-md-3 col-sm-6">
                  <div className="gallery_img">
                     <figure><img src="images/gallery2.jpg" alt="#"/></figure>
                  </div>
               </div>
               <div className="col-md-3 col-sm-6">
                  <div className="gallery_img">
                     <figure><img src="images/gallery3.jpg" alt="#"/></figure>
                  </div>
               </div>
               <div className="col-md-3 col-sm-6">
                  <div className="gallery_img">
                     <figure><img src="images/gallery4.jpg" alt="#"/></figure>
                  </div>
               </div>
               <div className="col-md-3 col-sm-6">
                  <div className="gallery_img">
                     <figure><img src="images/gallery5.jpg" alt="#"/></figure>
                  </div>
               </div>
               <div className="col-md-3 col-sm-6">
                  <div className="gallery_img">
                     <figure><img src="images/gallery6.jpg" alt="#"/></figure>
                  </div>
               </div>
               <div className="col-md-3 col-sm-6">
                  <div className="gallery_img">
                     <figure><img src="images/gallery7.jpg" alt="#"/></figure>
                  </div>
               </div>
               <div className="col-md-3 col-sm-6">
                  <div className="gallery_img">
                     <figure><img src="images/gallery8.jpg" alt="#"/></figure>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}

export default Gallery