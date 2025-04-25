export default interface ServicesWithUserData {
  id: string;
  name: string;
  description: string;
  cost?: number;
  condominiumId: string;
  createdAt: Date;
  owner: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    foto?: string;
  };
}
