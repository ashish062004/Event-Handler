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
      const response = await api.post('/auth/login', { username, password });
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
  <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mt-6 mb-4">
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Username
      </label>
      <input
        id="username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="flex items-center justify-end">
      <button
        type="submit"
        className="bg-orange-700 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Sign In
      </button>
    </div>
  </form>
</div>

 );
};

export default LoginForm;
