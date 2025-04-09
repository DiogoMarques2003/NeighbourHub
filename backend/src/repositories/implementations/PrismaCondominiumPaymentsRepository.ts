import CondominiumPayments from '@entities/CondominiumPayments';
import { Prisma, PrismaClient } from '@prismaClient/client';
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

  update(condominiumPayment: CondominiumPayments): Promise<CondominiumPayments> {
    return this.prisma.condominiumPayments.update({
      where: { id: condominiumPayment.id },
      data: condominiumPayment,
    });
  }

  async delete(id: string): Promise<Boolean> {
    return !!(await this.prisma.condominiumPayments.delete({ where: { id } }));
  }

  countWithFilters(findByEmail?: Prisma.CondominiumPaymentsWhereInput): Promise<number> {
    return this.prisma.condominiumPayments.count({ where: findByEmail });
  }

  getWithPagination(pageSize: number, pageNumber: number, filters?: Prisma.CondominiumPaymentsWhereInput, orderBy?: Prisma.CondominiumPaymentsOrderByWithRelationInput): Promise<CondominiumPayments[]> {
    return this.prisma.condominiumPayments.findMany({
      where: filters,
      orderBy,
      take: pageSize,
      skip: pageSize * (pageNumber - 1),
    });
  }
}
