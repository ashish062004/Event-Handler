// import React, { useState } from 'react';
// import { api } from '../api';
// import { useNavigate } from 'react-router-dom';
// import { useUser } from '../UserContext.jsx';
// import setAuthToken from '../utils/auth';

// const LoginForm = () => {
//  const [username, setUsername] = useState('');
//  const [password, setPassword] = useState('');
//  const { setUser } = useUser();
//  const navigate = useNavigate();


//  const handleSubmit = async (e) => {
//     console.log("login form");
//     e.preventDefault();
//     try {
//       console.log("login form try");
//       const response = await api.post('/login', { username, password });
//       console.log("login responso ",response);
//       //const { token, role } = response.data; // Assuming the response includes the user's role
//       const { token, id, role } = response.data; // Assuming the response includes the user's role
//       localStorage.setItem('token', token);
//       setAuthToken(token);
//       // Update the user's state in the context with the fetched role
//       setUser({id, role });
//       // Navigate to the home page
//       navigate('/');
//       alert('Login successful!');
//       console.log("login successful");
//     } catch (error) {
//       console.error(error);
//       alert('Login failed. Please try again.');
//     }
//  };

import React, { useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import setAuthToken from '../utils/auth';

const LoginForm = () => {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const { setUser } = useUser();
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { username, password });
      const { userId, role } = response.data; // Adjusted to match the backend response
      localStorage.setItem('token', response.data.token); // Assuming the token is returned in the response
      setAuthToken(response.data.token); // Set the auth token
      setUser({ id: userId, role: role }); // Update the user's state in the context
      navigate('/');
      alert('Login successful!');
    } catch (error) {
      console.error(error);
      alert('Login failed. Please try again.');
    }
 }
 return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Login
      </button>
    </form>
 );
};

export default LoginForm;
