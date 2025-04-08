import CondominiumPayments from '@entities/CondominiumPayments';
import { PrismaClient } from '@prismaClient/client';
import ICondominiumPaymentsRepository from '@repositories/ICondominiumPaymentsRepository';

export default class PrismaCondominiumPaymentsRepository implements ICondominiumPaymentsRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findById(id: string): Promise<CondominiumPayments | null> {
    return this.prisma.condominiumPayments.findUnique({ where: { id } });
  }

  create(condominiumPayment: CondominiumPayments): Promise<CondominiumPayments> {
    return this.prisma.condominiumPayments.create({ data: condominiumPayment });
  }
}
