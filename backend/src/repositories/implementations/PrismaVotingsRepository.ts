import Votings from '@entities/Votings';
import { PrismaClient } from '@prismaClient/client';
import IVotingsRepository from '@repositories/IVotingsRepository';

export default class PrismaVotingsRepository implements IVotingsRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findByOrderAndUser(orderID: string, userID: string): Promise<Votings | null> {
    return this.prisma.votings.findFirst({
      where: {
        userID,
        orderID,
      },
    });
  }

  upsert(voting: Votings): Promise<Votings> {
    return this.prisma.votings.upsert({
      where: {
        userID_orderID: {
          userID: voting.userID,
          orderID: voting.orderID,
        },
      },
      update: {
        decision: voting.decision,
        budgetID: voting.budgetID,
      },
      create: {
        decision: voting.decision,
        userID: voting.userID,
        orderID: voting.orderID,
        budgetID: voting.budgetID,
      },
    });
  }

  async countByOrder(orderId: string): Promise<{ upVotes: number; downVotes: number; }> {
    const votes = await this.prisma.votings.groupBy({
      by: ['decision'],
      where: {
        orderID: orderId,
      },
      _count: {
        decision: true,
      },
    });

    const upVotes = votes.find((vote) => vote.decision === true)?._count.decision || 0;
    const downVotes = votes.find((vote) => vote.decision === false)?._count.decision || 0;
    return { upVotes, downVotes };
  }
}
