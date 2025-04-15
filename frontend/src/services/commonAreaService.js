import apiClient from './apiClient';

const commonAreaService = {
  getCommonAreasByCondominiumId: async (condominiumId) => {
    try {
      const response = await apiClient.get(`/condominium/${condominiumId}/commonarea`);
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
  }
};

export default commonAreaService;