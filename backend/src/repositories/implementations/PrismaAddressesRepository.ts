import { PrismaClient } from '@prisma/client';
import Addresses from '@entities/Addresses';
import IAddressesRepository from '@repositories/IAddressesRepository';

export default class PrismaAddressesRepository implements IAddressesRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  countByCondID(condId: string): Promise<number> {
    return this.prisma.addresses.count({ where: { condominiumId: condId } });
  }
  getCondAddressWithPagination(
    condId: string,
    pageNumber: number,
    pageSize: number
  ): Promise<Addresses[]> {
    return this.prisma.addresses.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where: { condominiumId: condId },
      orderBy: { createdAT: 'desc' },
    });
  }

  findById(id: string): Promise<Addresses | null> {
    return this.prisma.addresses.findUnique({ where: { id } });
  }

  create(address: Addresses): Promise<Addresses> {
    return this.prisma.addresses.create({ data: address });
  }

  getByUserAndCond(userId: string, condId: string): Promise<Addresses | null> {
    return this.prisma.addresses.findFirst({
      where: { userId, condominiumId: condId },
    });
  }
  async getAllUsersEmails(condominiumId: string): Promise<string[]> {
    const usersEmails = await this.prisma.addresses.findMany({
      where: { condominiumId },
      select: { user: { select: { email: true } } },
    });
    return [...new Set(usersEmails.map((u) => u.user.email))];
  }
  update(address: Addresses): Promise<Addresses> {
    return this.prisma.addresses.update({
      where: { id: address.id },
      data: address,
    });
  }
}
