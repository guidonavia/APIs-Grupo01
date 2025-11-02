import axios from 'axios';
import { API_CONFIG } from '../shared/constants';

// Create axios instance with complete base URL
const api = axios.create({
  baseURL: `${API_CONFIG.SERVER_URL}${API_CONFIG.API_BASE_PATH}`,  // This will be http://localhost:8080/api
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Set to true if your backend requires credentials
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      // Redirect to login page or handle as needed
    }
    return Promise.reject(error);
  }
);

export default api;