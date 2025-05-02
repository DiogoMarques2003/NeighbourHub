import apiClient from './apiClient';
import { encodeQueryData } from '@utils/helperFunctions';
import { data } from 'react-router-dom';

const commonAreaReservation = {
  postCreateReservation: async (reservation, condominiumID, commonAreaId) => {
    try {
      const response = await apiClient.post(
        `/condominium/${condominiumID}/commonarea/${commonAreaId}/reservation`,
        reservation
      );
      return response?.data;
    } catch (error) {
      return { error: error?.response?.data?.message };
    }
  },
  getReservations: async (condID, query) => {
    try {
      const response = await apiClient.get(`/condominium/${condID}/commonarea/reservations`, { params: query });
      return response.data;
    } catch (error) {
      return { error: error?.response?.data?.message || 'Erro ao buscar reservas' };
    }
  },
};

export default commonAreaReservation;
