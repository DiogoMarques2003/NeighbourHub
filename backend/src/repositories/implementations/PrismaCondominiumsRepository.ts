import Condominiums from '@entities/Condominiums';
import { PrismaClient } from '@prisma/client';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';

export default class PrismaCondominiumsRepository
  implements ICondominiumsRepository
{
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findById(id: string): Promise<Condominiums | null> {
    return this.prisma.condominiums.findUnique({ where: { id } });
  }

  findByEmail(email: string): Promise<Condominiums | null> {
    return this.prisma.condominiums.findUnique({ where: { email } });
  }

  create(condominium: Condominiums): Promise<Condominiums> {
    return this.prisma.condominiums.create({ data: condominium });
  }

  async deleteById(id: string): Promise<boolean> {
    return !!(await this.prisma.condominiums.delete({ where: { id } }));
  }

  edit(condominium: Condominiums): Promise<Condominiums> {
    return this.prisma.condominiums.update({
      where: { id: condominium.id },
      data: condominium,
    });
  }
}
