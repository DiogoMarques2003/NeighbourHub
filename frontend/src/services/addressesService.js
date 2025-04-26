import apiClient from './apiClient';
import { encodeQueryData } from '@utils/helperFunctions';

const addressesService = {
  getAddressesByCondominium: async (condominiumID, queryStringObj) => {
    try {
      const response = await apiClient.get(`/condominium/${condominiumID}/address${encodeQueryData(queryStringObj)}`);
      return response?.data;
    } catch (error) {
      return { error: error?.response?.data?.message };
    }
  },

  getAddressUserData: async (condominiumID, residentID) => {
    try {
      const response = await apiClient.get(`/condominium/${condominiumID}/address/${residentID}`);
      return response?.data;
    } catch (error) {
      return { error: error?.response?.data?.message };
    }
  },

  createAddressByCondominium: async (condominiumID, addressData) => {
    try{
      const response = await apiClient.post(`/condominium/${condominiumID}/address`, addressData)
      return response?.data;
    }catch (error) {
      return { error: error?.response?.data?.message };
    }
  },

  editCondominium: async (condominiumID, addressID, addressData) => {
    try {
      const response = await apiClient.put(`/condominium/${condominiumID}/address/${addressID}`, addressData);
      return response?.data;
    } catch (err) {
      return { error: err?.response?.data?.message };
    }
  },

  deleteAddress: async (condominiumID, addressID) => {
    try {
      const response = await apiClient.delete(`/condominium/${condominiumID}/address/${addressID}`);
      return response?.data;
    } catch (err) {
      return { error: err?.response?.data?.message };
    }
  }

};

export default addressesService;
