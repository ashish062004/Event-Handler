import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Adjust the base URL as necessary
  headers: {
    'Content-Type': 'application/json',
  },
});

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export { api, setAuthToken };