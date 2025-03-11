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

  create(service: Services): Promise<Services> {
    return this.prisma.services.create({ data: service });
  }
}
