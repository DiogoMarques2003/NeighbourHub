import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import ICondominiumGetDTO from './ICondominiumGetDTO';
import AppError from '@errors/AppError';
import IAddressesRepository from '@repositories/IAddressesRepository';

export default class CondominiumGetCase {
  constructor(
    private condominiumsRepository: ICondominiumsRepository,
    private addressRepository: IAddressesRepository
  ) {}

  async execute(data: ICondominiumGetDTO): Promise<GetCondominioResponse> {
    const { id, userId } = data;

    const condDb = await this.condominiumsRepository.findById(id);
    if (!condDb) throw new AppError('Condominio não existe', 404);

    const hasAddress = await this.addressRepository.getByUserAndCond(userId, id);
    if (!hasAddress && condDb.adminId !== userId) throw new AppError('Não tens acesso a este condominio', 403);

    return { ...condDb, isResident: !!hasAddress };
  }
}
