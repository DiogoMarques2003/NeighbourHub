import Orders from '@entities/Orders';
import { Prisma, PrismaClient } from '@prismaClient/client';
import IOrdersRepository from '@repositories/IOrdersRepository';
import OrdersWithUserData from 'src/@types/OrdersWithUserData';

export default class PrismaOrdersRepository implements IOrdersRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findById(id: string): Promise<Orders | null> {
    return this.prisma.orders.findUnique({ where: { id } });
  }

  findByIdWithUserData(id: string): Promise<OrdersWithUserData | null> {
    return this.prisma.orders.findUnique({
      where: { id },
      select: {
        id: true,
        description: true,
        createdAt: true,
        urgency: true,
        status: true,
        lastOrder: true,
        startDate: true,
        endDate: true,
        votingDeadline: true,
        condominiumId: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            foto: true,
          },
        },
      },
    });
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

  getWithPagination(pageSize: number, pageNumber: number, filters?: Prisma.OrdersWhereInput): Promise<Orders[]> {
    return this.prisma.orders.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where: filters,
      orderBy: { createdAt: 'desc' },
    });
  }
}
