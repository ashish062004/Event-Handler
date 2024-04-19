import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout.jsx';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import CreateEventForm from './components/CreateEventForm';
import Home from './components/Home/Home.jsx';
import About from './components/About/About.jsx';
import Contact from './components/Contact/Contact';
import { UserProvider } from './UserContext.jsx'; // Ensure this path is correct
import OrganizerDashboard from './components/OrganizerDashboard';
import DefaultDashboard from './components/DefaultDashboard';
import SponsorDashboard from './components/SponsorDashboard';
import PlaceProviderDashboard from './components/PlaceProviderDashboard';
import Profile from './components/Profile';


const App = () => {
 return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="organizer-dashboard" element={<OrganizerDashboard />} />
            <Route path="default-dashboard" element={<DefaultDashboard />} />
            <Route path="sponsor-dashboard" element={<SponsorDashboard />} />
            <Route path="place-provider-dashboard" element={<PlaceProviderDashboard />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="profile" element={<Profile />} />
            <Route path="events" element={<EventList />} />
            <Route path="event/:id" element={<EventDetails />} />
            <Route path="create-event" element={<CreateEventForm />} />
          </Route>
          <Route path="*" element={<DefaultDashboard />} />
        </Routes>
      </Router>
    </UserProvider>
 );
};

ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
    <App />
 </React.StrictMode>,
);
