import React from 'react';
import EventList from '../EventList'; // Adjust the import path as necessary

const Home = () => {
 return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Event-Handler</h1>
      <EventList />
    </div>
 );
};

export default Home;
