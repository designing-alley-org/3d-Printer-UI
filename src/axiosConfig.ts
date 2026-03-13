import axios from 'axios';
import { getCookie, removeCookie, setCookie } from './utils/cookies';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_AWS_URL as string,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie('token'); // Get the token dynamically
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Flag to prevent multiple refresh requests
let isRefreshing = false;
// Queue to store requests that failed due to 401
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Set up a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and not a retry, and not the refresh token endpoint itself
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('refresh-token')
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getCookie('refreshToken');

        // Call refresh token endpoint
        const response = await api.post('refresh-token', {
          refreshToken,
        });

        const { token, refreshToken: newRefreshToken } = response.data;

        // Update cookies
        setCookie('token', token);
        setCookie('refreshToken', newRefreshToken);

        // Update headers and retry original request
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        originalRequest.headers['Authorization'] = `Bearer ${token}`;

        processQueue(null, token);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Clear tokens and redirect on refresh failure
        removeCookie('token');
        removeCookie('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Fallback for other errors or if refresh failed logic above didn't catch (shouldn't happen due to catch block)
    if (
      error.response?.status === 401 &&
      originalRequest.url?.includes('refresh-token')
    ) {
      removeCookie('token');
      removeCookie('refreshToken');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
