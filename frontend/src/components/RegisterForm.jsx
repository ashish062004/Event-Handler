import React, { useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await api.post('/auth/register', { username, password, role, email, mobileNo });
      const { userId } = response.data; // Changed role to userRole
      console.log("register response", response.data);
      setUser({ id: userId, role: role }); // Changed role to userRole
      setShowSuccessPopup(true);
      setTimeout(() => {
        navigate('/');
        setShowSuccessPopup(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <>
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mt-6 mb-4">
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-md mx-auto">
 <input
    type="text"
    placeholder="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    className="p-2 border rounded focus:outline-none focus:ring focus:border-blue-500 w-full"
 />
 <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="p-2 border rounded focus:outline-none focus:ring focus:border-blue-500 w-full"
 />
 <input
    type="password"
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    className="p-2 border rounded focus:outline-none focus:ring focus:border-blue-500 w-full"
 />
 <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="p-2 border rounded focus:outline-none focus:ring focus:border-blue-500 w-full"
 />
 <input
    type="tel"
    placeholder="Mobile Number"
    value={mobileNo}
    onChange={(e) => setMobileNo(e.target.value)}
    className="p-2 border rounded focus:outline-none focus:ring focus:border-blue-500 w-full"
 />
 <select
    value={role}
    onChange={(e) => setRole(e.target.value)}
    className="p-2 border rounded focus:outline-none focus:ring focus:border-blue-500 w-full"
 >
    <option value="">Select Role</option>
    <option value="attendee">Attendee</option>
    <option value="organizer">Organizer</option>
    <option value="place-provider">Place Provider</option>
    <option value="sponsor">Sponsor</option>
    <option value="public-speaker">Public speaker</option>
 </select>
 <button type="submit" className="p-2 bg-orange-700 text-white rounded hover:bg-orange-900 w-full">
    Register
 </button>
</form>
</div>
      {showSuccessPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">Registration Successful!</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
