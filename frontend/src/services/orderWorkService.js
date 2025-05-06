import apiClient from '@services/apiClient.js';

const orderWorkService = {
  getOrderWork: async (condominiumId, orderId) => {
    try {
      const response = await apiClient.get(`/condominium/${condominiumId}/orders/${orderId}/work`);
      return response?.data || [];
    } catch (error) {
      return { error: error?.response?.data?.message };
    }
  }
}

export default orderWorkService;