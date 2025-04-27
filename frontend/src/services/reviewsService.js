import apiClient from './apiClient';

const reviewsService = {
  getReviewsByService: async (
    condominiumId,
    serviceId,
    page = 1,
    pageSize = 4,
    sortBy = 'rating',
    sortOrder = 'desc'
  ) => {
    try {
      const response = await apiClient.get(`/condominium/${condominiumId}/services/${serviceId}/reviews`, {
        params: {
          sortBy,
          sortOrder,
          pageNumber: page,
          pageSize,
        },
      });
      return response?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || 'Erro ao buscar reviews' };
    }
  },
  updateReviewByRequest: async (condominiumId, serviceId, requestId, reviewId, reviewData) => {
    try {
      const response = await apiClient.put(
        `/condominium/${condominiumId}/services/${serviceId}/request/${requestId}/review/${reviewId}`,
        reviewData
      );
      console.log('Response:', response.data);
      return response?.data;
    } catch (err) {
      return { error: err?.response?.data?.message || 'Erro ao atualizar a review' };
    }
  },
  createServiceReview: async (condominiumId, serviceId, serviceRequestId, reviewData) => {
    try {
      const response = await apiClient.post(
        `/condominium/${condominiumId}/services/${serviceId}/request/${serviceRequestId}/review`,
        reviewData
      );
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      return { error: error?.response?.data?.message || 'Erro ao enviar review.' };
    }
  },
};

export default reviewsService;
