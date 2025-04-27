import ServiceRequests from '@entities/ServiceRequests';
import ServiceRequestsWithUserData from 'src/@types/ServiceRequestsWithUserData';

export default interface IServiceRequestsRepository {
  findById(id: string): Promise<ServiceRequests | null>;
  getWithPagination(userId: string, condominiumId: string, pageSize: number, pageNumber: number): Promise<ServiceRequests[]>;
  getReceivedWithPagination(userId: string, condominiumId: string, pageSize: number, pageNumber: number): Promise<ServiceRequestsWithUserData[]>;
  create(serviceRequest: ServiceRequests): Promise<ServiceRequests>;
  update(serviceRequest: ServiceRequests): Promise<ServiceRequests>;
  delete(id: string): Promise<boolean>;
  count(userId: string, condominiumId: string): Promise<number>;
}
