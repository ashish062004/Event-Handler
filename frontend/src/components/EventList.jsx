import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useUser } from '../UserContext'; // Import the useUser hook
import BookingForm from './BookingForm'; // Import the BookingForm component

// Import images for each event type
import sportImage from './images/sport.jpg';
import techImage from './images/tech.jpg';
import cultureImage from './images/cultural.jpg';
import seminarImage from './images/seminar.jpg';
import otherImage from './images/other.jpg';

// Create an object mapping event types to their corresponding images
const eventTypeImages = {
  sport: sportImage,
  tech: techImage,
  cultural: cultureImage,
  seminar: seminarImage,
  other: otherImage,
};

const EventList = () => {
  const [events, setEvents] = useState([]);
  const { user } = useUser(); // Correctly use the useUser hook
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  console.log(user);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        console.log("events ", response.data);
        setEvents(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  const handleBookEvent = async (eventId) => {
    console.log("handleBookEvent", user);
    if (!user || user.role !== 'attendee') {
      console.log("handleBookEvent condition", user?.role);
      alert('Please log as Attendee to book this event.');
      return;
    }

    // Set the selected event and show the booking form
    setSelectedEvent(eventId);
    setShowBookingForm(true);
  };

  const closeBookingForm = () => {
    // Close the booking form
    setShowBookingForm(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <div key={event.id} className="bg-white shadow-md rounded-lg p-4">
          <img src={eventTypeImages[event.event_type]} alt={event.title} className="w-full h-48 object-cover" />
          <h2 className="text-xl font-bold mb-2">{event.title}</h2>
          <p className="text-gray-700 mb-2">{event.description}</p>
          <p className="text-gray-500">{event.date}</p>
          <p className="text-gray-500">{event.address}</p>
          <p className="text-gray-700 mb-2">Ticket Price: ₹{event.ticketPrice}</p>
          <button onClick={() => handleBookEvent(event.id)} className="mt-4 bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded">
            Book Event
          </button>
          <Link to={`/event/${event.id}`} className="mt-4 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
            View Details
          </Link>
        </div>
      ))}
      {showBookingForm && <BookingForm eventId={selectedEvent} onClose={closeBookingForm} ticketPrice={events.find(event => event.id === selectedEvent)?.ticketPrice}/>}
    </div>
  );
};

export default EventList;
