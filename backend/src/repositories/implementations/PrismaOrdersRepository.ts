import Orders from '@entities/Orders';
import { PrismaClient } from '@prisma/client';
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
}
