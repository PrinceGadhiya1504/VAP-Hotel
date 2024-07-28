import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomePage = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div>
      <section className="relative">
        <div className="max-w-screen-md mx-auto mt-2">
        <Slider {...sliderSettings}>
            <div>
              <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGhvdGVsJTIwbG9iYnl8ZW58MHx8fHwxNjUzNDU5NzI5&ixlib=rb-1.2.1&q=80&w=1080" alt="Hotel Lobby" className="w-full h-64 object-cover" />
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGhvdGVsJTIwbG9iYnl8ZW58MHx8fHwxNjUzNDU5NzI5&ixlib=rb-1.2.1&q=80&w=1080" alt="Hotel Lobby" className="w-full h-64 object-cover" />
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGhvdGVsJTIwbG9iYnl8ZW58MHx8fHwxNjUzNDU5NzI5&ixlib=rb-1.2.1&q=80&w=1080" alt="Hotel Lobby" className="w-full h-64 object-cover" />
            </div>
          </Slider>
        </div>
      </section>
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Welcome to MyHotel</h2>
          <p className="text-gray-600 mb-4">
            Experience the luxury and comfort at MyHotel. Our rooms are designed to provide you with the utmost
            comfort and relaxation. Enjoy our top-notch services and amenities during your stay.
          </p>
          <p className="text-gray-600">
            Explore our website to learn more about our rooms, services, and special offers. We look forward to
            welcoming you to MyHotel!
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
