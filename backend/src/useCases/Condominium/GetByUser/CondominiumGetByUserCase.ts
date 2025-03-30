import IAddressesRepository from '@repositories/IAddressesRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import ICondominiumGetByUserDTO from './ICondominiumGetByUserDTO';
import AppError from '@errors/AppError';

export default class CondominiumGetByUserCase {
  constructor(
    private condominiumsRepository: ICondominiumsRepository,
    private addressRepository: IAddressesRepository
  ) {}

  async execute(data: ICondominiumGetByUserDTO): Promise<CondominiumGetByUserResponse[]> {
    const { userId, isAdmin } = data;

    const dataDb = isAdmin
      ? await this.condominiumsRepository.getByAdminId(userId)
      : await this.addressRepository.getByUserId(userId);

    if (!dataDb || dataDb.length === 0)
      throw new AppError(
        isAdmin ? 'Não é administrador de nenhum condominio' : 'Não é morador de nenhum condominio',
        404
      );

    return dataDb;
  }
}
