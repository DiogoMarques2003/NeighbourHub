import { Prisma, PrismaClient } from '@prismaClient/client';
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

  countByOrderID(id: string): Promise<number> {
    return this.prisma.budgets.count({ where: { orderId: id } });
  }

  createMany(budgets: Budgets[]): Promise<Prisma.BatchPayload> {
    return this.prisma.budgets.createMany({ data: budgets });
  }

  async getBudgetsByOrderIdWithVotes(orderId: string): Promise<GetVotingDetailsResponse['budgets']> {
    const data = await this.prisma.budgets.findMany({
      where: { orderId },
      select: {
        id: true,
        description: true,
        amount: true,
        createdAt: true,
        _count: {
          select: {
            Votings: { where: { decision: true } },
          },
        },
      },
    });

    return data.map((budget) => ({
      id: budget.id,
      description: budget.description,
      amount: budget.amount,
      createdAt: budget.createdAt,
      votes: budget._count.Votings,
    }));
  }
}
