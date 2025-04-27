import ServiceRequests from '@entities/ServiceRequests';
import ServiceRequestsWithServiceData from 'src/@types/ServiceRequestsWithServiceData';
import ServiceRequestsWithUserData from 'src/@types/ServiceRequestsWithUserData';

export default interface IServiceRequestsRepository {
  findById(id: string): Promise<ServiceRequests | null>;
  findByIdWithUserData(id: string): Promise<ResponseServiceRequestWithUserData | null>;
  getWithPagination(userId: string, condominiumId: string, pageSize: number, pageNumber: number): Promise<ServiceRequestsWithServiceData[]>;
  getReceivedWithPagination(userId: string, condominiumId: string, serviceID: string, pageSize: number, pageNumber: number): Promise<ServiceRequestsWithUserData[]>;
  create(serviceRequest: ServiceRequests): Promise<ServiceRequests>;
  update(serviceRequest: ServiceRequests): Promise<ServiceRequests>;
  delete(id: string): Promise<boolean>;
  count(userId: string, condominiumId: string): Promise<number>;
  countReceived(userId: string, condominiumId: string, serviceID: string): Promise<number>;
}
