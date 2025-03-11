import { PrismaClient } from '@prisma/client';
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
}
