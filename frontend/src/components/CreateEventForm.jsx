import React, { useState, useEffect } from 'react'; // Import useEffect
import { api } from '../api';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';

const CreateEventForm = () => {
  const { user } = useUser();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [eventType, setEventType] = useState('');
  const [organizer_id, setId] = useState(user.id); // Initialize id state with user.id
  console.log("creation events where ID ",organizer_id);
  const [duration, setDuration] = useState('');
  const [address, setAddress] = useState('');
  const [sponsorName, setSponsorName] = useState('');
  const [ticketPrice, setTicketPrice] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      alert('Please enter a valid date in YYYY-MM-DD format');
      return;
    }
    try {
      const response = await api.post('/events/create', {title, description, time, date, organizer_id, eventType, duration, address, sponsorName, ticketPrice});
      // Handle event creation success, e.g., redirect
      navigate('/');
      alert('Event created successful!');
    } catch (error) {
      console.error(error);
      // Handle event creation error
      alert('failed to create event');
    }
  };
  const handlePhotoChange = (e) => {
    // Handle photo change logic here
    // For example, you can access the selected file using e.target.files[0]
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mt-6 mb-4">
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
        Title
      </label>
      <input
        id="title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
        Description
      </label>
      <textarea
        id="description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
        Date
      </label>
      <input
        id="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
        Time
      </label>
      <input
        id="time"
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventType">
        Event Type
      </label>
      <select
        id="eventType"
        value={eventType}
        onChange={(e) => setEventType(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">Select Event Type</option>
        <option value="sport">Sport</option>
        <option value="tech">Tech</option>
        <option value="cultural">Cultural</option>
        <option value="seminar">Seminar</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
        Duration
      </label>
      <input
        id="duration"
        type="number"
        placeholder="Duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
        Address
      </label>
      <input
        id="address"
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ticketPrice">
        Ticket Price
      </label>
      <input
        id="ticketPrice"
        type="number"
        placeholder="Ticket Price"
        value={ticketPrice}
        onChange={(e) => setTicketPrice(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
        Photo
      </label>
      <input
        id="photo"
        type="file"
        onChange={handlePhotoChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sponsorName">
        Sponsor Name
      </label>
      <input
        id="sponsorName"
        type="text"
        placeholder="Sponsor Name"
        value={sponsorName}
        onChange={(e) => setSponsorName(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div className="flex items-center justify-end">
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create Event
      </button>
    </div>
  </form>
</div>

  );
};

export default CreateEventForm;