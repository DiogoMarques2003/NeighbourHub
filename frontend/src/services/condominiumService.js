import apiClient from './apiClient';
import { encodeQueryData } from '../utils/helperFunctions';
import { data } from 'react-router-dom';

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

};

export default condominiumService;
