import Fine from '@entities/Fine';
import { PrismaClient } from '@prisma/client';
import IFineRepository from '@repositories/IFineRepository';

export default class PrismaFineRepository implements IFineRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findById(id: string): Promise<Fine | null> {
    return this.prisma.fine.findUnique({ where: { id } });
  }

  create(fine: Fine): Promise<Fine> {
    return this.prisma.fine.create({ data: fine });
  }
}
