import { PrismaClient } from '@prisma/client';
import Budgets from '@entities/Budgets';
import IBudgetsRepository from '@repositories/IBudgetsRepository';

export default class PrismaBudgetsRepository implements IBudgetsRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findById(id: string): Promise<Budgets | null> {
    return this.prisma.budgets.findUnique({ where: { id } });
  }

  create(budget: Budgets): Promise<Budgets> {
    return this.prisma.budgets.create({ data: budget });
  }
}
