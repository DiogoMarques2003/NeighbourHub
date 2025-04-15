import Fine from '@entities/Fine';
import { Prisma } from '@prismaClient/index';

export default interface IFineRepository {
  findById(id: string): Promise<Fine | null>;
  findByAreaReservationId(areaReservationId: string): Promise<Fine | null>;
  create(fine: Fine): Promise<Fine>;
  update(fine: Fine): Promise<Fine>;
  delete(id: string): Promise<boolean>;
  countWithFilter(filters?: Prisma.FineWhereInput): Promise<number>;
  getWithPagination(
    pageSize: number,
    pageNumber: number,
    filters?: Prisma.FineWhereInput,
    orderBy?: Prisma.FineOrderByWithRelationInput
  ): Promise<Fine[]>;
}
