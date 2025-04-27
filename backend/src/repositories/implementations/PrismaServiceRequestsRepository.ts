import ServiceRequests from '@entities/ServiceRequests';
import { PrismaClient } from '@prismaClient/client';
import IServiceRequestsRepository from '@repositories/IServiceRequestsRepository';
import ServiceRequestsWithUserData from 'src/@types/ServiceRequestsWithUserData';

export default class PrismaServiceRequestsRepository implements IServiceRequestsRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findById(id: string): Promise<ServiceRequests | null> {
    return this.prisma.serviceRequests.findUnique({ where: { id } });
  }

  getWithPagination(userId: string, condominiumId: string, pageSize: number, pageNumber: number): Promise<ServiceRequests[]> {
    return this.prisma.serviceRequests.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where: { 
        userId,
        service: {
          condominium: {
            id: condominiumId
          }
        }
      },
      orderBy: { requestDate: 'desc' },
    });
  }

  getReceivedWithPagination(userId: string, condominiumId: string, pageSize: number, pageNumber: number): Promise<ServiceRequestsWithUserData[]> {
    return this.prisma.serviceRequests.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where: {
        service: {
          ownerId: userId,
          condominium: {
            id: condominiumId
          }
        }
      },
      select: {
        id: true,
        requestDate: true,
        status: true,
        user: {
          select : {
            name: true,
            email: true,
            phoneNumber: true,
            foto: true
          }
        }
      },
      orderBy: { requestDate: 'desc' },
    });
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

  count(userId: string, condominiumId: string): Promise<number> {
    return this.prisma.serviceRequests.count({
      where: {
        service: {
          ownerId: userId,
          condominium: {
            id: condominiumId
          }
        }
      },
    });
  }
}
