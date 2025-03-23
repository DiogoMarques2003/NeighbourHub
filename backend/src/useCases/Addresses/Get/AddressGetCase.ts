import IAddressesRepository from '@repositories/IAddressesRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IAddressGetDTO from './IAddressesGetDTO';
import { Addresses } from '@prisma/client';
import AppError from '@errors/AppError';

export default class AddressGetCase {
  constructor(
    private addressRepository: IAddressesRepository,
    private condominiumRepository: ICondominiumsRepository
  ) {}

  async execute(data: IAddressGetDTO): Promise<DataPagination<Addresses[]>> {
    const { userId, condId, pageSize, pageNumber } = data;

    const condDb = await this.condominiumRepository.findById(condId);
    if (!condDb) throw new AppError('Condomínio não existe', 404);

    if (userId !== condDb.adminId) throw new AppError('Sem permissão', 401);

    const count = await this.addressRepository.countByCondID(condId);
    if (!count) throw new AppError('Não existem registos', 404);

    const pages = Math.ceil(count / pageSize);
    if (pageNumber > pages) throw new AppError('Página inválida', 404);

    const addresses = await this.addressRepository.getCondAddressWithPagination(
      condId,
      pageNumber,
      pageSize
    );

    return { data: addresses, pages, actualPage: pageNumber, nRecords: count };
  }
}
