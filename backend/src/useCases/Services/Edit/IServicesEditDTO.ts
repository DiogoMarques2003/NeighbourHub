export default interface IServicesEditDTO {
  id: string;
  name: string;
  description: string;
  cost?: number;
  ownerId: string;
  condId: string;
}
