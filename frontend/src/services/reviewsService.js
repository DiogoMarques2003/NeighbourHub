import apiClient from './apiClient';

const reviewsService = {
  getReviewsByService: async (condominiumId, serviceId, page = 1, pageSize = 4, sortBy = 'rating', sortOrder = 'desc') => {
    try {
      const response = await apiClient.get(
        `/condominium/${condominiumId}/services/${serviceId}/reviews`, {
          params: {
            sortBy,
            sortOrder,
            pageNumber: page,
            pageSize
          }
        }
      );
      return response?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || 'Erro ao buscar reviews' };
    }
  }
};

export default reviewsService;
