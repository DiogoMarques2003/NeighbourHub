import AppError from '@errors/AppError';
import IAddressesRepository from '@repositories/IAddressesRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IServiceReviewsRepository from '@repositories/IServiceReviewsRepository';
import IServicesRepository from '@repositories/IServicesRepository';
import IServicesReviewDTO from './IServicesReviewDTO';
import IServiceRequestsRepository from '@repositories/IServiceRequestsRepository';
import { STATUS_REQ_COMPLETED } from '@constants/status';
import ServiceReviews from '@entities/ServiceReviews';

export default class ServicesReviewCase {
  constructor(
    private servicesRepository: IServicesRepository,
    private condominiumsRepository: ICondominiumsRepository,
    private addressRepository: IAddressesRepository,
    private serviceReviewRepo: IServiceReviewsRepository,
    private serviceReqRepo: IServiceRequestsRepository
  ) {}

  async execute(data: IServicesReviewDTO) {
    const { condId, serviceId, userId, comment, rating, requestId } = data;

    const check = await this.serviceReviewRepo.findByReq(requestId);
    if (check) throw new AppError('Só pode fazer 1 avaliação por serviço', 400);

    const condDb = await this.condominiumsRepository.findById(condId);
    if (!condDb) throw new AppError('Condominio inexistente', 404);

    //Valida User no condominio
    const userCondDb = await this.addressRepository.getByUserAndCond(userId, condId);
    if (!userCondDb && condDb.adminId !== userId) throw new AppError('Não faz parte do condomínio', 403);

    const serviceConDb = await this.servicesRepository.findById(serviceId);
    if (!serviceConDb) throw new AppError('Serviço não existe', 404);

    if (serviceConDb.ownerId === userId) throw new AppError('Este serviço é seu', 403);

    const reqConDb = await this.serviceReqRepo.findById(requestId);
    if (!reqConDb) throw new AppError('Serviço não encontrado', 404);
    if (reqConDb.status !== STATUS_REQ_COMPLETED) throw new AppError('Serviço não terminado', 400);

    if (userId !== reqConDb.userId) throw new AppError('Não foste tu a requisitar o serviço', 403);

    const review = new ServiceReviews({
      comment,
      rating,
      serviceRequestId: requestId,
    });

    await this.serviceReviewRepo.create(review);

    return review;
  }
}
