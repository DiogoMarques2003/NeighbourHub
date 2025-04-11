import Services from '@entities/Services';
import { PrismaClient } from '@prismaClient/client';
import IServicesRepository from '@repositories/IServicesRepository';
import ServicesWithUserData from 'src/@types/ServicesWithUserData';

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

  findByIdWithUserData(id: string): Promise<ServicesWithUserData | null> {
    return this.prisma.services.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        cost: true,
        condominiumId: true,
        createdAt: true,
        owner: {
          select: {
            id: true,
            email: true,
            phoneNumber: true,
            foto: true,
          },
        },
      },
    });
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

  update(service: Services): Promise<Services> {
    return this.prisma.services.update({ where: { id: service.id }, data: service });
  }
}
