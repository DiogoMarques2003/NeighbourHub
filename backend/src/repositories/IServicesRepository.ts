import Services from '@entities/Services';

export default interface IServicesRepository {
  findById(id: string): Promise<Services | null>;
  create(service: Services): Promise<Services>;
}
