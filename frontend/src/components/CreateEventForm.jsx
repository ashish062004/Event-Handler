// import React, { useState } from 'react';
// import { api } from '../api';
// import { useUser } from '../UserContext'; // Make sure to import the useUser hook

// const CreateEventForm = () => {
//   const { user } = useUser(); // Access the current user from the context
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [eventType, setEventType] = useState('');
//   const [id, setId] = useState();
//   const [duration, setDuration] = useState('');
//   const [address, setAddress] = useState('');
//   const [sponsorName, setSponsorName] = useState('');
//   console.log("user", user);
//   console.log("user", user.id);
//   setId(user.id);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await api.post('/create-event', {title, description, time, date, id, eventType, duration, address, sponsorName});
//       console.log("response " ,response.data);
//       // Handle event creation success, e.g., redirect
//     } catch (error) {
//       console.error(error);
//       // Handle event creation error
//     }
//   };

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
  const [id, setId] = useState(user.id); // Initialize id state with user.id
  const [duration, setDuration] = useState('');
  const [address, setAddress] = useState('');
  const [sponsorName, setSponsorName] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post('/create-event', {title, description, time, date, id, eventType, duration, address, sponsorName});
      // Handle event creation success, e.g., redirect
      navigate('/');
      alert('Login successful!');
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
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mb-4 p-2 border rounded"
        />
      </label>
      <label>
        Time:
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="mb-4 p-2 border rounded"
        />
      </label>
      <select
        value={eventType}
        onChange={(e) => setEventType(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="">Select Event Type</option>
        <option value="sport">Sport</option>
        <option value="tech">Tech</option>
        <option value="cultural">Cultural</option>
        <option value="seminar">Seminar</option>
        <option value="other">Other</option>
      </select>
      <label>
        Duration:
        <input
          type="number"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="mb-4 p-2 border rounded"
        />
      </label>
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <label>
        Photo:
        <input
          type="file"
          onChange={handlePhotoChange}
          className="mb-4 p-2 border rounded"
        />
      </label>
      <input
        type="text"
        placeholder="Sponsor Name"
        value={sponsorName}
        onChange={(e) => setSponsorName(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Create Event
      </button>
    </form>
  );
};

export default CreateEventForm;