import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IServicesRepository from '@repositories/IServicesRepository';
import IServicesGetAllDTO from './IServicesGetAllDTO';
import AppError from '@errors/AppError';
import IAddressesRepository from '@repositories/IAddressesRepository';
import IServiceReviewsRepository from '@repositories/IServiceReviewsRepository';

export default class ServicesGetAllCase {
  constructor(
    private servicesRepository: IServicesRepository,
    private condominiumsRepository: ICondominiumsRepository,
    private addressRepository: IAddressesRepository,
  ) {
  }

  async execute(data: IServicesGetAllDTO) {
    const { condId, userId, myServices, maxReviews, minReviews, pageSize, pageNumber } = data;

    //Valida condominio
    const condDb = await this.condominiumsRepository.findById(condId);
    if (!condDb) throw new AppError('Condominio inexistente', 404);

    //Valida User no condominio
    const userCondDb = await this.addressRepository.getByUserAndCond(userId, condId);
    if (!userCondDb && condDb.adminId !== userId) throw new AppError('Não faz parte do condomínio', 403);

    const count = await this.servicesRepository.countByCondIdFiltered(condId, minReviews, maxReviews, myServices && userId);
    if (!count) throw new AppError('Não existem serviços!', 404);

    const pages = Math.ceil(count / pageSize);
    if (pageNumber > pages) throw new AppError('Página inválida!', 404);

    const services = await this.servicesRepository.getWithPagination(pageSize, pageNumber, condId, minReviews, maxReviews, myServices && userId);

    return { data: services, pages, actualPage: pageNumber, nRecords: count };
  }
}
