import { PrismaClient } from '@prismaClient/client';
import AreaReservations from '@entities/AreaReservations';
import IAreaReservationsRepository from '@repositories/IAreaReservationsRepository';

export default class PrismaAreaReservationsRepository implements IAreaReservationsRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findById(id: string): Promise<AreaReservations | null> {
    return this.prisma.areaReservations.findUnique({ where: { id } });
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
  checkReservationDate(startDate: Date, endDate: Date, areaId: string): Promise<AreaReservations> {
    return this.prisma.areaReservations.findFirst({
      where: {
        areaId,
        OR: [
          { startDate: { lte: endDate }, endDate: { gte: startDate } },
          { startDate: { gte: startDate }, endDate: { lte: endDate } },
        ],
      },
    });
  }
}
