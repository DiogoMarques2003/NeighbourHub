export default interface ICondominiumPaymentsEditDTO {
    value?: number;
    date?: Date;
    paymentType?: number;
    areaReservationId?: string;
    condominiumId: string;
    userId: string;
    condominiumPaymentId: string;
}