import Votings from '@entities/Votings';
import { PrismaClient } from '@prisma/client';
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

  create(voting: Votings): Promise<Votings> {
    return this.prisma.votings.create({ data: voting });
  }
}
