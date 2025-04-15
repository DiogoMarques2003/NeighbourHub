import IAddressesRepository from '@repositories/IAddressesRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IServiceReviewsRepository from '@repositories/IServiceReviewsRepository';
import IServicesRepository from '@repositories/IServicesRepository';
import IServiceReviewsGetDTO from './IServiceReviewsGetDTO';
import AppError from '@errors/AppError';
import { Prisma } from '@prismaClient/index';
import generatePathToFile from '@shared/generatePathToFile';

export default class ServiceReviewsGetCase {
  constructor(
    private condominiumRepository: ICondominiumsRepository,
    private serviceRepository: IServicesRepository,
    private serviceReviewsRepository: IServiceReviewsRepository,
    private addressRepository: IAddressesRepository
  ) {}

  async execute(data: IServiceReviewsGetDTO): Promise<DataPagination<ServicesReviewsWithUserData[]>> {
    const { condominiumId, pageNumber, pageSize, serviceId, sortBy, sortOrder, userId } = data;

    const condominium = await this.condominiumRepository.findById(condominiumId);
    if (!condominium) throw new AppError('Condomínio não encontrado', 404);

    const hasAddress = await this.addressRepository.getByUserAndCond(userId, condominiumId);
    if (!hasAddress && condominium.adminId !== userId)
      throw new AppError('Não podes consultar as avaliações deste condominio', 403);

    const service = await this.serviceRepository.findById(serviceId);
    if (!service) throw new AppError('Serviço não encontrado', 404);
    if (service.condominiumId !== condominiumId) throw new AppError('Serviço não pertence ao condomínio', 403);

    const filters: Prisma.ServiceReviewsWhereInput = {
      serviceRequest: {
        serviceId,
      },
    };

    const orderBy: Prisma.ServiceReviewsOrderByWithRelationInput = {};
    orderBy[sortBy] = sortOrder;

    const count = await this.serviceReviewsRepository.countWithFilters(filters);
    if (!count) throw new AppError('Nenhum registo encontrado', 404);

    const pages = Math.ceil(count / pageSize);
    if (pageNumber > pages) throw new AppError('Página inválida', 404);

    const reviews = await this.serviceReviewsRepository.findWithFilters(pageNumber, pageSize, filters, orderBy);

    for (const review of reviews) {
      if (review.user.foto) review.user.foto = generatePathToFile(review.user.foto);
    }

    return { data: reviews, pages, actualPage: pageNumber, nRecords: count };
  }
}
