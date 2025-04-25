import ServiceReviews from '@entities/ServiceReviews';
import { Prisma, PrismaClient } from '@prismaClient/client';
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

  findByReq(id: string): Promise<ServiceReviews | null> {
    return this.prisma.serviceReviews.findFirst({ where: { serviceRequestId: id } });
  }

  async getReviewByService(id: string): Promise<number> {
    const agregation = await this.prisma.serviceReviews.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        serviceRequest: {
          serviceId: id,
        },
      },
    });

    return agregation._avg.rating || 0;
  }

  update(serviceReview: ServiceReviews): Promise<ServiceReviews> {
    return this.prisma.serviceReviews.update({ where: { id: serviceReview.id }, data: serviceReview });
  }

  countWithFilters(filters?: Prisma.ServiceReviewsWhereInput): Promise<number> {
    return this.prisma.serviceReviews.count({ where: filters });
  }

  async findWithFilters(
    pageNumber: number,
    pageSize: number,
    filters?: Prisma.ServiceReviewsWhereInput,
    orderBy?: Prisma.ServiceReviewsOrderByWithRelationInput,
  ): Promise<ServicesReviewsWithUserData[]> {
    const data = await this.prisma.serviceReviews.findMany({
      where: filters,
      orderBy: orderBy,
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
        serviceRequest: {
          select: {
            user: {
              select: {
                name: true,
                foto: true,
              },
            },
          },
        },
      },
    });

    return data.map((item) => {
      return {
        id: item.id,
        rating: item.rating,
        comment: item.comment,
        createdAt: item.createdAt,
        user: {
          name: item.serviceRequest.user.name,
          foto: item.serviceRequest.user.foto,
        },
      };
    });
  }
}
