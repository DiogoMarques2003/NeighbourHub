export default interface IOrdersCreateDTO {
  title: string;
  description: string;
  urgency: string;
  lastOrder?: string;
  userId: string;
  condominiumId: string;
}
