import ServiceRequests from '@entities/ServiceRequests';

export default interface IServiceRequestsRepository {
  findById(id: string): Promise<ServiceRequests | null>;
  create(serviceRequest: ServiceRequests): Promise<ServiceRequests>;
}
