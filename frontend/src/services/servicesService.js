import apiClient from './apiClient';
import { encodeQueryData } from '../utils/helperFunctions';

const servicesService = {
    postCreateService: async (serviceData, condId) => {
        try{
            const response = await apiClient.post(`/condominium/${condId}/services`, serviceData)
            return response?.data;
        }catch (error) {
            return { error: error?.response?.data?.message };
        }
    }
}

export default servicesService;