import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext'; // Import the UserContext

const EventDetails = () => {
 const { id } = useParams();
 const [event, setEvent] = useState(null);
 const { user } = useUser(); // Use the UserContext

 useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/event/${id}`);
        console.log("event deatils ", response.data[0]);
        setEvent(response.data[0]);
        console.log("event title ",event.title);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvent();
 }, [id]);

 return (
    <div className="container mx-auto px-4 py-8">
      {event && (
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-2">{event?.title}</h2>
          <p className="text-gray-700 mb-2">{event?.description}</p>
          <p className="text-gray-500">Date: {event?.date}</p>
          <p className="text-gray-500">Time: {event?.time}</p>
          <p className="text-gray-500">Event Type: {event?.event_type}</p>
          <p className="text-gray-500">Duration: {event?.duration} hours</p>
          <p className="text-gray-500">Address: {event?.address}</p>
          <p className="text-gray-500">Sponsor: {event?.sponsor_name}</p>
          {user && (
            <Link to="/" className="text-orange-700 hover:text-orange-800">Back to Events</Link>
          )}
        </div>
      )}
    </div>
 );
};

export default EventDetails;
