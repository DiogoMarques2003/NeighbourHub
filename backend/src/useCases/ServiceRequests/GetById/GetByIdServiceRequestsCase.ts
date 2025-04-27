import IAddressesRepository from '@repositories/IAddressesRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IServiceRequestsRepository from '@repositories/IServiceRequestsRepository';
import IServicesRepository from '@repositories/IServicesRepository';
import IGetByIdServiceRequestsDTO from './IGetByIdServiceRequestsDTO';
import AppError from '@errors/AppError';
import IServiceReviewsRepository from '@repositories/IServiceReviewsRepository';
import generatePathToFile from '@shared/generatePathToFile';

export default class GetByIdServiceRequestsCase {
  constructor(
    private servicesRepository: IServicesRepository,
    private condominiumsRepository: ICondominiumsRepository,
    private addressRepository: IAddressesRepository,
    private serviceRequestRepository: IServiceRequestsRepository,
    private serviceReviewsRepository: IServiceReviewsRepository
  ) {}

  async execute(data: IGetByIdServiceRequestsDTO) {
    const { condominiumId, serviceId, serviceRequestId, userId } = data;

    const condominium = await this.condominiumsRepository.findById(condominiumId);
    if (!condominium) throw new AppError('Condomínio não encontrado', 404);

    const address = await this.addressRepository.getByUserAndCond(userId, condominiumId);
    if (!address) throw new AppError('Não podes ver este pedido de serviço', 403);

    const service = await this.servicesRepository.findById(serviceId);
    if (!service) throw new AppError('Serviço não encontrado', 404);
    if (service.condominiumId !== condominiumId) throw new AppError('Serviço não encontrado', 404);

    const serviceRequest = await this.serviceRequestRepository.findByIdWithUserData(serviceRequestId);
    if (!serviceRequest) throw new AppError('Pedido de serviço não encontrado', 404);
    if (serviceRequest.serviceId !== serviceId) throw new AppError('Pedido de serviço não encontrado', 404);

    if (serviceRequest.userId !== userId && service.ownerId !== userId)
      throw new AppError('Não tens permissão para ver este pedido de serviço', 403);

    if (serviceRequest.user.foto) serviceRequest.user.foto = generatePathToFile(serviceRequest.user.foto);

    const review = await this.serviceReviewsRepository.findByReq(serviceRequestId);

    return { ...serviceRequest, review };
  }
}
