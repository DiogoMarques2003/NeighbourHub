import apiClient from './apiClient';
import { encodeQueryData } from '../utils/helperFunctions';

const votesService = {
  getVote: async (condominiumId, orderId, queryStringObj) => {
    try {
      const response = await apiClient.get(
        `/condominium/${condominiumId}/orders/${orderId}/voting${encodeQueryData(queryStringObj)}`
      );
      return response?.data || [];
    } catch (error) {
      return { error: error?.response?.data?.message };
    }
  },
  createVote: async (condominiumId, orderId, voteData) => {
    try {
      const response = await apiClient.post(`/condominium/${condominiumId}/orders/${orderId}/vote`, voteData);
      return response?.data;
    } catch (error) {
      return { error: error?.response?.data?.message };
    }
  },
};

export default votesService;
