import IAddressesRepository from '@repositories/IAddressesRepository';
import IAddressesCreateDTO from './IAddressesCreateDTO';
import Addresses from '@entities/Addresses';
import AppError from '@errors/AppError';
import IUsersRepository from '@repositories/IUsersRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';

export default class AddressesCreateCase {
  constructor(
    private addressesRepository: IAddressesRepository,
    private condominiumRepository: ICondominiumsRepository,
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: IAddressesCreateDTO): Promise<Addresses> {
    const {
      adminId,
      country,
      city,
      street,
      houseNumber,
      postalCode,
      houseType,
      userEmail,
      condominiumId,
    } = data;

    //ir buscar condominio, verificar se o user existe
    const cond = await this.condominiumRepository.findById(condominiumId);
    if (!cond) throw new AppError('Condomínio não existe', 404);

    //validar o admin do condominio
    if (adminId !== cond.adminId) throw new AppError('Sem permissão', 401);

    const user = await this.usersRepository.findByEmail(userEmail);
    if (!user) throw new AppError('Utilizador não existe', 404);

    const addressClass = new Addresses({
      country,
      city,
      street,
      houseNumber,
      postalCode,
      houseType,
      userId: user.id,
      condominiumId,
    });

    await this.addressesRepository.create(addressClass);
    return addressClass;
  }
}
