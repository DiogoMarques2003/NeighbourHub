import apiClient from './apiClient';
import { encodeQueryData } from '@utils/helperFunctions';

const servicesService = {
  postCreateService: async (serviceData, condId) => {
    try {
      const response = await apiClient.post(`/condominium/${condId}/services`, serviceData);
      return response?.data;
    } catch (error) {
      return { error: error?.response?.data?.message };
    }
  },
  getServiceById: async (condominiumId, serviceId) => {
    try {
      const response = await apiClient.get(`/condominium/${condominiumId}/services/${serviceId}`);
      return response?.data;
    } catch (error) {
      return { error: error?.response?.data?.message };
    }
  },
  getServices: async (condominiumId, queryString) => {
    try {
      const response = await apiClient.get(`/condominium/${condominiumId}/services${encodeQueryData(queryString)}`);
      return response?.data;
    } catch (error) {
      return { error: error?.response?.data?.message };
    }
  }
};

export default servicesService;
