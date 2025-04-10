import AppError from '@errors/AppError';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IServicesRepository from '@repositories/IServicesRepository';
import IServicesGetByIdDTO from './IServicesGetByIdDTO';
import IAddressesRepository from '@repositories/IAddressesRepository';
import generatePathToFile from '@shared/generatePathToFile';

export default class ServicesGetByIdCase {
  constructor(
    private servicesRepository: IServicesRepository,
    private condominiumsRepository: ICondominiumsRepository,
    private addressRepository: IAddressesRepository
  ) {}

  async execute(data: IServicesGetByIdDTO) {
    const { condId, userId, serviceId } = data;

    //Valida condominio
    const condDb = await this.condominiumsRepository.findById(condId);
    if (!condDb) throw new AppError('Condominio inexistente', 404);

    //Valida User no condominio
    const userCondDb = await this.addressRepository.getByUserAndCond(userId, condId);
    if (!userCondDb && condDb.adminId !== userId) throw new AppError('Não faz parte do condomínio', 403);

    const serviceWithUser = await this.servicesRepository.findByIdWithUserData(serviceId);

    if (serviceWithUser.owner.foto) serviceWithUser.owner.foto = generatePathToFile(serviceWithUser.owner.foto);
    else delete serviceWithUser.owner.foto;
    if (!serviceWithUser.cost) delete serviceWithUser.cost;

    return serviceWithUser;
  }
}
