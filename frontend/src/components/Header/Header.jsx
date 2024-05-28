import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext.jsx'; // Adjust the path as necessary

export default function Header() {
    const { user, logout } = useUser(); // Use the useUser hook
    console.log("User role in Header:", user?.role);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to the home page after logout
    };
   return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <h2>Event-Handler</h2>
                    </Link>
                    <div className="justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium text-[16px] mb-1 lg:flex-row lg:space-x-8 lg:mt-0 text-center">
                            {/* Common links */}
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/events"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    See Events
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>
                            {/* Conditional links based on user role */}
                            {user && (
                                <>
                                    {(user.role === 'admin' || user.role === 'organizer')  && (
                                        <li>
                                            <NavLink
                                                to="/create-event"
                                                className={({ isActive }) =>
                                                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                                }
                                            >
                                                Create Event
                                            </NavLink>
                                        </li>
                                    )}
                                    {user.role === 'place-provider' && (
                                        <li>
                                            <NavLink
                                                to="/place-provider-dashboard"
                                                className={({ isActive }) =>
                                                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                                }
                                            >
                                                Provide-Place
                                            </NavLink>
                                        </li>
                                    )}
                                    {user.role === 'sponsor' && (
                                        <li>
                                            <NavLink
                                                to="/sponsor-dashboard"
                                                className={({ isActive }) =>
                                                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                                }
                                            >
                                                Sponsoring
                                            </NavLink>
                                        </li>
                                    )}
                                    {user.role === 'public-speaker' && (
                                        <li>
                                            <NavLink
                                                to="/public-speaker-dashboard"
                                                className={({ isActive }) =>
                                                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                                }
                                            >
                                                Details-for-Speech
                                            </NavLink>
                                        </li>
                                    )}
                                    <li>
                                        <button
                                            onClick={() => navigate('/profile')} // Assuming you have a profile page
                                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                                        >
                                            Profile
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            )}
                            {!user && (
                                <>
                                    <li>
                                        <Link
                                            to="/login"
                                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                                        >
                                            Log in
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/register"
                                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                                        >
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
