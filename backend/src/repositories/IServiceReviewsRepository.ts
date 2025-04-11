import ServiceReviews from '@entities/ServiceReviews';

export default interface IServiceReviewsRepository {
  findById(id: string): Promise<ServiceReviews | null>;
  create(serviceReview: ServiceReviews): Promise<ServiceReviews>;
  findByReq(id: string): Promise<ServiceReviews | null>;
}
