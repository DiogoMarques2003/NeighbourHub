// services/apiClient.js
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { getToken, removeToken } from '../utils/helperFunctions';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    
  }
});

apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response && error.response.status === 401) {
            const isLoginAttempt = error.config.url.includes('/login');

            if(!isLoginAttempt) {
                removeToken();
                window.location.href = '/login';
            }
            
        }
        return Promise.reject(error);
    }
);

export default apiClient;