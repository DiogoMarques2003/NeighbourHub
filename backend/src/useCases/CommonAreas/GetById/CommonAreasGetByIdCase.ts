import IAddressesRepository from '@repositories/IAddressesRepository';
import ICommonAreasRepository from '@repositories/ICommonAreasRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import ICommonAreasGetByIdDTO from './ICommonAreasGetByIdDTO';
import CommonAreas from '@entities/CommonAreas';
import AppError from '@errors/AppError';
import generatePathToFile from '@shared/generatePathToFile';

export default class CommonAreasGetByIdCase {
  constructor(
    private commonAreasRepository: ICommonAreasRepository,
    private condominiumRepository: ICondominiumsRepository,
    private addressRepository: IAddressesRepository
  ) {}

  async execute(data: ICommonAreasGetByIdDTO): Promise<CommonAreas> {
    const { commonAreaId, condominiumId, userId } = data;

    const condDb = await this.condominiumRepository.findById(condominiumId);
    if (!condDb) throw new AppError('Id de condomínio inválido', 404);

    const user = await this.addressRepository.getByUserAndCond(userId, condominiumId);
    if (!user && condDb.adminId !== userId) throw new AppError('Não pertence ao condomínio', 403);

    const areaDb = await this.commonAreasRepository.findById(commonAreaId);
    if (!areaDb) throw new AppError('Área comum não encontrada', 404);
    if (areaDb.condominiumId !== condominiumId) throw new AppError('Área comum não pertence ao condomínio', 403);

    // Alterar as imagens para ter o url de acesso
    areaDb.images = areaDb.images.map((img) => generatePathToFile(img));

    return areaDb;
  }
}
