import Orders from '@entities/Orders';
import { Prisma } from '@prisma/client';

export default interface IOrdersRepository {
  findById(id: string): Promise<Orders | null>;
  create(order: Orders): Promise<Orders>;
  update(order: Orders): Promise<Orders>;
  countWithFilters(filters?: Prisma.OrdersWhereInput): Promise<number>;
  getWithPagination(
    pageSize: number,
    pageNumber: number,
    filters?: Prisma.OrdersWhereInput
  ): Promise<Orders[]>;
}
