import apiClient from './apiClient';
import { encodeQueryData } from '../utils/helperFunctions';

const ordersService = {
  getOrders: async (condominiumId, queryStringObj) => {
    try {
      const response = await apiClient.get(`/condominium/${condominiumId}/orders${encodeQueryData(queryStringObj)}`);
      return response?.data || [];
    } catch (error) {
      return { error: error?.response?.data?.message };
    }
  },
};

export default ordersService;
