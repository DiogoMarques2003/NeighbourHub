export default interface OrdersWithUserData {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  urgency: string;
  status: string;
  lastOrder?: string;
  startDate?: Date;
  endDate?: Date;
  votingDeadline?: Date;
  condominiumId: string;
  user: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    foto?: string;
  };
}
