import { PrismaClient } from '@prismaClient/client';
import AreaReservations from '@entities/AreaReservations';
import IAreaReservationsRepository from '@repositories/IAreaReservationsRepository';
import { STATUS_RESERV_CANCELED } from '@constants/status';

export default class PrismaAreaReservationsRepository implements IAreaReservationsRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findById(id: string): Promise<AreaReservations | null> {
    return this.prisma.areaReservations.findUnique({ where: { id } });
  }

  /* getAll(condominiumID: string, pageSize: number, pageNumber: number, status?: string): Promise<AreaReservationsWithAreaData[]> {
    return this.prisma.areaReservations.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where: {
         area:{ condominiumId : condominiumID },
         status
      },
      select: {
        id: true,
        startDate: true,
        endDate: true,
        status: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            phoneNumber: true,
            foto: true
          }
        },
        area : {
          select : {
            id: true,
            name: true,
            cost: true,
            startSchedule: true,
            endSchedule: true,
            images: true,
            type: true
          }
        }
      },
      orderBy: { startDate: 'asc'}
    })
  } */

  async getAll(condominiumID: string, pageSize: number, pageNumber: number, status?: string): Promise<{ data: AreaReservationsWithAreaData[], nRecords: number }> {
    const where = {
      area: { condominiumId: condominiumID },
      ...(status && { status })
    };
  
    const [data, total] = await this.prisma.$transaction([
      this.prisma.areaReservations.findMany({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        where,
        select: {
          id: true,
          startDate: true,
          endDate: true,
          status: true,
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              phoneNumber: true,
              foto: true
            }
          },
          area : {
            select : {
              id: true,
              name: true,
              cost: true,
              startSchedule: true,
              endSchedule: true,
              images: true,
              type: true
            }
          }
        },
        orderBy: { startDate: 'asc' },
      }),
      this.prisma.areaReservations.count({ where }),
    ]);
  
    return {
      data,
      nRecords: total
    };
  }

  /* getByUser(condominiumID: string, userID: string, pageSize: number, pageNumber: number, status?: string): Promise<AreaReservationsWithAreaData[]> {
    return this.prisma.areaReservations.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where: {
         area:{ condominiumId : condominiumID },
         status
      },
      select: {
        id: true,
        startDate: true,
        endDate: true,
        status: true,
        area : {
          select : {
            id: true,
            name: true,
            cost: true,
            startSchedule: true,
            endSchedule: true,
            images: true,
            type: true
          }
        }
      },
      orderBy: { startDate: 'asc'}
    })
  } */

  
  async getByUser(
    condominiumID: string,
    userID: string,
    pageSize: number,
    pageNumber: number,
    status?: string
  ): Promise<{ data: AreaReservationsWithAreaData[], nRecords: number }> {
    const where = {
      userId: userID,
      area: { condominiumId: condominiumID },
      ...(status && { status }),
    };
  
    const [data, total] = await this.prisma.$transaction([
      this.prisma.areaReservations.findMany({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        where,
        select: {
          id: true,
          startDate: true,
          endDate: true,
          status: true,
          area: {
            select: {
              id: true,
              name: true,
              cost: true,
              startSchedule: true,
              endSchedule: true,
              images: true,
              type: true,
            },
          },
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              phoneNumber: true,
              foto: true
            }
          }
        },
        orderBy: { startDate: 'asc' },
      }),
      this.prisma.areaReservations.count({ where }),
    ]);
  
    return {
      data,
      nRecords: total
    };
  }


  create(areaReservation: AreaReservations): Promise<AreaReservations> {
    return this.prisma.areaReservations.create({ data: areaReservation });
  }

  edit(areaReservation: AreaReservations): Promise<AreaReservations> {
    return this.prisma.areaReservations.update({
      where: { id: areaReservation.id },
      data: areaReservation,
    });
  }

  checkReservationDate(
    startDate: Date,
    endDate: Date,
    areaId: string,
    excludeUserId?: string
  ): Promise<AreaReservations> {
    return this.prisma.areaReservations.findFirst({
      where: {
        areaId,
        ...(excludeUserId && { userId: { not: excludeUserId } }),
        status: { not: STATUS_RESERV_CANCELED },
        OR: [
          { startDate: { lte: endDate }, endDate: { gte: startDate } },
          { startDate: { gte: startDate }, endDate: { lte: endDate } },
        ],
      },
    });
  }

  update(areaReservation: AreaReservations): Promise<AreaReservations> {
    return this.prisma.areaReservations.update({
      where: { id: areaReservation.id },
      data: areaReservation,
    });
  }

  async delete(id: string): Promise<boolean> {
    return !!(await this.prisma.areaReservations.delete({ where: { id } }));
  }
}
