import ICondominiumsRepository from '@repositories/ICondominiumsRepository';
import ICondominiumCreateDTO from './ICondominiumDeleteDTO';
import AppError from '@errors/AppError';
import ICommonAreasRepository from '@repositories/ICommonAreasRepository';
import IOrderWorksRepository from '@repositories/IOrderWorksRepository';
import { join, sep } from 'path';
import { COMMON_AREAS_PATH, REPORT_FILES_PATH } from '@constants/filesPaths';
import { existsSync, unlinkSync } from 'fs';

export default class CondominiumCreateCase {
  constructor(
    private condominiumsRepository: ICondominiumsRepository,
    private commonAreasRepository: ICommonAreasRepository,
    private orderWorksRepository: IOrderWorksRepository
  ) {}

  async execute(data: ICondominiumCreateDTO): Promise<Boolean> {
    const { condominiumID, userID } = data;

    // Valida condomínio
    const condominioDb = await this.condominiumsRepository.findById(condominiumID);
    if (!condominioDb) throw new AppError('Condomínio não encontrado!', 404);

    if (userID != condominioDb.adminId) throw new AppError('Não tem autorização para eliminar o condomínio!', 403);

    const commonAreaImages = await this.commonAreasRepository.getImagesByCondominiumId(condominiumID);
    const orderWorksFiles = await this.orderWorksRepository.getFilesByCondominiumId(condominiumID);

    const isDeleted = await this.condominiumsRepository.deleteById(condominiumID);

    if (isDeleted) {
      for (const image of commonAreaImages) {
        const imagePath = image.split(sep).pop();
        const imageFullPath = join(COMMON_AREAS_PATH, imagePath);
        if (existsSync(imageFullPath)) {
          unlinkSync(imageFullPath);
        }
      }

      for (const file of orderWorksFiles) {
        const imageName = file.split(sep).pop();
        const imagePath = join(REPORT_FILES_PATH, imageName);
        if (existsSync(imagePath)) {
          unlinkSync(imagePath);
        }
      }
    }

    return isDeleted;
  }
}
