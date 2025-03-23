import IAddressesRepository from '@repositories/IAddressesRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import IAddressGetByIdDTO from './IAdressGetByIdDTO';
import AppError from '@errors/AppError';
import { Addresses } from '@prisma/client';

export default class AddressGetByIdCase {
  constructor(
    private addressRepository: IAddressesRepository,
    private condominiumRepository: ICondominiumsRepository
  ) {}

  async execute(data: IAddressGetByIdDTO): Promise<Addresses> {
    const { id, userId, condId } = data;

    const condDb = await this.condominiumRepository.findById(condId);
    if (!condDb) throw new AppError('Condomínio não existe', 404);

    if (userId !== condDb.adminId) throw new AppError('Sem permissão', 401);

    const address = await this.addressRepository.findById(id);

    return address;
  }
}
