export default interface IAreaReservationsEditDTO {
  condominiumId: string;
  areaId: string;
  reservationId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  status: string;
}
