import apiClient from './apiClient';
import { encodeQueryData } from '../utils/helperFunctions';

const condominiumService = {
  getCondominiumByUser: async (queryStringObj) => {
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

  postCreateCondominium: async (condData) => {
    try{
      const response = await apiClient.post(`/condominium`, condData)
      return response?.data;
    }catch (error) {
      return { error: error?.response?.data?.message };
    }
  },

  editCondominium: async (condominiumId, condominiumData) => {
    try {
      const response = await apiClient.put(`/condominium/${condominiumId}`, condominiumData);
      return response?.data;
    } catch (err) {
      return { error: err?.response?.data?.message };
    }
  },

  deleteCondominium: async (condominiumId) => {
    try {
      const response = await apiClient.delete(`/condominium/${condominiumId}`);
      return response?.data;
    } catch (err) {
      return { error: err?.response?.data?.message };
    }
  }

};

export default condominiumService;
