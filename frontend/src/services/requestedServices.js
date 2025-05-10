import apiClient from './apiClient';
import { encodeQueryData } from '@utils/helperFunctions';

const requestedServicesService = {
  getRequestedServices: async (condominiumId, queryString) => {
    try {
      const response = await apiClient.get(
        `/condominium/${condominiumId}/services-requests${encodeQueryData(queryString)}`
      );
      return response?.data;
    } catch (error) {
      return { error: error?.response?.data?.message };
    }
  },
};

export default requestedServicesService;
