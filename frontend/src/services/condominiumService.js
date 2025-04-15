import apiClient from './apiClient';
import { encodeQueryData } from '../utils/helperFunctions';

const condominiumService = {
  getConduminiumByUser: async (queryStringObj) => {
    try {
      const response = await apiClient.get(`/condominium${encodeQueryData(queryStringObj)}`);
      return response?.data;
    } catch (error) {
      return { error: error?.response?.data?.message };
    }
  },

  getConduminiumByID: async (condominiumID) => {
    try {
      const response = await apiClient.get(`/condominium/${condominiumID}`);
      return response?.data;
    } catch (error) {
      return { error: error?.response?.data?.message };
    }
  },

};

export default condominiumService;
