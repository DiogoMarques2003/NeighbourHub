export default interface IOrdersGetDTO {
  userId: string;
  condominiumId: string;
  status?: string;
  urgency?: string;
  pageSize: number;
  pageNumber: number;
}
