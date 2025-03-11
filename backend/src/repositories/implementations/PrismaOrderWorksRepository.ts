import OrderWorks from '@entities/OrderWorks';
import { PrismaClient } from '@prisma/client';
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
}
