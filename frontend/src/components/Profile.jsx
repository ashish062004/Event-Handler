// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useUser } from '../UserContext.jsx'; // Adjust the import path as necessary
// import { api } from '../api.js';

// const Profile = () => {
//     const { user } = useUser();
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//     const [response, setResponse] = useState({});

//     useEffect(() => {
//         const loadUser = async () => {
//             try {
//                 const res = await api.get(`/api/profile/${user.id}`);
//                 setResponse(res.data); // Setting response.data to state
//                 console.log("profile response ", res.data);
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         // Check if user exists and call loadUser function
//         if (user && user.id) {
//             loadUser();
//         } else {
//             setLoading(false);
//         }
//     }, [user]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     if (!user) {
//         return <div>No user data available</div>;
//     }

//     return (
//         // <div className="bg-white shadow-md rounded-lg p-4">
//         //     <h2 className="text-2xl font-bold mb-2">Profile</h2>
//         //     <div className="mb-4">
//         //         <p className="text-gray-700 mb-2"><span className="font-semibold">Full Name:</span> {response.fullName}</p>
//         //         <p className="text-gray-700 mb-2"><span className="font-semibold">Email:</span> {response.email}</p>
//         //         <p className="text-gray-700 mb-2"><span className="font-semibold">Mobile Number:</span> {response.mobileNo}</p>
//         //         <p className="text-gray-700 mb-2"><span className="font-semibold">Role:</span> {response.role}</p>
//         //     </div>
//         //     {user.role === 'attendee' && (
//         //         <>
//         //             <h3 className="text-xl font-bold mb-2">Booked Events</h3>
//         //             {response.bookedEvents && response.bookedEvents.length > 0 ? (
//         //                 <table className="min-w-full divide-y divide-gray-200">
//         //                     <thead className="bg-gray-50">
//         //                         <tr>
//         //                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
//         //                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Type</th>
//         //                         </tr>
//         //                     </thead>
//         //                     <tbody className="bg-white divide-y divide-gray-200">
//         //                         {response.bookedEvents.map((event, index) => (
//         //                             <tr key={index}>
//         //                                 <td className="px-6 py-4 whitespace-nowrap">{event.event_name}</td>
//         //                                 <td className="px-6 py-4 whitespace-nowrap">{event.ticket_type}</td>
//         //                             </tr>
//         //                         ))}
//         //                     </tbody>
//         //                 </table>
//         //             ) : (
//         //                 <p>No booked events</p>
//         //             )}
//         //         </>
//         //     )}
//         //     <Link to="/" className="text-orange-700 hover:text-orange-800">Back</Link>
//         // </div>
//         <div className="bg-white shadow-md rounded-lg p-4">
//             <h2 className="text-2xl font-bold mb-2">Profile</h2>
//             <div className="mb-4">
//                 <p className="text-gray-700 mb-2"><span className="font-semibold">Full Name:</span> {response.fullName}</p>
//                 <p className="text-gray-700 mb-2"><span className="font-semibold">Email:</span> {response.email}</p>
//                 <p className="text-gray-700 mb-2"><span className="font-semibold">Mobile Number:</span> {response.mobileNo}</p>
//                 <p className="text-gray-700 mb-2"><span className="font-semibold">Role:</span> {response.role}</p>
//             </div>
//             {user.role === 'attendee' && (
//                 <>
//                     <h3 className="text-xl font-bold mb-2">Booked Events</h3>
//                     {response.bookedEvents && response.bookedEvents.length > 0 ? (
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-50">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Type</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {response.bookedEvents.map((event, index) => (
//                                     <tr key={index}>
//                                         <td className="px-6 py-4 whitespace-nowrap">{event.event_name}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap">{event.ticket_type}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     ) : (
//                         <p>No booked events</p>
//                     )}
//                 </>
//             )}
//             {user.role === 'admin' && (
//                 <>
//                     <h3 className="text-xl font-bold mb-2">Created Events</h3>
//                     {response.createdEvents && response.createdEvents.length > 0 ? (
//                         <ul className="list-disc list-inside">
//                             {response.createdEvents.map((event, index) => (
//                                 <li key={index} className="text-gray-700">{event.event_name}</li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p>No created events</p>
//                     )}
//                 </>
//             )}
//             <Link to="/" className="text-orange-700 hover:text-orange-800">Back</Link>
//         </div>
//     );
// };

// export default Profile;
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../UserContext.jsx'; // Adjust the import path as necessary
import { api } from '../api.js';

const Profile = () => {
    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [response, setResponse] = useState({});

    useEffect(() => {
        const loadUser = async () => {
            try {
                const res = await api.get(`users/profile/${user.id}`);
                setResponse(res.data); // Setting response.data to state
                console.log("profile response ", res.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        // Check if user exists and call loadUser function
        if (user && user.id) {
            loadUser();
        } else {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>No user data available</div>;
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-2">Profile</h2>
            <div className="mb-4">
                <p className="text-gray-700 mb-2"><span className="font-semibold">Full Name:</span> {response.fullName}</p>
                <p className="text-gray-700 mb-2"><span className="font-semibold">Email:</span> {response.email}</p>
                <p className="text-gray-700 mb-2"><span className="font-semibold">Mobile Number:</span> {response.mobileNo}</p>
                <p className="text-gray-700 mb-2"><span className="font-semibold">Role:</span> {response.role}</p>
            </div>
            {response.role === 'attendee' && (
                <>
                    <h3 className="text-xl font-bold mb-2">Booked Events</h3>
                    {response.bookedEvents && response.bookedEvents.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Type</th> */}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {response.bookedEvents.map((event, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">{event.event_name}</td>
                                        {/* <td className="px-6 py-4 whitespace-nowrap">{event.ticket_type}</td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No booked events</p>
                    )}
                </>
            )}
            {response.role === 'admin' && (
                <>
                    <h3 className="text-xl font-bold mb-2">Created Events</h3>
                    {response.createdEvents && response.createdEvents.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {response.createdEvents.map((event, index) => (
                                <li key={index} className="text-gray-700">{event.event_name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No created events</p>
                    )}
                </>
            )}
            <Link to="/" className="text-orange-700 hover:text-orange-800">Back</Link>
        </div>
    );
};

export default Profile;
