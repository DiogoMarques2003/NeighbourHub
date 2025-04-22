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

  async getBudgetsByOrderIdWithVotes(
    orderId: string,
    condominiumId: string
  ): Promise<GetVotingDetailsResponse['budgets']> {
    const budgets = await this.prisma.budgets.findMany({
      where: { orderId },
      select: {
        id: true,
        description: true,
        amount: true,
        createdAt: true,
      },
    });

    const result = [];
    for await (const budget of budgets) {
      const votings = await this.prisma.votings.findMany({
        where: {
          orderID: orderId,
          budgetID: budget.id,
          decision: true,
        },
        select: {
          userID: true,
        },
      });

      let votes = 0;
      for await (const vote of votings) {
        const addressCount = await this.prisma.addresses.count({
          where: {
            userId: vote.userID,
            condominiumId,
          },
        });

        votes += addressCount;
      }

      result.push({
        id: budget.id,
        description: budget.description,
        amount: budget.amount,
        createdAt: budget.createdAt,
        votes,
      });
    }

    return result;
  }
}
