export default interface ICondominiumPaymentsGetDTO {
  userId: string;
  condominiumId: string;
  pageSize?: number;
  pageNumber?: number;
  minValue?: number;
  maxValue?: number;
  startDate?: Date;
  endDate?: Date;
  paymentType?: number;
  addressId?: string;
  sortBy?: string;
  sortOrder?: string;
}
