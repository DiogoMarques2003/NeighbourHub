import AreaReservations from '@entities/AreaReservations';

export default interface IAreaReservationsRepository {
  findById(id: string): Promise<AreaReservations | null>;
  create(areaReservation: AreaReservations): Promise<AreaReservations>;
  checkReservationDate(startDate: Date, endDate: Date, areaId: string): Promise<AreaReservations>;
}
