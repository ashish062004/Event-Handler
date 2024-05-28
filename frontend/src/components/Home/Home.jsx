import React from 'react';
import backgroundImage from '../../assets/event.jpg';
import sideImage from '../../assets/sideImage.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div
        className="h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black">Event booking made simple</h1>
          <p className="text-lg text-black mt-4">Start creating event and selling tickets</p>
          <Link to="/events">
            <button className="bg-orange-700 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded mt-4">
              Explore Events
            </button>
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16 flex flex-wrap lg:flex-nowrap justify-center items-center">
        <div className="w-full lg:w-1/2 text-center lg:text-left mb-16 lg:mb-0 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-gray-800">Powerful features in a simple dashboard</h1>
          <p className="text-lg text-gray-600 mt-4">Need to set up recurring events, custom form? We've got you covered.</p>
          <Link to="/events">
            <button className="bg-orange-700 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded mt-4">
              Explore Features
            </button>
          </Link>
        </div>
        <div className="lg:w-1/2 flex justify-center items-center">
          <img src={sideImage} alt="side-image" className="w-1/2 h-1/2" />
        </div>
      </div>
    </>
  );
};

export default Home;
