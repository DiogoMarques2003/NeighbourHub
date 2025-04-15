export default interface IGetOrdersWorkDTO {
  condominiumId: string;
  orderId: string;
  userId: string;
  pageSize: number;
  pageNumber: number;
  status?: string;
  hasReport?: boolean;
}
