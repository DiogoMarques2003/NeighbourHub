import AppError from '@errors/AppError';
import IAddressesRepository from '@repositories/IAddressesRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IServiceRequestsRepository from '@repositories/IServiceRequestsRepository';
import IServiceReviewsRepository from '@repositories/IServiceReviewsRepository';
import IServicesRepository from '@repositories/IServicesRepository';
import IServiceReviewsEditDTO from './IServiceReviewsEditDTO';

export default class ServiceReviewsEditCase {
  constructor(
    private condominiumRepository: ICondominiumsRepository,
    private servicesRepository: IServicesRepository,
    private servicesRequestsRepository: IServiceRequestsRepository,
    private serviceReviewsRepository: IServiceReviewsRepository,
    private addressRepository: IAddressesRepository
  ) {}

  async execute(data: IServiceReviewsEditDTO) {
    const { comment, condominiumId, rating, serviceRequestId, serviceId, userId, serviceReviewId } = data;

    const condominium = await this.condominiumRepository.findById(condominiumId);
    if (!condominium) throw new AppError('Condominio não existe', 404);

    const address = await this.addressRepository.getByUserAndCond(userId, condominiumId)
    if (!address) throw new AppError('Não és morador deste condomínio', 404);

    const service = await this.servicesRepository.findById(serviceId);
    if (!service) throw new AppError('Serviço não existe', 404);
    if (service.condominiumId !== condominiumId) throw new AppError('Serviço não existe neste condomínio', 404);

    const serviceRequest = await this.servicesRequestsRepository.findById(serviceRequestId);
    if (!serviceRequest) throw new AppError('Pedido não existe', 404);
    if (serviceRequest.serviceId !== serviceId) throw new AppError('Pedido não existe para este serviço', 404);
    if (serviceRequest.userId !== userId) throw new AppError('Não podes editar esta avaliação', 403);

    const serviceReview = await this.serviceReviewsRepository.findById(serviceReviewId);
    if (!serviceReview) throw new AppError('Avaliação não existe', 404);
    if (serviceReview.serviceRequestId !== serviceRequestId) throw new AppError('Avaliação não existe para este pedido', 404);
    
    if (comment) serviceReview.comment = comment;
    if (typeof rating === 'number') serviceReview.rating = rating;

    return this.serviceReviewsRepository.update(serviceReview)
  }
}
