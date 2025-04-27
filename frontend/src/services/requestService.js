import apiClient from './apiClient';

const postRequestService = {
  postRequestService: async (condominiumId, serviceId) => {
    try {
      const response = await apiClient.post(`/condominium/${condominiumId}/services/${serviceId}/request`);
      return response?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || 'Erro ao requisitar serviço' };
    }
  },
  updateServiceRequestStatus: async (condominiumId, serviceId, serviceRequestId, newStatus) => {
    try {
      const response = await apiClient.put(
        `/condominium/${condominiumId}/services/${serviceId}/request/${serviceRequestId}`,
        {
          status: newStatus,
        }
      );
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      return { error: error?.response?.data?.message || 'Erro ao atualizar status.' };
    }
  },
  getServiceRequestById: async (condominiumId, serviceId, serviceRequestId) => {
    try {
      const response = await apiClient.get(
        `/condominium/${condominiumId}/services/${serviceId}/request/${serviceRequestId}`
      );
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      return { error: error?.response?.data?.message || 'Erro ao buscar pedido.' };
    }
  },
};

export default postRequestService;
