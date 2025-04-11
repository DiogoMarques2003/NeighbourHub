import { getToken, setToken } from '../utils/helperFunctions';
import apiClient from './apiClient';

const authService = {
    
    login: async (credentials) => {
        try {
            const response = await apiClient.post('/login', credentials);
            return response?.data;
        } catch(error) {
            return { error: error?.response?.data?.message };
        }
    },

    register: async (userData) => {
        try {
            const response = await apiClient.post('/register', userData);
            return response?.data;
        } catch(error) {
            return { error: error?.response?.data?.message };
        }
    },
 
    getCurrentUser: async (token) => {
        if(token) {
            setToken(token);
        } else if(!getToken()) {
            return null;
        }

        try {
            const response = await apiClient.get('/@me');
            return response?.data;
        } catch(error) {
            return { error: error?.response?.data?.message };
        }
    }
}

export default authService;