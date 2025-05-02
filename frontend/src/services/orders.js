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
  createOrder: async (condominiumId, orderData) => {
    try {
      const response = await apiClient.post(`/condominium/${condominiumId}/orders`, orderData);
      return response?.data;
    } catch (error) {
      return { error: error?.response?.data?.message };
    }
  },
  getOrderById: async (condominiumId, orderId) => {
    try {
      const response = await apiClient.get(`/condominium/${condominiumId}/orders/${orderId}`);
      return response?.data;
    } catch (error) {
      return { error: error?.response?.data?.message };
    }
  },
  createOrderVote: async (condominiumId, orderId, voteData) => {
    try {
      const response = await apiClient.post(`/condominium/${condominiumId}/orders/${orderId}/voting`, voteData);
      return response?.data;
    } catch (error) {
      return { error: error?.response?.data?.message };
    }
  },
  updateOrder: async (condominiumId, orderId, orderData) => {
    try {
      const response = await apiClient.put(`/condominium/${condominiumId}/orders/${orderId}`, orderData);
      return response?.data;
    } catch (error) {
      return {
        error: error?.response?.data?.message || 'Erro ao atualizar pedido',
      };
    }
  },
};

export default ordersService;
