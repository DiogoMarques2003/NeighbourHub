import apiClient from '@services/apiClient.js';
import { encodeQueryData } from '@utils/helperFunctions';

const orderWorkService = {
  getOrderWork: async (condominiumId, orderId, queryStringObj) => {
    try {
      const response = await apiClient.get(`/condominium/${condominiumId}/orders/${orderId}/work${encodeQueryData(queryStringObj)}`);
      return response?.data;
    } catch (error) {
      return { error: error?.response?.data?.message };
    }
  },
  createOrderWork: async (condominiumId, orderId, workData) => {
    try {
      const response = await apiClient.post(`/condominium/${condominiumId}/orders/${orderId}/work`, workData);
      return response?.data;
    } catch (error) {
      return { error: error?.response?.data?.message };
    }
  },
};

export default orderWorkService;
