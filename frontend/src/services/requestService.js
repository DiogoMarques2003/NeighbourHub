import apiClient from './apiClient';

const requestService = {

  postRequestService: async (condominiumId, serviceId) => {
    try {
      const response = await apiClient.post(`/condominium/${condominiumId}/services/${serviceId}/request`);
      return response?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || 'Erro ao requisitar serviço' };
    }
  },
  getServiceRequests: async (condominiumId, serviceId) => {
    try {
      const response = await apiClient.get(`/condominium/${condominiumId}/services/${serviceId}/received-requests`);
      return response?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || 'Erro ao obter serviços requisitados' };
    }
  },
};

export default requestService;