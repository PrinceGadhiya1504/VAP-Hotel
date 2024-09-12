import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

const About = () => {
  // State to manage the visibility of additional description
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle the state
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div className="about">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5">
              <div className="titlepage">
                <h2>About Us</h2>
                <p>
                  Welcome to VAP Hotel, where luxury and comfort meet in the heart of Jamnagar. Established in 2023, we have been dedicated to providing an exceptional experience for travelers seeking both relaxation and sophistication. Our hotel offers elegantly designed rooms and world-class amenities that cater to both business and leisure guests. From the moment you step through our doors, you’ll be greeted with warm hospitality and a commitment to excellence that defines our service.
                </p>
                {/* Button to toggle additional description */}
                <button className="read_more" onClick={handleToggle}>
                  {isExpanded ? 'Read Less' : 'Read More'}
                </button>
                {/* Conditionally render additional description based on the state */}
                {isExpanded && (
                  <div className="additional-description">
                    <p className='mt-3'>
                      At VAP Hotel, we pride ourselves on creating memorable stays through personalized service and attention to detail. Whether you’re enjoying a gourmet meal at our restaurant, unwinding at our spa, or exploring the vibrant surroundings, our goal is to ensure your stay is nothing short of extraordinary. Join us and discover why VAP Hotel is the preferred choice for discerning travelers in Jamnagar.
                    </p>
                    {/* Add more content here as needed */}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-7">
              <div className="about_img">
                <figure><img src="images/about.png" alt="About Us" /></figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
