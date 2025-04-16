import IAddressesRepository from '@repositories/IAddressesRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IServiceRequestsRepository from '@repositories/IServiceRequestsRepository';
import IServicesRepository from '@repositories/IServicesRepository';
import IEditServiceRequestsDTO from './IEditServiceRequestsDTO';
import AppError from '@errors/AppError';

export default class EditServiceRequestsCase {
  constructor(
    private servicesRepository: IServicesRepository,
    private condominiumsRepository: ICondominiumsRepository,
    private addressRepository: IAddressesRepository,
    private serviceRequestRepository: IServiceRequestsRepository
  ) {}

  async execute(data: IEditServiceRequestsDTO) {
    const { condominiumId, serviceId, serviceRequestId, status, userId } = data;

    const condominium = await this.condominiumsRepository.findById(condominiumId);
    if (!condominium) throw new AppError('Condomínio não encontrado', 404);

    const address = await this.addressRepository.getByUserAndCond(userId, condominiumId);
    if (!address) throw new AppError('Não podes editar este pedido de serviço', 403);

    const service = await this.servicesRepository.findById(serviceId);
    if (!service) throw new AppError('Serviço não encontrado', 404);
    if (service.condominiumId !== condominiumId) throw new AppError('Serviço não encontrado', 404);
    if (service.ownerId !== userId) throw new AppError('Não podes editar este pedido de serviço', 403);

    const serviceRequest = await this.serviceRequestRepository.findById(serviceRequestId);
    if (!serviceRequest) throw new AppError('Pedido de serviço não encontrado', 404);
    if (serviceRequest.serviceId !== serviceId) throw new AppError('Pedido de serviço não encontrado', 404);

    if (status) serviceRequest.status = status;

    return this.serviceRequestRepository.update(serviceRequest);
  }
}
