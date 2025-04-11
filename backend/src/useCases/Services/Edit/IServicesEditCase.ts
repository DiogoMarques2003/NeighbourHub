import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IServicesRepository from '@repositories/IServicesRepository';
import Services from '@entities/Services';
import IServicesEditDTO from './IServicesEditDTO';
import AppError from '@errors/AppError';

export default class ServicesEditCase {
  constructor(
    private condominiumsRepository: ICondominiumsRepository,
    private servicesRepository: IServicesRepository
  ) {}

  async execute(data: IServicesEditDTO): Promise<Services> {
    const { name, description, cost, ownerId, condId, id } = data;

    const condDB = await this.condominiumsRepository.findById(condId);
    if (!condDB) throw new AppError('Condominio inexistente', 404);

    const service = await this.servicesRepository.findById(id);
    if (!service) throw new AppError('Este serviço não existe', 400);

    if (ownerId !== service.ownerId) throw new AppError('Não podes editar este serviço', 400);

    if (condId !== condDB.id) throw new AppError('Este serviço não pertence a este condomínio', 400);

    if (name) service.name = name;
    if (description) service.description = description;
    if (cost) service.cost = cost;

    await this.servicesRepository.update(service);

    return service;
  }
}
