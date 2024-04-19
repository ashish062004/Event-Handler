import React from 'react';
import { useUser } from "../UserContext.jsx";
import { Link } from 'react-router-dom';

const SponsorDashboard = () => {
    const { user } = useUser();

    return (
        <div>
            <h1>Sponsor Dashboard</h1>
            {user && user.role === 'sponsor' && (
                <div>
                    <h2>Welcome, {user.username}!</h2>
                    <p>Here are your options:</p>
                    <ul>
                        <li>
                            <Link to="/sponsor-profile">View Profile</Link>
                        </li>
                        <li>
                            <Link to="/sponsor-events">Sponsored Events</Link>
                        </li>
                        <li>
                            <button onClick={() => alert('Logout functionality to be implemented')}>Logout</button>
                        </li>
                    </ul>
                </div>
            )}
            {!user && (
                <p>Please log in as a sponsor to access this dashboard.</p>
            )}
        </div>
    );
};

export default SponsorDashboard;
