import ServiceReviews from '@entities/ServiceReviews';
import { Prisma } from '@prismaClient/index';

export default interface IServiceReviewsRepository {
  findById(id: string): Promise<ServiceReviews | null>;
  create(serviceReview: ServiceReviews): Promise<ServiceReviews>;
  findByReq(id: string): Promise<ServiceReviews | null>;
  update(serviceReview: ServiceReviews): Promise<ServiceReviews>;
  countWithFilters(filters?: Prisma.ServiceReviewsWhereInput): Promise<number>;
  findWithFilters(
    pageNumber: number,
    pageSize: number,
    filters?: Prisma.ServiceReviewsWhereInput,
    orderBy?: Prisma.ServiceReviewsOrderByWithRelationInput
  ): Promise<ServicesReviewsWithUserData[]>;
}
