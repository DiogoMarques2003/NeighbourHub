import IAddressesRepository from '@repositories/IAddressesRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import ICondominiumGetByUserDTO from './ICondominiumGetByUserDTO';
import AppError from '@errors/AppError';

export default class CondominiumGetByUserCase {
  constructor(
    private condominiumsRepository: ICondominiumsRepository,
    private addressRepository: IAddressesRepository
  ) {}

  async execute(data: ICondominiumGetByUserDTO): Promise<DataPagination<CondominiumGetByUserResponse[]>> {
    const { userId, isAdmin, pageNumber, pageSize } = data;

    const cont = isAdmin 
      ? await this.condominiumsRepository.countByAdminId(userId)
      : await this.addressRepository.countByUserId(userId);

    if (!cont) throw new AppError(isAdmin ? 'Não é administrador de nenhum condominio' : 'Não é morador de nenhum condominio', 404);

    const pages = Math.ceil(cont / pageSize);
    if (pageNumber > pages) throw new AppError('Página inválida', 404);

    const dataDb = isAdmin
      ? await this.condominiumsRepository.getByAdminId(userId, pageNumber, pageSize)
      : await this.addressRepository.getByUserId(userId, pageNumber, pageSize);

    return { data: dataDb, pages, actualPage: pageNumber, nRecords: cont };
  }
}
