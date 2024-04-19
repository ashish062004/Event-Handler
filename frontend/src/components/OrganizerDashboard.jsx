import React from 'react';
import { useUser } from "../UserContext.jsx";
import { Link } from 'react-router-dom';

const OrganizerDashboard = () => {
    const { user } = useUser();

    return (
        <div>
            <h1>Organizer Dashboard</h1>
            {user && user.role === 'organizer' && (
                <div>
                    <h2>Welcome, {user.username}!</h2>
                    <p>Here are your options:</p>
                    <ul>
                        <li>
                            <Link to="/create-event">Create Event</Link>
                        </li>
                        <li>
                            <Link to="/manage-users">Manage Users</Link>
                        </li>
                        <li>
                            <Link to="/organizer-profile">View Profile</Link>
                        </li>
                        <li>
                            <button onClick={() => alert('Logout functionality to be implemented')}>Logout</button>
                        </li>
                    </ul>
                </div>
            )}
            {!user && (
                <p>Please log in as an organizer to access this dashboard.</p>
            )}
        </div>
    );
};

export default OrganizerDashboard;
