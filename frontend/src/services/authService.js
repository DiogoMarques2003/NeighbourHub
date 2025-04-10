import axios from 'axios';
import { getToken, removeToken } from '../utils/helperFunctions';

const API_URL = 'https://neighbourhub.diogomarques.dev/api'

const authService = {
    
    login: async (credentials) => {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
        
    },

    register: async (userData) => {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    },

    getCurrentUser: async () => {
        const userToken = getToken();
        if (!userToken) {
            return null;
        }
        
        const response = await axios.get(`${API_URL}/@me`);
        return response.data;
    },

    setupInterceptors: (axiosInstance) => {
        axiosInstance.interceptors.request.use(
            (config) => {
                const token = getToken();
                if(token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            },
            (error) => {
                Promise.reject(error);
            }
        );

        axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if(error.response && error.response.status === 401) {
                    removeToken();
                    window.location.href = '/login';
                }
                Promise.reject(error);
            }
        );
    }
}

export default authService;