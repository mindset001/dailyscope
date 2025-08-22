import axios from 'axios';
const {user} = require('@/app/context/AuthContext');
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      // Get token directly from localStorage (only in browser)
      const token = localStorage.getItem('authToken') || user?.token;
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn('No token found in localStorage');
      }
    }
    // If we're on the server side, we can't access localStorage
    // You might want to handle server-side authentication differently

    // For FormData, let browser set Content-Type
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor to handle token refresh or errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // Clear invalid token
      localStorage.removeItem('token');
      // Optionally redirect to login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;