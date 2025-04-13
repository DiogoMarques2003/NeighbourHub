import Services from '@entities/Services';
import ServicesWithUserData from 'src/@types/ServicesWithUserData';

export default interface IServicesRepository {
  findById(id: string): Promise<Services | null>;
  findByCond(condId: string): Promise<Services[]>;
  findByIdWithUserData(id: string): Promise<ServicesWithUserData | null>;
  countByCondId(condId: string): Promise<number>;
  create(service: Services): Promise<Services>;
  update(service: Services): Promise<Services>;
  getWithPagination(pageSize: number, pageNumber: number, condId: string): Promise<Services[]>;
  delete(id: string): Promise<Boolean>;
}
