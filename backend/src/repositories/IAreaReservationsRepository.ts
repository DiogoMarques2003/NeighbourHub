import AreaReservations from '@entities/AreaReservations';

export default interface IAreaReservationsRepository {
  findById(id: string): Promise<AreaReservations | null>;
  /* getAll(condominiumID: string, pageSize: number, pageNumber: number, status?: string): Promise<AreaReservationsWithAreaData[]>; */
  /* getByUser(condominiumID: string, userID: string, pageSize: number, pageNumber: number, status?: string): Promise<AreaReservationsWithAreaData[]> */
  getAll(condominiumID: string, pageSize: number, pageNumber: number, status?: string): Promise<{ data: AreaReservationsWithAreaData[], nRecords: number }>
  getByUser(condominiumID: string, userID: string, pageSize: number, pageNumber: number, status?: string): Promise<{ data: AreaReservationsWithAreaData[], nRecords: number }>
  create(areaReservation: AreaReservations): Promise<AreaReservations>;
  checkReservationDate(startDate: Date, endDate: Date, areaId: string, excludeUserId?: string): Promise<AreaReservations>;
  update(areaReservation: AreaReservations): Promise<AreaReservations>;
  delete(id: string): Promise<boolean>;
}
