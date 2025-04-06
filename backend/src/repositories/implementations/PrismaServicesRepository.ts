import Services from '@entities/Services';
import { PrismaClient } from '@prisma/client';
import IServicesRepository from '@repositories/IServicesRepository';

export default class PrismaServicesRepository implements IServicesRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findById(id: string): Promise<Services | null> {
    return this.prisma.services.findUnique({ where: { id } });
  }

  findByCond(condId: string): Promise<Services[]> {
    return this.prisma.services.findMany({ where: { condominiumId: condId } });
  }

  countByCondId(condId: string): Promise<number> {
    return this.prisma.services.count({ where: { condominiumId: condId } });
  }

  getWithPagination(pageSize: number, pageNumber: number, condId: string): Promise<Services[]> {
    return this.prisma.services.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where: { condominiumId: condId },
      orderBy: { createdAt: 'desc' },
    });
  }

  create(service: Services): Promise<Services> {
    return this.prisma.services.create({ data: service });
  }
}
