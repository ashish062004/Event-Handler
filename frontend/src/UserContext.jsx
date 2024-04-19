import React, { createContext, useState, useContext } from 'react';

// Define the context
const UserContext = createContext();

// Define the provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
     const login = (userData) => {
         setUser(userData); // Set the user state
     };
    const logout = () => {
        setUser(null); // Clear the user state
    };

    // Example function to fetch user data from an API
    const fetchUser = async (userId) => {
        try {
            // Assuming you have an API module or function to make requests
            const response = await api.get(`/users/${userId}`);
            //setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    // Provide the context value
    return (
        <UserContext.Provider value={{ user, setUser, logout, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Define the custom hook to use the context
export const useUser = () => useContext(UserContext);
