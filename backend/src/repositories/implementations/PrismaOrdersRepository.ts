import Orders from '@entities/Orders';
import { Prisma, PrismaClient } from '@prisma/client';
import IOrdersRepository from '@repositories/IOrdersRepository';

export default class PrismaOrdersRepository implements IOrdersRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findById(id: string): Promise<Orders | null> {
    return this.prisma.orders.findUnique({ where: { id } });
  }

  create(order: Orders): Promise<Orders> {
    return this.prisma.orders.create({ data: order });
  }

  update(order: Orders): Promise<Orders> {
    return this.prisma.orders.update({ where: { id: order.id }, data: order });
  }

  countWithFilters(filters?: Prisma.OrdersWhereInput): Promise<number> {
    return this.prisma.orders.count({ where: filters });
  }

  getWithPagination(
    pageSize: number,
    pageNumber: number,
    filters?: Prisma.OrdersWhereInput
  ): Promise<Orders[]> {
    return this.prisma.orders.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where: filters,
      orderBy: { createdAt: 'desc' },
    });
  }
}
