import React from 'react';
import { useUser } from "../UserContext.jsx";
import { Link } from 'react-router-dom';

const PlaceProviderDashboard = () => {
    const { user } = useUser();

    return (
        <div>
            <h1>Place Provider Dashboard</h1>
            {user && user.role === 'place-provider' && (
                <div>
                    <h2>Welcome, {user.username}!</h2>
                    <p>Here are your options:</p>
                    <ul>
                        <li>
                            <Link to="/place-provider-profile">View Profile</Link>
                        </li>
                        <li>
                            <Link to="/place-provider-events">Managed Events</Link>
                        </li>
                        <li>
                            <button onClick={() => alert('Logout functionality to be implemented')}>Logout</button>
                        </li>
                    </ul>
                </div>
            )}
            {!user && (
                <p>Please log in as a place provider to access this dashboard.</p>
            )}
        </div>
    );
};

export default PlaceProviderDashboard;
