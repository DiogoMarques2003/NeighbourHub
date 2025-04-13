import IAddressesRepository from '@repositories/IAddressesRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IServicesRepository from '@repositories/IServicesRepository';
import IServicesDeleteDTO from './IServicesDeleteDTO';
import AppError from '@errors/AppError';

export default class ServicesDeleteCase {
  constructor(
    private servicesRepository: IServicesRepository,
    private condominiumRepository: ICondominiumsRepository,
    private addressRepository: IAddressesRepository
  ) {}

  async execute(data: IServicesDeleteDTO): Promise<Boolean> {
    const { condominiumId, serviceId, userId } = data;

    const condominiumDb = await this.condominiumRepository.findById(condominiumId);
    if (!condominiumDb) throw new AppError('Condomínio inexistente', 404);

    const userCondDb = await this.addressRepository.getByUserAndCond(userId, condominiumId);
    if (!userCondDb && condominiumDb.adminId !== userId) throw new AppError('Não fazes parte do condomínio', 403);

    const serviceDb = await this.servicesRepository.findById(serviceId);
    if (!serviceDb) throw new AppError('Serviço inexistente', 404);
    if (serviceDb.condominiumId !== condominiumId) throw new AppError('Serviço não pertence ao condomínio', 403);
    if (serviceDb.ownerId !== userId && condominiumDb.adminId !== userId)
      throw new AppError('Não tens permissão para apagar o serviço', 403);

    return this.servicesRepository.delete(serviceId);
  }
}
