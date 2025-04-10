import IAddressesRepository from '@repositories/IAddressesRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IServicesCreateDTO from './IServicesCreateDTO';
import IUsersRepository from '@repositories/IUsersRepository';
import AppError from '@errors/AppError';
import IServicesRepository from '@repositories/IServicesRepository';
import Services from '@entities/Services';

export default class ServicesCreateCase {
  constructor(
    private condominiumsRepository: ICondominiumsRepository,
    private addressesRepository: IAddressesRepository,
    private userRepository: IUsersRepository,
    private servicesRepository: IServicesRepository
  ) {}

  async execute(data: IServicesCreateDTO) {
    const { name, description, cost, ownerId, condId } = data;

    //Valida utilizador
    const userDb = await this.userRepository.findById(ownerId);
    if (!userDb) throw new AppError('Utilizador não encontrado', 401);

    //Valida condominio
    const condDb = await this.condominiumsRepository.findById(condId);
    if (!condDb) throw new AppError('Condominio inexistente', 404);

    //Valida User no condominio
    const userCondDb = await this.addressesRepository.getByUserAndCond(ownerId, condId);
    if (!userCondDb) throw new AppError('Não faz parte do condomínio', 403);

    const servicesClass = new Services({
      name,
      description,
      cost,
      ownerId,
      condominiumId: condId,
    });

    await this.servicesRepository.create(servicesClass);

    return servicesClass;
  }
}
