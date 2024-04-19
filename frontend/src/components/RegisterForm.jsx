// import React, { useState } from 'react';
// import { api } from '../api'; // Ensure this path correctly points to your API configuration
// import { useNavigate } from 'react-router-dom';
// import { useUser } from '../UserContext.jsx'; // Adjust the import path as necessary


// const RegisterForm = () => {
//  const [username, setUsername] = useState('');
//  const [password, setPassword] = useState('');
//  const [confirmPassword, setConfirmPassword] = useState('');
//  const [role, setRole] = useState('');
//  const [id, setId] = useState();
//  const [email, setEmail] = useState('');
//  const [mobileNo, setMobileNo] = useState('');
//  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//  const navigate = useNavigate();
//  const { setUser } = useUser(); // Use the useUser hook

 
//  const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     try {
//       const response = await api.post('/register', { username, password, role, email, mobileNo });
//       console.log("register data ",response.data);
//       setShowSuccessPopup(true); // Show the success popup
//       setTimeout(() => {
//         // Update the user's state in the context with the fetched role
//         setId(response.data.userId);
//         console.log("id ",id);
//         setUser({ id, role });
//         // Navigate to the home page
//         navigate('/');
//       }, 2000); // Adjust the delay as needed
//     } catch (error) {
//       console.error(error.response.data); // Log the error response data
//       alert('Registration failed. Please try again.');
//     }
//  };

// import React, { useState } from 'react';
// import { api } from '../api';
// import { useNavigate } from 'react-router-dom';
// import { useUser } from '../UserContext';

// const RegisterForm = () => {
//  const [username, setUsername] = useState('');
//  const [password, setPassword] = useState('');
//  const [confirmPassword, setConfirmPassword] = useState('');
//  const [role, setRole] = useState('');
//  const [email, setEmail] = useState('');
//  const [mobileNo, setMobileNo] = useState('');
//  const { setUser } = useUser();
//  const navigate = useNavigate();

//  const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     try {
//       const response = await api.post('/register', { username, password, role, email, mobileNo });
//       const { userId, role } = response.data; // Adjusted to match the backend response
//       setUser({ id: userId, role }); // Update the user's state in the context
//       navigate('/');
//       alert('Registration successful!');
//     } catch (error) {
//       console.error(error);
//       alert('Registration failed. Please try again.');
//     }
//  };

//  return (
//     <>
//       <form onSubmit={handleSubmit} className="flex flex-col">
//                  <input
//                      type="text"
//                      placeholder="Username"
//                      value={username}
//                      onChange={(e) => setUsername(e.target.value)}
//                      className="mb-4 p-2 border rounded"
//                  />
//                  <input
//                      type="password"
//                      placeholder="Password"
//                      value={password}
//                      onChange={(e) => setPassword(e.target.value)}
//                      className="mb-4 p-2 border rounded"
//                  />
//                  <input
//                      type="password"
//                      placeholder="Confirm Password"
//                      value={confirmPassword}
//                      onChange={(e) => setConfirmPassword(e.target.value)}
//                      className="mb-4 p-2 border rounded"
//                  />
//                  <input
//                      type="email"
//                      placeholder="Email"
//                      value={email}
//                      onChange={(e) => setEmail(e.target.value)}
//                      className="mb-4 p-2 border rounded"
//                  />
//                  <input
//                      type="tel"
//                      placeholder="Mobile Number"
//                      value={mobileNo}
//                      onChange={(e) => setMobileNo(e.target.value)}
//                      className="mb-4 p-2 border rounded"
//                  />
//                  <select
//                      value={role}
//                     onChange={(e) => setRole(e.target.value)}
//                     className="mb-4 p-2 border rounded"
//                 >
//                      <option value="">Select Role</option>
//                      <option value="attendee">Attendee</option>
//                    <option value="organizer">Organizer</option>
//                     <option value="place-provider">Place Provider</option>
//                     <option value="sponsor">Sponsor</option>
//                  </select>
//                 <button type="submit" className="p-2 bg-blue-500 text-white rounded">
//                     Register
//                  </button>
//              </form>
//       {showSuccessPopup && (
//         <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-4 rounded shadow">
//             <h2 className="text-xl font-bold">Registration Successful!</h2>
//             <p>You have successfully registered. Redirecting to your dashboard...</p>
//           </div>
//         </div>
//       )}
//     </>
//  );
// };

// export default RegisterForm;


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
 const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Define showSuccessPopup state
 const { setUser } = useUser();
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await api.post('/register', { username, password, role, email, mobileNo });
      const { userId_new, role_new } = response.data; // Adjusted to match the backend response
      setUser({ id: userId_new, role: role_new }) // Update the user's state in the context
      console.log("User ID:", userId_new, "Role:", role_new);
      setShowSuccessPopup(true); // Show the success popup
      setTimeout(() => {
        navigate('/');
        setShowSuccessPopup(false); // Hide the success popup after a delay
      }, 3000); // Delay in milliseconds
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please try again.');
    }
 };

 return (
    <>
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
                 <input
                     type="password"
                     placeholder="Confirm Password"
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     className="mb-4 p-2 border rounded"
                 />
                 <input
                     type="email"
                     placeholder="Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="mb-4 p-2 border rounded"
                 />
                 <input
                     type="tel"
                     placeholder="Mobile Number"
                     value={mobileNo}
                     onChange={(e) => setMobileNo(e.target.value)}
                     className="mb-4 p-2 border rounded"
                 />
                 <select
                     value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="mb-4 p-2 border rounded"
                >
                     <option value="">Select Role</option>
                     <option value="attendee">Attendee</option>
                   <option value="organizer">Organizer</option>
                    <option value="place-provider">Place Provider</option>
                    <option value="sponsor">Sponsor</option>
                 </select>
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                    Register
                 </button>
             </form>
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
