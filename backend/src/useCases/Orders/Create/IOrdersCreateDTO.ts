export default interface IOrdersCreateDTO {
  description: string;
  urgency: string;
  lastOrder?: string;
  userId: string;
  condominiumId: string;
}
