import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    // <div className="container mx-auto px-4 py-8">
    //   <Slider {...settings}>
    //     <div className="px-4">
    //       <div className="bg-gray-200 rounded-lg p-4">
    //         <h3 className="text-xl font-semibold mb-2"><img src="" /></h3>
    //         <p>Content for slide 1</p>
    //       </div>
    //     </div>
    //     <div className="px-4">
    //       <div className="bg-gray-200 rounded-lg p-4">
    //         <h3 className="text-xl font-semibold mb-2">Slide 2</h3>
    //         <p>Content for slide 2</p>
    //       </div>
    //     </div>
    //     <div className="px-4">
    //       <div className="bg-gray-200 rounded-lg p-4">
    //         <h3 className="text-xl font-semibold mb-2">Slide 3</h3>
    //         <p>Content for slide 3</p>
    //       </div>
    //     </div>
    //     {/* Add more slides as needed */}
    //   </Slider>
    // </div>
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800">Powerful features in a simple dashboard</h1>
        <p className="text-lg text-gray-600 mt-4">Need to set up recurring events, coupons or custom form? We've got you covered.</p>
        <button className="bg-orange-700 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded mt-4">
          Explore Features
        </button>
      </div>
    </div>
  );
};

export default Home;