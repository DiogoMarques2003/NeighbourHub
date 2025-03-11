import Users from '@entities/Users';
import { PrismaClient } from '@prisma/client';
import IUsersRepository from '@repositories/IUsersRepository';

export default class PrismaUsersRepository implements IUsersRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findById(id: string): Promise<Users | null> {
    return this.prisma.users.findUnique({ where: { id } });
  }

  findByEmail(email: string): Promise<Users | null> {
    return this.prisma.users.findUnique({ where: { email } });
  }

  create(user: Users): Promise<Users> {
    return this.prisma.users.create({ data: user });
  }
}
