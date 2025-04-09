import Orders from '@entities/Orders';
import { Prisma } from '@prismaClient/client';
import OrdersWithUserData from 'src/@types/OrdersWithUserData';

export default interface IOrdersRepository {
  findById(id: string): Promise<Orders | null>;
  findByIdWithUserData(id: string): Promise<OrdersWithUserData | null>;
  create(order: Orders): Promise<Orders>;
  update(order: Orders): Promise<Orders>;
  countWithFilters(filters?: Prisma.OrdersWhereInput): Promise<number>;
  getWithPagination(pageSize: number, pageNumber: number, filters?: Prisma.OrdersWhereInput): Promise<Orders[]>;
}
