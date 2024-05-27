import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../UserContext';

const SponsorshipForm = () => {
    const { user } = useUser();
    const [userID , setuserID ] = useState(user.id);

    const [formData, setFormData] = useState({
        name: '',
        sponsorshipLevel: '',
        userID: userID
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/sponsor/submit', formData);
            alert('Sponsorship information submitted successfully');
            // Clear the form after successful submission if needed
            setFormData({
                name: '',
                sponsorshipLevel: ''
            });
        } catch (error) {
            console.error('Error submitting sponsorship information:', error);
            alert('Error submitting sponsorship information');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            <div className="mb-4">
                <label htmlFor="sponsorshipLevel" className="block text-sm font-medium text-gray-700">Sponsorship Level</label>
                <input type="text" name="sponsorshipLevel" id="sponsorshipLevel" value={formData.sponsorshipLevel} onChange={handleChange} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
        </form>
    );
};

export default SponsorshipForm;
