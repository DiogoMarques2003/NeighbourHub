import ServiceReviews from '@entities/ServiceReviews';
import { PrismaClient } from '@prismaClient/client';
import IServiceReviewsRepository from '@repositories/IServiceReviewsRepository';

export default class PrismaServiceReviewsRepository implements IServiceReviewsRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findById(id: string): Promise<ServiceReviews | null> {
    return this.prisma.serviceReviews.findUnique({ where: { id } });
  }

  create(serviceReview: ServiceReviews): Promise<ServiceReviews> {
    return this.prisma.serviceReviews.create({ data: serviceReview });
  }
}
