import React, { useState } from 'react';
import { api } from '../api';
import { useUser } from '../UserContext';

const BookingForm = ({ eventId, onClose }) => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
  });
  const [ticketId, setTicketId] = useState(null); // State to store the ticket ID

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/book-event', {
        ...formData,
        user_id: user.id, // Pass user id correctly
        event_id: eventId, // Pass event id from props
      });
      const { ticketId } = response.data; // Extract the ticketId from the response
      console.log("ticket ID ", ticketId);
      setTicketId(ticketId); // Store the ticket ID in state
      alert('Event booked successfully!');
    } catch (error) {
      console.error('Failed to book event:', error);
      alert('Failed to book event. Please try again.');
    }
  };

  const handleDownloadTicket = async () => {
    if (!ticketId) {
      alert('No ticket available to download');
      return;
    }
    // Make a request to download the ticket image
    console.log("ticket ID ", ticketId);
    try {
      const response = await api.get(`/download-ticket/${ticketId}`, { responseType: 'blob' });
  
      // Create a temporary URL for the blob and trigger a download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      console.log("ticket try block running ", response.data);
      link.href = url;
      link.setAttribute('download', `ticket_${ticketId}.png`);
      document.body.appendChild(link);
      link.click();
      // Clean up the URL and remove the link from the DOM
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      // alert("Booking successfully");
      onClose();
    } catch (error) {
      console.error('Failed to download ticket:', error);
      alert('Failed to download ticket. Please try again later.');
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Book Event
                </h3>
                <div className="mt-2">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                        First Name
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                        Last Name
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">
                        Mobile Number
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="mobileNumber" type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
                    </div>
                    <div className="flex items-center justify-between">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Book
                      </button>
                      {ticketId && ( // Show download button only if ticketId is available
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleDownloadTicket}>
                          Download Ticket
                        </button>
                      )}
                      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={onClose}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
