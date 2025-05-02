export default interface IOrdersEditDTO {
  condominiumId: string;
  orderId: string;
  userId: string;
  description?: string;
  urgency?: string;
  status?: string;
}
