import { PrismaClient } from '@prisma/client';
import Addresses from '@entities/Addresses';
import IAddressesRepository from '@repositories/IAddressesRepository';

export default class PrismaAddressesRepository implements IAddressesRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findById(id: string): Promise<Addresses | null> {
    return this.prisma.addresses.findUnique({ where: { id } });
  }
  create(address: Addresses): Promise<Addresses> {
    return this.prisma.addresses.create({ data: address });
  }
}
