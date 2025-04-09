export default interface ICondominiumPaymentsCreateDTO {
  value: number;
  date: Date;
  paymentType: number;
  addressId: string;
  areaReservationId?: string;
  condominiumId: string;
  userId: string;
}
