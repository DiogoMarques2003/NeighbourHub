import Fine from '@entities/Fine';
import { Prisma, PrismaClient } from '@prismaClient/client';
import IFineRepository from '@repositories/IFineRepository';

export default class PrismaFineRepository implements IFineRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findById(id: string): Promise<Fine | null> {
    return this.prisma.fine.findUnique({ where: { id } });
  }

  findByAreaReservationId(areaReservationId: string): Promise<Fine | null> {
    return this.prisma.fine.findFirst({ where: { areaReservationId } });
  }

  create(fine: Fine): Promise<Fine> {
    return this.prisma.fine.create({ data: fine });
  }

  update(fine: Fine): Promise<Fine> {
    return this.prisma.fine.update({ where: { id: fine.id }, data: fine });
  }

  async delete(id: string): Promise<boolean> {
    return !!(await this.prisma.fine.delete({ where: { id } }));
  }

  countWithFilter(filters?: Prisma.FineWhereInput): Promise<number> {
    return this.prisma.fine.count({ where: filters });
  }

  getWithPagination(
    pageSize: number,
    pageNumber: number,
    filters?: Prisma.FineWhereInput,
    orderBy?: Prisma.FineOrderByWithRelationInput
  ): Promise<Fine[]> {
    return this.prisma.fine.findMany({
      where: filters,
      orderBy,
      skip: pageSize * (pageNumber - 1),
      take: pageSize,
    });
  }
}
