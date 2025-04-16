import ServiceRequests from '@entities/ServiceRequests';
import { PrismaClient } from '@prismaClient/client';
import IServiceRequestsRepository from '@repositories/IServiceRequestsRepository';

export default class PrismaServiceRequestsRepository implements IServiceRequestsRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findById(id: string): Promise<ServiceRequests | null> {
    return this.prisma.serviceRequests.findUnique({ where: { id } });
  }

  create(serviceRequest: ServiceRequests): Promise<ServiceRequests> {
    return this.prisma.serviceRequests.create({ data: serviceRequest });
  }

  update(serviceRequest: ServiceRequests): Promise<ServiceRequests> {
    return this.prisma.serviceRequests.update({ where: { id: serviceRequest.id }, data: serviceRequest });
  }

  async delete(id: string): Promise<boolean> {
    return !!(await this.prisma.serviceRequests.delete({ where: { id } }));
  }
}
