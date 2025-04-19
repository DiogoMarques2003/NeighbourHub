import ICommonAreasRepository from '@repositories/ICommonAreasRepository';
import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import ICommonAreasDeleteDTO from './ICommonAreasDeleteDTO';
import AppError from '@errors/AppError';
import { join, sep } from 'path';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { COMMON_AREAS_PATH } from '@constants/filesPaths';

export default class CommonAreasDeleteCase {
  constructor(
    private condomoniumsRepository: ICondominiumsRepository,
    private commonAreasRepository: ICommonAreasRepository
  ) {}

  async execute(data: ICommonAreasDeleteDTO): Promise<Boolean> {
    const { commonAreaId, condominiumId, userId } = data;

    const condominiumDb = await this.condomoniumsRepository.findById(condominiumId);
    if (!condominiumDb) throw new AppError('Condomínio não existe', 404);
    if (userId !== condominiumDb.adminId) throw new AppError('Não podes apagar as áreas comuns deste condomínio', 403);

    const commonAreaDb = await this.commonAreasRepository.findById(commonAreaId);
    if (!commonAreaDb) throw new AppError('Área comum não existe', 404);
    if (commonAreaDb.condominiumId !== condominiumId)
      throw new AppError('Área comum não pertence a este condomínio', 403);

    const isDeleted = await this.commonAreasRepository.delete(commonAreaId);

    // Validar se pasta existe, se naõ existir criar
    if (!existsSync(COMMON_AREAS_PATH)) {
      mkdirSync(COMMON_AREAS_PATH, { recursive: true });
    }

    if (isDeleted) {
      for (const image of commonAreaDb.images) {
        const imagePath = image.split(sep).pop();
        const imageFullPath = join(COMMON_AREAS_PATH, imagePath);
        if (existsSync(imageFullPath)) {
          unlinkSync(imageFullPath);
        }
      }
    }

    return isDeleted;
  }
}
