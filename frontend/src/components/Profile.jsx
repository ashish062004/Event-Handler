import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchProfile = async () => {
        try {
            const response = await fetch('/api/profile');
            if (!response.ok) {
                throw new Error('Error fetching profile');
            }
            const data = await response.json(); // Correctly parse the response as JSON
            console.log("profile details", data);
            setUser(data);
        } catch (error) {
            console.error(error);
        }
    };
    

        fetchProfile();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-2">Profile</h2>
            <p className="text-gray-700 mb-2">Full Name: {user.fullName}</p>
            <p className="text-gray-700 mb-2">Email: {user.email}</p>
            <p className="text-gray-500">Mobile Number: {user.mobileNo}</p>
            <p className="text-gray-500">Role: {user.role}</p>
            {user.role === 'attendee' && (
                <>
                    <h3 className="text-xl font-bold mb-2">Booked Events</h3>
                    {user.bookedEvents.map((event, index) => (
                        <p key={index} className="text-gray-700 mb-2">{event.event_name}</p>
                    ))}
                </>
            )}
            <Link to="/" className="text-orange-700 hover:text-orange-800">Back</Link>
        </div>
    );
};

export default Profile;
