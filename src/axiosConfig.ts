import { getCookie, removeCookie, setCookie } from './utils/cookies';

// ... (existing axios create)

// ... (existing request interceptor)

// Set up a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and not a retry, and not the refresh token endpoint itself
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh-token')
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = getCookie('refreshToken');

        // Call refresh token endpoint
        // Note: Using a separate axios instance or fetch might be safer to avoid interceptor loops,
        // but checking the URL guards against it.
        const response = await api.post('/auth/refresh-token', {
          refreshToken,
        });

        const { token, refreshToken: newRefreshToken } = response.data;

        // Update cookies
        setCookie('token', token);
        setCookie('refreshToken', newRefreshToken);

        // Update headers and retry original request
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        originalRequest.headers['Authorization'] = `Bearer ${token}`;

        return api(originalRequest);
      } catch (refreshError) {
        // Clear tokens and redirect on refresh failure
        removeCookie('token');
        removeCookie('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Fallback for other errors or if refresh failed logic above didn't catch (shouldn't happen due to catch block)
    if (
      error.response?.status === 401 &&
      originalRequest.url?.includes('/auth/refresh-token')
    ) {
      removeCookie('token');
      removeCookie('refreshToken');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
