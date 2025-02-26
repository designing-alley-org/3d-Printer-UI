import axios from 'axios';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get the token dynamically
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Set up a response interceptor to handle errors
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