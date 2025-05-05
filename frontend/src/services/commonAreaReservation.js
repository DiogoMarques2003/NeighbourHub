import apiClient from './apiClient';
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
  createFine: async ({ amount, reason, userId, areaReservationId, commonAreaId, condominiumId }) => {
    try {
      const response = await apiClient.post(
        `/condominium/${condominiumId}/commonarea/${commonAreaId}/reservation/${areaReservationId}/fine`,
        {
          amount,
          reason,
          userId,
          areaReservationId,
          commonAreaId,
          condominiumId,
        }
      );
      return response.data;
    } catch (error) {
      return { error: error?.response?.data?.message || 'Erro ao criar multa' };
    }
  },
  updateReservationStatus: async ({ condominiumId, commonAreaId, reservationId, status }) => {
    try {
      const res = await apiClient.put(
        `/condominium/${condominiumId}/commonarea/${commonAreaId}/reservation/${reservationId}`,
        { status }
      );
      return res.data;
    } catch (error) {
      return { error: error?.response?.data?.message || 'Erro ao atualizar status' };
    }
  },
  updateReservationData: async ({ condominiumId, commonAreaId, reservationId, body }) => {
    try {
      const response = await apiClient.put(
        `/condominium/${condominiumId}/commonarea/${commonAreaId}/reservation/${reservationId}`,
        body
      );
      return response.data;
    } catch (error) {
      return { error: error?.response?.data?.message || 'Erro ao atualizar reserva' };
    }
  },
  getFineFromReservation: async ({ condominiumId, commonAreaId, reservationId }) => {
    try {
      const res = await apiClient.get(
        `/condominium/${condominiumId}/commonarea/${commonAreaId}/reservation/${reservationId}/fine`
      );
      return res.data;
    } catch (error) {
      return { error: error?.response?.data?.message || 'Erro ao buscar multa associada' };
    }
  },
};

export default commonAreaReservation;
