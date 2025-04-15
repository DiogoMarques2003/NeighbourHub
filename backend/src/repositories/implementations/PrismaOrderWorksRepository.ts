import OrderWorks from '@entities/OrderWorks';
import { PrismaClient } from '@prismaClient/client';
import IOrderWorksRepository from '@repositories/IOrderWorksRepository';

export default class PrismaOrderWorksRepository implements IOrderWorksRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findById(id: string): Promise<OrderWorks | null> {
    return this.prisma.orderWorks.findUnique({ where: { id } });
  }

  create(orderWork: OrderWorks): Promise<OrderWorks> {
    return this.prisma.orderWorks.create({ data: orderWork });
  }

  update(orderWork: OrderWorks): Promise<OrderWorks> {
    return this.prisma.orderWorks.update({ where: { id: orderWork.id }, data: orderWork });
  }

  async delete(id: string): Promise<boolean> {
    return !!(await this.prisma.orderWorks.delete({ where: { id } }));
  }

  countWithFilters(orderId: string, status?: string, hasReport?: boolean): Promise<number> {
    return this.prisma.orderWorks.count({
      where: {
        orderId,
        ...(status && { status }),
        reportFile: hasReport === undefined ? undefined : hasReport ? { not: null } : null,
      },
    });
  }

  findWithFilters(
    orderId: string,
    pageSize: number,
    pageNumber: number,
    status?: string,
    hasReport?: boolean
  ): Promise<OrderWorks[]> {
    return this.prisma.orderWorks.findMany({
      where: {
        orderId,
        ...(status && { status }),
        reportFile: hasReport === undefined ? undefined : hasReport ? { not: null } : null,
      },
      take: pageSize,
      skip: pageSize * (pageNumber - 1),
      orderBy: { postedAt: 'desc' },
    });
  }
}
