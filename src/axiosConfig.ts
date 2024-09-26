// src/axiosConfig.ts
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// Set up an interceptor to handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Clear the token and redirect to login on 401 error
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
