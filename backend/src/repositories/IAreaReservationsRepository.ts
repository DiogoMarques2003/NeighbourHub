import AreaReservations from '@entities/AreaReservations';

export default interface IAreaReservationsRepository {
  findById(id: string): Promise<AreaReservations | null>;
  create(areaReservation: AreaReservations): Promise<AreaReservations>;
}
