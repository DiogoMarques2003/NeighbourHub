import IAddressesRepository from '@repositories/IAddressesRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IServiceRequestsRepository from '@repositories/IServiceRequestsRepository';
import IServicesRepository from '@repositories/IServicesRepository';
import IDeleteServiceRequestsDTO from './IDeleteServiceRequestsDTO';
import AppError from '@errors/AppError';
import { STATUS_REQ_PENDING } from '@constants/status';

export default class DeleteServiceRequestsCase {
  constructor(
    private servicesRepository: IServicesRepository,
    private condominiumsRepository: ICondominiumsRepository,
    private addressRepository: IAddressesRepository,
    private serviceRequestRepository: IServiceRequestsRepository
  ) {}

  async execute(data: IDeleteServiceRequestsDTO) {
    const { condominiumId, serviceId, serviceRequestId, userId } = data;

    const condominium = await this.condominiumsRepository.findById(condominiumId);
    if (!condominium) throw new AppError('Condomínio não encontrado', 404);

    const address = await this.addressRepository.getByUserAndCond(userId, condominiumId);
    if (!address) throw new AppError('Não podes apagar este pedido de serviço', 403);

    const service = await this.servicesRepository.findById(serviceId);
    if (!service) throw new AppError('Serviço não encontrado', 404);
    if (service.condominiumId !== condominiumId) throw new AppError('Serviço não encontrado', 404);

    const serviceRequest = await this.serviceRequestRepository.findById(serviceRequestId);
    if (!serviceRequest) throw new AppError('Pedido de serviço não encontrado', 404);
    if (serviceRequest.status != STATUS_REQ_PENDING ) throw new AppError('Não é possivel apagar pedidos com estado diferente de "pendente" ', 400);
    if (serviceRequest.serviceId !== serviceId) throw new AppError('Pedido de serviço não encontrado', 404);
    if (service.ownerId !== userId  && userId !== serviceRequest.userId ) throw new AppError('Não podes apagar este pedido de serviço', 403);

    return this.serviceRequestRepository.delete(serviceRequestId);
  }
}
