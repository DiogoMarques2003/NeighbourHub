import ServiceRequests from '@entities/ServiceRequests';

export default interface IServiceRequestsRepository {
  findById(id: string): Promise<ServiceRequests | null>;
  create(serviceRequest: ServiceRequests): Promise<ServiceRequests>;
  update(serviceRequest: ServiceRequests): Promise<ServiceRequests>;
  delete(id: string): Promise<boolean>;
}
