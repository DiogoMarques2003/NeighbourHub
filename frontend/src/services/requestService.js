import apiClient from './apiClient';

const postRequestService = {
    
postRequestService: async (condominiumId, serviceId) => {
    try {
      const response = await apiClient.post(`/condominium/${condominiumId}/services/${serviceId}/request`);
      return response?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || 'Erro ao requisitar serviço' };
    }
  }
}

  export default postRequestService;