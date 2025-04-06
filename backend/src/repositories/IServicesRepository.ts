import Services from '@entities/Services';

export default interface IServicesRepository {
  findById(id: string): Promise<Services | null>;
  findByCond(condId: string): Promise<Services[]>;
  countByCondId(condId: string): Promise<number>;
  create(service: Services): Promise<Services>;
  getWithPagination(pageSize: number, pageNumber: number, condId: string): Promise<Services[]>;
}
