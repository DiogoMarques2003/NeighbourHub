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
}
