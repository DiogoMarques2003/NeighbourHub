import apiClient from './apiClient';

const ordersService = {
  getOrders: async () => {
    try {
      const response = await apiClient.get(`/condominium/${condominiumId}/orders${encodeQueryData(queryStringObj)}`);
      return response?.data || [];
    } catch (error) {
      return { error: error?.response?.data?.message };
    }
  },
};

export default ordersService;
