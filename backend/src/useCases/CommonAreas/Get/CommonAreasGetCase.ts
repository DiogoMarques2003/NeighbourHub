import AppError from '@errors/AppError';
import ICommonAreasRepository from '@repositories/ICommonAreasRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import ICommonAreasGetDTO from './ICommonAreasGetDTO';
import IAddressesRepository from '@repositories/IAddressesRepository';
import CommonAreas from '@entities/CommonAreas';
import generatePathToFile from '@shared/generatePathToFile';

export default class CommonAreasGetCase {
  constructor(
    private commonAreasRepository: ICommonAreasRepository,
    private condominiumRepository: ICondominiumsRepository,
    private addressRepository: IAddressesRepository
  ) {}

  async execute(
    data: ICommonAreasGetDTO
  ): Promise<DataPagination<CommonAreas[]>> {
    const { type, pageNumber, pageSize, userId, condId } = data;

    const condDb = await this.condominiumRepository.findById(condId);
    if (!condDb) throw new AppError('Id de condomínio inválido', 404);

    const user = await this.addressRepository.getByUserAndCond(userId, condId);
    if (!user) throw new AppError('User não pertence ao condomínio', 401);

    const count = await this.commonAreasRepository.countByType(type);
    if (!count) throw new AppError('Não existem espaços', 404);

    const pages = Math.ceil(count / pageSize);
    if (pageNumber > pages) throw new AppError('Página inválida', 404);

    const areas = await this.commonAreasRepository.getCommonAreasWithPagination(
      pageNumber,
      pageSize,
      type
    );

    // Alterar as imagens para ter o url de acesso
    for (const area of areas) {
      if (area.images.length === 0) continue;
      area.images = area.images.map((img) => generatePathToFile(img));
    }

    return { data: areas, pages, actualPage: pageNumber, nRecords: count };
  }
}
