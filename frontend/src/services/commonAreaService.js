import { encodeQueryData } from '@utils/helperFunctions';
import apiClient from './apiClient';

const commonAreaService = {
  getCommonAreasByCondominiumId: async (condominiumId, queryStringObj) => {
    try {
      const response = await apiClient.get(`/condominium/${condominiumId}/commonarea${encodeQueryData(queryStringObj)}`);
      return response?.data || [];
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
  },
  
  getCommonAreaById: async (condominiumId, areaId) => {
    try {
      const response = await apiClient.get(`/condominium/${condominiumId}/commonarea/${areaId}`);
      return response?.data;
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
  },

  createCommonArea: async (condominiumId, commonAreaData) => {
    try {
      const response = await apiClient.post(`/condominium/${condominiumId}/commonarea`, commonAreaData);
      return response?.data;
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
  },

  updateCommonArea: async (condominiumId, areaId, commonAreaData) => {
    try {
      const response = await apiClient.put(`/condominium/${condominiumId}/commonarea/${areaId}`, commonAreaData);
      return response?.data;
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
  },

  deleteCommonArea: async (condominiumId, areaId) => {
    try {
      const response = await apiClient.delete(`/condominium/${condominiumId}/commonarea/${areaId}`);
      return response?.data;
    } catch (error) {
        return { error: error?.response?.data?.message };
    }
  },
};

export default commonAreaService;