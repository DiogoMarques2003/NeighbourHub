import ServiceRequests from '@entities/ServiceRequests';
import { PrismaClient } from '@prismaClient/client';
import IServiceRequestsRepository from '@repositories/IServiceRequestsRepository';
import ServiceRequestsWithServiceData from 'src/@types/ServiceRequestsWithServiceData';
import ServiceRequestsWithUserData from 'src/@types/ServiceRequestsWithUserData';

export default class PrismaServiceRequestsRepository implements IServiceRequestsRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findById(id: string): Promise<ServiceRequests | null> {
    return this.prisma.serviceRequests.findUnique({ where: { id } });
  }

  findByIdWithUserData(id: string): Promise<ResponseServiceRequestWithUserData | null> {
    return this.prisma.serviceRequests.findUnique({
      where: { id },
      select: {
        id: true,
        requestDate: true,
        status: true,
        serviceId: true,
        userId: true,
        user: {
          select : {
            name: true,
            email: true,
            phoneNumber: true,
            foto: true
          }
        }
      },
    });
  }

  async getWithPagination(userId: string, condominiumId: string, pageSize: number, pageNumber: number): Promise<ServiceRequestsWithServiceData[]> {
    const data = await this.prisma.serviceRequests.findMany({
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
      select: {
        id: true,
        requestDate: true,
        status: true,
        service: {
          select: {
            id: true,
            name: true,
            description: true,
            cost: true,
            owner: {
              select: {
                name: true,
                email: true,
                phoneNumber: true,
                foto: true
              }
            }
          }
        }
      },
      orderBy: { requestDate: 'desc' },
    });

    return data.map((item) => {
      return {
        id: item.id,
        requestDate: item.requestDate,
        status: item.status,
        service: {
            id: item.service.id,
            name: item.service.name,
            description: item.service.description,
            cost: item.service.cost
        },
        owner: {
          name: item.service.owner.name,
          email: item.service.owner.email,
          phoneNumber: item.service.owner.phoneNumber,
          foto: item.service.owner.foto
        }
      };
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
