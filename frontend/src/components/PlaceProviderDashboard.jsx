import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../UserContext';

const PlaceProvierDashboard = () => {
    const { user } = useUser();
    const [userID , setuserID ] = useState(user.id);
    console.log(userID);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        size: '',
        chargePerHour: '',
        userID: userID
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("loction bhej raha hu ", formData);
            await axios.post('/places', formData);
            console.log("upper kuch issue hai");
            alert('Place added successfully');
            // Clear the form after successful submission if needed
            setFormData({
                name: '',
                address: '',
                size: '',
                chargePerHour: ''
            });
        } catch (error) {
            console.error('Error adding place:', error);
            alert('Error adding place');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            <div className="mb-4">
                <label htmlFor="size" className="block text-sm font-medium text-gray-700">Size</label>
                <input type="number" name="size" id="size" value={formData.size} onChange={handleChange} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            <div className="mb-4">
                <label htmlFor="chargePerHour" className="block text-sm font-medium text-gray-700">Charge Per Hour</label>
                <input type="number" name="chargePerHour" id="chargePerHour" value={formData.chargePerHour} onChange={handleChange} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Place</button>
        </form>
    );
};

export default PlaceProvierDashboard;
