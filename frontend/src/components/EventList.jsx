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
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [selectedType, setSelectedType] = useState(''); // State for selected event type
  const [selectedCity, setSelectedCity] = useState(''); // State for selected city

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
      alert('Please log in as an Attendee to book this event.');
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

  // Filter events based on the search query, selected event type, and selected city
  const filteredEvents = events.filter(event =>
    event.title?.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedType === '' || event.event_type === selectedType) &&
    (selectedCity === '' || event.address?.toLowerCase().includes(selectedCity.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search events"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <div className="flex space-x-4 mb-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="p-2 border rounded w-full md:w-1/2"
          >
            <option value="">All Types</option>
            <option value="sport">Sport</option>
            <option value="tech">Tech</option>
            <option value="cultural">Cultural</option>
            <option value="seminar">Seminar</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            placeholder="City"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="p-2 border rounded w-full md:w-1/2"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white shadow-md rounded-lg p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            <img
              src={eventTypeImages[event.event_type]}
              alt={event.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h2 className="text-xl font-bold mb-2">{event.title}</h2>
            {/* <p className="text-gray-700 mb-2">{event.description}</p> */}
            <p className="text-gray-500">{event.date}</p>
            <p className="text-gray-500">{event.address}</p>
            <p className="text-gray-700 mb-2">Ticket Price: ₹{event.ticketPrice}</p>
            <button
              onClick={() => handleBookEvent(event.id)}
              className="mt-4 bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded"
            >
              Book Event
            </button>
            <Link
              to={`/event/${event.id}`}
              className="mt-4 ml-2 text-gray-500 hover:text-black font-bold py-2 px-4 rounded underline"
            >
              View Details
            </Link>
          </div>
        ))}
        {showBookingForm && (
          <BookingForm
            eventId={selectedEvent}
            onClose={closeBookingForm}
            ticketPrice={events.find((event) => event.id === selectedEvent)?.ticketPrice}
          />
        )}
      </div>
    </div>
  );
};

export default EventList;
