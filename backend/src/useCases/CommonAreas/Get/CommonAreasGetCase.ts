import AppError from '@errors/AppError';
import ICommonAreasRepository from '@repositories/ICommonAreasRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import ICommonAreasGetDTO from './ICommonAreasGetDTO';
import IAddressesRepository from '@repositories/IAddressesRepository';

export default class CommonAreasGetCase {
  constructor(
    private commonAreasRepository: ICommonAreasRepository,
    private condominiumRepository: ICondominiumsRepository,
    private addressRepository: IAddressesRepository
  ) {}

  async execute(data: ICommonAreasGetDTO) {
    const { type, pageNumber, pageSize, userId, condId } = data;

    const condDb = await this.condominiumRepository.findById(condId);
    if (!condDb) throw new AppError('Id de condomínio inválido', 404);

    const user = await this.addressRepository.findById(userId);
    if (!user) throw new AppError('User não existe', 400);

    const count = await this.commonAreasRepository.countByType(type);
    if (!count) throw new AppError('Não existem espaços', 404);

    const pages = Math.ceil(count / pageSize);
    if (pageNumber > pages) throw new AppError('Página inválida', 404);
  }
}
