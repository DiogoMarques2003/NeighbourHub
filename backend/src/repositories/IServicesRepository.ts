import Services from '@entities/Services';
import ServicesWithUserData from 'src/@types/ServicesWithUserData';
import ServicesWithAvgReview from '../@types/ServicesWithAvgReview';

export default interface IServicesRepository {
  findById(id: string): Promise<Services | null>;
  findByCond(condId: string): Promise<Services[]>;
  findByIdWithUserData(id: string): Promise<ServicesWithUserData | null>;
  countByCondIdFiltered(condId: string, minReview?: number, maxReview?: number, ownerId?: string): Promise<number>;
  create(service: Services): Promise<Services>;
  update(service: Services): Promise<Services>;
  getWithPagination(pageSize: number, pageNumber: number, condId: string, minReview?: number, maxReview?: number, ownerId?: string): Promise<ServicesWithAvgReview[]>;
  delete(id: string): Promise<Boolean>;
}
