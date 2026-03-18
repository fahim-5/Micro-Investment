import axios from 'axios';
import { getToken, clearToken } from '../utils/secureStorage';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor - add auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add timestamp to prevent caching for certain requests
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now()
      };
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => {
    // You can transform response data here
    return response.data;
  },
  (error) => {
    if (!error.response) {
      // Network error
      console.error('Network Error:', error.message);
      return Promise.reject({
        message: 'Network error. Please check your internet connection.',
        isNetworkError: true
      });
    }

    const { status, data } = error.response;
    
    // Handle specific HTTP status codes
    switch (status) {
      case 401:
        // Unauthorized - clear token and redirect to login
        clearToken();
        window.location.href = '/login?session=expired';
        break;
        
      case 403:
        // Forbidden - user doesn't have permission
        console.error('Forbidden:', data.message || 'You do not have permission');
        break;
        
      case 404:
        // Not found
        console.error('Not Found:', data.message || 'Resource not found');
        break;
        
      case 422:
        // Validation error
        console.error('Validation Error:', data.errors || data.message);
        break;
        
      case 429:
        // Too many requests
        console.error('Rate Limit:', 'Too many requests. Please wait.');
        break;
        
      case 500:
        // Server error
        console.error('Server Error:', 'Something went wrong on our end.');
        break;
        
      default:
        console.error('API Error:', data.message || 'An error occurred');
    }
    
    return Promise.reject({
      status,
      message: data?.message || 'An error occurred',
      errors: data?.errors,
      ...data
    });
  }
);

// Helper function to set auth token manually (if needed)
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// API methods wrapper for better error handling
export const apiRequest = {
  get: (url, config = {}) => api.get(url, config),
  post: (url, data, config = {}) => api.post(url, data, config),
  put: (url, data, config = {}) => api.put(url, data, config),
  patch: (url, data, config = {}) => api.patch(url, data, config),
  delete: (url, config = {}) => api.delete(url, config),
};

export default api;