import React from 'react';

const HotelFeatures = () => {
  return (
    <div className="blog">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="titlepage">
              <h2>Our Features</h2>
              <p>Explore our luxurious amenities and features to enhance your stay with us.</p>
            </div>
          </div>
        </div>
        <div className="row">
          {/* Feature 1: Poolside Dining */}
          <div className="col-md-4">
            <div className="blog_box">
              <div className="blog_img">
                <figure><img src="images/blog1.jpg" alt="Poolside Dining" /></figure>
              </div>
              <div className="blog_room">
                <h3>Poolside Dining</h3>
                <span>Relax in style</span>
                <p>Relax in style by our swimming pool with comfortable chairs and gourmet food options. Perfect for a leisurely meal or a refreshing drink in a beautiful setting.</p>
              </div>
            </div>
          </div>
          {/* Feature 2: Lounge Area */}
          <div className="col-md-4">
            <div className="blog_box">
              <div className="blog_img">
                <figure><img src="images/blog2.jpg" alt="Lounge Area" /></figure>
              </div>
              <div className="blog_room">
                <h3>Luxurious Lounge</h3>
                <span>Comfort and relaxation</span>
                <p>Our lounge area is designed for ultimate comfort and relaxation, featuring plush sofas, elegant decor, and a perfect atmosphere for unwinding or socializing.</p>
              </div>
            </div>
          </div>
          {/* Feature 3: Elegant Bedroom */}
          <div className="col-md-4">
            <div className="blog_box">
              <div className="blog_img">
                <figure><img src="images/blog3.jpg" alt="Elegant Bedroom" /></figure>
              </div>
              <div className="blog_room">
                <h3>Elegant Bedroom</h3>
                <span>Modern and serene</span>
                <p>Experience a restful stay in our elegantly designed bedrooms, complete with modern furnishings, luxurious bedding, and a serene ambiance for a perfect night's sleep.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelFeatures;
