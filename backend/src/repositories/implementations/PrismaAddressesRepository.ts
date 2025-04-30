import { PrismaClient } from '@prismaClient/client';
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

  findByIdWithUser(id: string): Promise<AddressesWithUserData | null> {
    return this.prisma.addresses.findUnique({
      where: { id },
      select: {
        id: true,
        country: true,
        city: true,
        street: true,
        houseNumber: true,
        postalCode: true,
        houseType: true,
        createdAT: true,
        condominiumId: true,
        user: {
          select: {
            id: true,
            email: true,
            phoneNumber: true,
            name: true,
            foto: true,
          },
        },
      },
    });
  }

  getCondAddressWithPagination(condId: string, pageNumber: number, pageSize: number): Promise<AddressesWithUserData[]> {
    return this.prisma.addresses.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where: { condominiumId: condId },
      orderBy: { createdAT: 'desc' },
      select: {
        id: true,
        country: true,
        city: true,
        street: true,
        houseNumber: true,
        postalCode: true,
        houseType: true,
        createdAT: true,
        condominiumId: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            foto: true,
          },
        },
      },
    });
  }

  findById(id: string): Promise<Addresses | null> {
    return this.prisma.addresses.findUnique({ where: { id } });
  }

  create(address: Addresses): Promise<Addresses> {
    return this.prisma.addresses.create({ data: address });
  }

  async delete(id: string): Promise<Boolean> {
    return !!(await this.prisma.addresses.delete({ where: { id } }));
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

  async countByUserId(userId: string): Promise<number> {
    const grouped = await this.prisma.addresses.groupBy({
      by: ['condominiumId'],
      where: {
        userId: userId,
      },
      _count: {
        condominiumId: true,
      },
    });

    return grouped.length;
  }

  async getByUserId(userId: string, pageNumber: number, pageSize: number): Promise<CondominiumGetByUserResponse[]> {
    const data = await this.prisma.addresses.findMany({
      where: { userId },
      distinct: ['condominiumId'],
      orderBy: { createdAT: 'desc' },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      select: {
        country: true,
        city: true,
        postalCode: true,
        condominium: {
          select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
          },
        },
      },
    });

    return data.map((address) => {
      const { condominium, ...addressData } = address;
      const { id, ...otherCondominiumdData } = condominium;
      return {
        ...addressData,
        condominiumId: condominium.id,
        ...otherCondominiumdData,
      };
    });
  }
}
