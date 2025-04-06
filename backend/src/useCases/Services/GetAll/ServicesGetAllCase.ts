import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IServicesRepository from '@repositories/IServicesRepository';
import IServicesGetAllDTO from './IServicesGetAllDTO';
import AppError from '@errors/AppError';

export default class ServicesGetAllCase {
  constructor(
    private servicesRepository: IServicesRepository,
    private condominiumsRepository: ICondominiumsRepository
  ) {}

  async execute(data: IServicesGetAllDTO) {
    const { condId, pageSize, pageNumber } = data;

    //Valida condominio
    const condDb = await this.condominiumsRepository.findById(condId);
    if (!condDb) throw new AppError('Condominio inexistente', 404);

    const count = await this.servicesRepository.countByCondId(condId);
    if (!count) throw new AppError('Não existem serviços!', 404);

    const pages = Math.ceil(count / pageSize);
    if (pageNumber > pages) throw new AppError('Página inválida!', 404);

    const services = await this.servicesRepository.getWithPagination(pageSize, pageNumber, condId);

    return { data: services, pages, actualPage: pageNumber, nRecords: count };
  }
}
